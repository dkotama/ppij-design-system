#!/usr/bin/env bash
# Serialized verification gate. Copy to scripts/gate.sh and edit the STAGES array.
# One gate runs at a time per machine (portable mkdir lock, no flock needed).
# Each stage has its own timeout; the gate stops at the first failing stage and prints which one.
# Usage: scripts/gate.sh [stage ...]    (no args = all stages, in order)
set -uo pipefail

# Lock is keyed by the shared git dir, so every worktree of one repo contends on the same lock.
COMMON="$(cd "$(git rev-parse --git-common-dir)" && pwd)"
LOCKDIR="${GATE_LOCKDIR:-${TMPDIR:-/tmp}/gate-$(printf %s "$COMMON" | shasum | cut -c1-12).lock}"
LOCK_WAIT="${GATE_LOCK_WAIT:-900}"

# name|timeout_seconds|command   (cheap checks first; point stages at Makefile targets
# so the gate itself stays stack-agnostic)
STAGES=(
  "syntax|30|bash -n scripts/*.sh"
  "build|300|make build"
  "lint|300|make lint"
  "test|600|make test"
  # "e2e|1800|make e2e"
)

run_timeout() {  # run_timeout SECONDS CMD...
  local secs="$1"; shift
  "$@" &
  local pid=$!
  ( sleep "$secs"; pkill -TERM -P "$pid" 2>/dev/null; kill -TERM "$pid" 2>/dev/null; sleep 5; pkill -KILL -P "$pid" 2>/dev/null; kill -KILL "$pid" 2>/dev/null ) &
  local watcher=$!
  wait "$pid"; local rc=$?
  kill "$watcher" 2>/dev/null; wait "$watcher" 2>/dev/null
  return $rc
}

acquire() {
  local waited=0
  until mkdir "$LOCKDIR" 2>/dev/null; do
    if [ "$waited" -ge "$LOCK_WAIT" ]; then
      echo "gate: another run holds the lock ($LOCKDIR), waited ${LOCK_WAIT}s, giving up" >&2
      exit 75
    fi
    sleep 5; waited=$((waited + 5))
  done
  trap 'rmdir "$LOCKDIR" 2>/dev/null' EXIT
}

main() {
  acquire
  local wanted=("$@")
  local stage spec name timeout cmd start elapsed
  for spec in "${STAGES[@]}"; do
    name="${spec%%|*}"; timeout="${spec#*|}"; timeout="${timeout%%|*}"; cmd="${spec#*|*|}"
    if [ "${#wanted[@]}" -gt 0 ]; then
      local found=0 s
      for s in "${wanted[@]}"; do [ "$s" = "$name" ] && found=1; done
      [ "$found" -eq 1 ] || continue
    fi
    echo "== gate stage: $name (timeout ${timeout}s): $cmd"
    start=$(date +%s)
    if run_timeout "$timeout" bash -c "$cmd"; then
      elapsed=$(( $(date +%s) - start ))
      echo "== gate stage: $name PASS (${elapsed}s)"
    else
      local rc=$?
      elapsed=$(( $(date +%s) - start ))
      echo "== gate stage: $name FAIL rc=$rc (${elapsed}s)" >&2
      echo "gate: FAILED at stage $name" >&2
      exit 1
    fi
  done
  echo "gate: ALL PASS"
}

main "$@"

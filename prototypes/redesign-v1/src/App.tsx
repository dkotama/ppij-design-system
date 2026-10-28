import * as React from "react";
import { PortalView } from "./views/Portal";
import { WizardView } from "./views/Wizard";
import { ProfileView } from "./views/Profile";

type View = "portal" | "wizard" | "profile";

const VIEWS: { id: View; label: string }[] = [
  { id: "portal", label: "Portal" },
  { id: "wizard", label: "Wizard" },
  { id: "profile", label: "Profil" },
];

export function App() {
  const [view, setView] = React.useState<View>("portal");
  return (
    <div className="min-h-screen">
      <div className="sticky top-0 z-50 flex flex-wrap items-center gap-3 bg-neutral-900 px-4 py-2 text-neutral-100">
        <span className="text-sm font-semibold">PPIJ Redesign v1</span>
        <span className="hidden text-xs text-neutral-400 sm:inline">Prototype chrome, not part of the design. Built only from design-system components.</span>
        <span className="flex-1" />
        <div className="flex gap-1" role="tablist" aria-label="Pilih permukaan">
          {VIEWS.map((v) => (
            <button
              key={v.id}
              role="tab"
              aria-selected={view === v.id}
              onClick={() => setView(v.id)}
              className={view === v.id ? "rounded-full bg-white px-3.5 py-1.5 text-sm font-semibold text-neutral-900" : "rounded-full px-3.5 py-1.5 text-sm text-neutral-300 hover:bg-neutral-800"}
            >
              {v.label}
            </button>
          ))}
        </div>
      </div>
      {view === "portal" && <PortalView onNavigate={setView} />}
      {view === "wizard" && <WizardView />}
      {view === "profile" && <ProfileView />}
    </div>
  );
}

import * as React from "react";
import { IconCircleCheck } from "@tabler/icons-react";
import {
  Button, Checkbox, FileUpload, FormPanel, Input, Label, RadioGroup, RadioGroupItem,
  SavingIndicator, Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
  Stepper, Textarea, Timeline, TypeAhead, type FileUploadStatus,
} from "ppij-design-system";

const STEPS = ["Data Diri", "Domisili", "Pendidikan", "Pendanaan", "Izin", "Kartu", "Tinjau"].map((label) => ({ label }));
const UNIVERSITIES = ["Okayama University", "Okayama University of Science", "Tokyo University", "Kyoto University", "Osaka University", "Nagoya University"];

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-1.5">
      <Label>{label}</Label>
      {children}
    </div>
  );
}

export function WizardView() {
  const [step, setStep] = React.useState(3);
  const [univ, setUniv] = React.useState("Okayama University");
  const [upload, setUpload] = React.useState<FileUploadStatus>("empty");
  const [fileName, setFileName] = React.useState("");
  const [progress, setProgress] = React.useState(0);
  const [sent, setSent] = React.useState(false);

  const pick = (file: File) => {
    setFileName(file.name);
    setUpload("uploading");
    setProgress(0);
    const timer = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) { clearInterval(timer); setUpload("done"); return 100; }
        return p + 25;
      });
    }, 200);
  };

  if (sent) {
    return (
      <div className="mx-auto grid w-full max-w-3xl gap-6 px-4 py-8">
        <Card className="grid justify-items-center gap-3 p-8 text-center">
          <span className="flex size-12 items-center justify-center rounded-full bg-success/10 text-success"><IconCircleCheck size={26} /></span>
          <h1 className="text-xl font-bold text-brand-ink">Pendaftaran terkirim</h1>
          <p className="max-w-md text-sm text-muted-foreground">Data dan berkasmu diterima. Verifikasi berjalan dalam dua tahap dan kamu menerima notifikasi pada setiap tahap.</p>
        </Card>
        <Timeline items={[
          { title: "Pendaftaran terkirim", time: "Baru saja", state: "complete" },
          { title: "Verifikasi komsat", description: "Komsat Okayama memeriksa domisili dan kampus.", state: "current" },
          { title: "Verifikasi pusat", state: "upcoming" },
          { title: "Kartu anggota diterbitkan", state: "upcoming" },
        ]} />
      </div>
    );
  }

  return (
    <div className="mx-auto grid w-full max-w-3xl gap-6 px-4 py-8">
      <div className="grid gap-1">
        <h1 className="text-2xl font-bold text-brand-ink">Lengkapi pendaftaran</h1>
        <p className="text-sm text-muted-foreground">Tujuh langkah singkat. Draf tersimpan otomatis di perangkat ini.</p>
      </div>
      <Stepper steps={STEPS} current={step} />
      <FormPanel
        title={STEPS[step - 1].label}
        footer={
          <div className="flex w-full items-center gap-3">
            <SavingIndicator status="saved" />
            <span className="flex-1" />
            {step > 1 && <Button variant="outline" onClick={() => setStep(step - 1)}>Kembali</Button>}
            {step < 7 && <Button onClick={() => setStep(step + 1)}>Lanjutkan</Button>}
            {step === 7 && <Button variant="success" onClick={() => setSent(true)}>Kirim pendaftaran</Button>}
          </div>
        }
      >
        {step === 1 && (
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Nama lengkap"><Input defaultValue="I Nyoman Darma Kotama" /></Field>
            <Field label="Tanggal lahir"><Input defaultValue="2 September 1992" /></Field>
            <Field label="Email"><Input defaultValue="darma.kotama@gmail.com" /></Field>
            <Field label="Nomor WhatsApp"><Input defaultValue="+81 90-0000-0000" /></Field>
          </div>
        )}
        {step === 2 && (
          <div className="grid gap-4">
            <div className="flex items-end gap-2">
              <div className="grid flex-1 gap-1.5"><Label>Kode pos</Label><Input defaultValue="700-0001" /></div>
              <Button variant="outline">Cari alamat</Button>
            </div>
            <Field label="Komsat">
              <Select defaultValue="okayama">
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="okayama">Okayama</SelectItem>
                  <SelectItem value="tokyo">Tokyo</SelectItem>
                  <SelectItem value="osaka">Osaka</SelectItem>
                </SelectContent>
              </Select>
            </Field>
            <Field label="Alamat lengkap"><Textarea defaultValue={"Okayama City, Kita-ku\nOkayama 700-0001, Japan"} /></Field>
          </div>
        )}
        {step === 3 && (
          <div className="grid gap-4">
            <Field label="Universitas"><TypeAhead value={univ} onChange={setUniv} options={UNIVERSITIES} placeholder="Ketik nama universitas" /></Field>
            <Field label="Program studi"><Input defaultValue="Computer Science" /></Field>
            <Field label="Jenjang">
              <Select defaultValue="s2">
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="s1">S1</SelectItem>
                  <SelectItem value="s2">S2</SelectItem>
                  <SelectItem value="s3">S3</SelectItem>
                </SelectContent>
              </Select>
            </Field>
            <Field label="Status studi">
              <RadioGroup defaultValue="aktif" className="flex gap-5">
                <span className="flex items-center gap-2"><RadioGroupItem value="aktif" id="st-aktif" /><Label htmlFor="st-aktif">Sedang menempuh</Label></span>
                <span className="flex items-center gap-2"><RadioGroupItem value="lulus" id="st-lulus" /><Label htmlFor="st-lulus">Sudah lulus</Label></span>
              </RadioGroup>
            </Field>
          </div>
        )}
        {step === 4 && (
          <div className="grid gap-4">
            <Field label="Sumber pendanaan">
              <RadioGroup defaultValue="beasiswa">
                {[["mandiri", "Biaya sendiri"], ["beasiswa", "Beasiswa"], ["sponsor", "Sponsor perusahaan"]].map(([v, l]) => (
                  <span key={v} className="flex items-center gap-2"><RadioGroupItem value={v} id={"f-" + v} /><Label htmlFor={"f-" + v}>{l}</Label></span>
                ))}
              </RadioGroup>
            </Field>
            <Field label="Nama beasiswa atau sponsor"><Input defaultValue="JASSO" /></Field>
          </div>
        )}
        {step === 5 && (
          <div className="grid gap-4">
            <span className="flex items-start gap-2"><Checkbox id="iz-1" defaultChecked /><Label htmlFor="iz-1">Saya menyetujui pemrosesan data pribadi untuk keanggotaan.</Label></span>
            <span className="flex items-start gap-2"><Checkbox id="iz-2" /><Label htmlFor="iz-2">Nama dan komsat saya boleh tampil di direktori anggota.</Label></span>
            <Field label="Catatan untuk pengurus (opsional)"><Textarea placeholder="Tulis bila ada hal yang perlu diketahui pengurus." /></Field>
          </div>
        )}
        {step === 6 && (
          <FileUpload label="Foto untuk kartu anggota" hint="JPG atau PNG, maks 5 MB, latar polos." accept="image/png,image/jpeg" status={upload} fileName={fileName} progress={progress} onPick={pick} onRemove={() => setUpload("empty")} />
        )}
        {step === 7 && (
          <div className="grid gap-4">
            {[
              ["Data Diri", "I Nyoman Darma Kotama, lahir 2 September 1992. Email darma.kotama@gmail.com.", 1],
              ["Domisili", "Okayama City, Kita-ku, 700-0001. Komsat Okayama.", 2],
              ["Pendidikan", univ + ", Computer Science, S2, sedang menempuh.", 3],
              ["Pendanaan", "Beasiswa: JASSO.", 4],
              ["Kartu", upload === "done" ? "Foto terunggah: " + fileName : "Foto belum diunggah.", 6],
            ].map(([title, body, target]) => (
              <div key={String(title)} className="flex items-start justify-between gap-4 border-b pb-3 last:border-0">
                <div className="grid gap-0.5">
                  <span className="text-sm font-semibold text-brand-ink">{title}</span>
                  <span className="text-sm text-muted-foreground">{body}</span>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setStep(Number(target))}>Ubah</Button>
              </div>
            ))}
            <span className="flex items-start gap-2"><Checkbox id="final" defaultChecked /><Label htmlFor="final">Saya menyatakan data di atas benar.</Label></span>
          </div>
        )}
      </FormPanel>
    </div>
  );
}

// Card is used in the sent state; imported here to keep the view self-contained.
import { Card } from "ppij-design-system";

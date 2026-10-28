import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { FileUpload, type FileUploadStatus } from "./file-upload";

const meta: Meta<typeof FileUpload> = { title: "Portal/FileUpload", component: FileUpload };
export default meta;
type Story = StoryObj<typeof FileUpload>;

function Demo() {
  const [status, setStatus] = React.useState<FileUploadStatus>("empty");
  const [name, setName] = React.useState<string>("");
  const [progress, setProgress] = React.useState(0);
  const pick = (file: File) => {
    setName(file.name);
    setStatus("uploading");
    setProgress(0);
    const timer = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(timer);
          setStatus("done");
          return 100;
        }
        return p + 25;
      });
    }, 220);
  };
  return (
    <div style={{ maxWidth: 480 }}>
      <FileUpload
        label="Foto untuk kartu anggota"
        hint="JPG atau PNG, maks 5 MB, latar polos."
        accept="image/png,image/jpeg"
        status={status}
        fileName={name}
        progress={progress}
        onPick={pick}
        onRemove={() => setStatus("empty")}
      />
    </div>
  );
}

export const Interactive: Story = { render: () => <Demo /> };

export const ErrorState: Story = {
  render: () => (
    <div style={{ maxWidth: 480 }}>
      <FileUpload
        label="Dokumen pendukung"
        status="error"
        fileName="berkas-scan.pdf"
        errorText="Ukuran berkas melebihi 5 MB."
        onPick={() => {}}
      />
    </div>
  ),
};

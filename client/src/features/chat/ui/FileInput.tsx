import { useState } from "react";
import { Input } from "@/src/shared/ui/input";
import { Button } from "@/src/shared/ui/button";
import { toast } from "sonner";

export function InputFile({ confirm }: { confirm: (file: File) => void }) {
  const [file, setFile] = useState<File | null>(null);

  return (
    <div className="grid w-full max-w-sm items-center gap-4">
      <Input
        id="picture"
        type="file"
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
          }
        }}
      />
      <Button
        onClick={() => {
          if (file) {
            confirm(file);
          } else {
            toast("Please select a file first.");
          }
        }}
      >
        Upload
      </Button>
    </div>
  );
}

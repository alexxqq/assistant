'use client'

import { ModeToggle } from "@/src/shared/ui/mode-toggle";

export default function ModeHeader() {
  return (
    <header
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        padding: "1rem",
      }}
    >
      <ModeToggle />
    </header>
  );
}

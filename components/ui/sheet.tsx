"use client";
import * as React from "react";
import { createPortal } from "react-dom";

type Props = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export function Sheet({ open, onClose, children }: Props) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  // ESC to close + body scroll lock when open
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!mounted) return null;

  return createPortal(
    <div
      className={`fixed inset-0 ${open ? "" : "pointer-events-none"} z-[99]`}
      role="dialog"
      aria-modal="true"
    >
      {/* overlay under the panel */}
      <div
        onClick={onClose}
        className={`absolute inset-0 z-[1] bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* panel above overlay */}
      <div
        className={`absolute inset-y-0 left-0 z-[2] h-full w-[85%] max-w-[360px] transform bg-white shadow-2xl ring-1 ring-black/5 transition-transform duration-300 ease-out dark:bg-zinc-900 dark:ring-white/10
        ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="h-full overflow-y-auto p-6">{children}</div>
      </div>
    </div>,
    document.body
  );
}

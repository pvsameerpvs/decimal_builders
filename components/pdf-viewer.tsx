// "use client";
// import * as React from "react";

// export default function PdfViewer(){
//   const [fileUrl, setFileUrl] = React.useState<string | null>(null);
//   return (
//     <div className="space-y-3">
//       <input
//         type="file"
//         accept="application/pdf"
//         onChange={(e)=>{
//           const f = e.target.files?.[0];
//           if(!f) return;
//           const url = URL.createObjectURL(f);
//           setFileUrl(url);
//         }}
//         className="block"
//       />
//       {fileUrl && (
//         <object data={fileUrl} type="application/pdf" className="h-[600px] w-full rounded-xl ring-1 ring-black/10">
//           <p className="p-4">PDF preview not available. <a href={fileUrl} target="_blank" className="underline">Open</a>.</p>
//         </object>
//       )}
//     </div>
//   );
// }
"use client";

import { useRef, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type PdfViewerProps = {
  /** If provided, show this PDF when no file is uploaded */
  defaultSrc?: string;
  /** Called from empty state to switch tabs (e.g. setTab("gallery")) */
  onBackToGallery?: () => void;
  /** Override the empty-state message */
  emptyHint?: string;
};

export default function PdfViewer({
  defaultSrc,
  onBackToGallery,
  emptyHint = "Upload a PDF to preview it here.",
}: PdfViewerProps) {
  const [src, setSrc] = useState<string | null>(defaultSrc ?? null);
  const [fileName, setFileName] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const pick = () => inputRef.current?.click();

  const loadFile = useCallback((file: File) => {
    if (!file || file.type !== "application/pdf") return;
    setFileName(file.name);
    const url = URL.createObjectURL(file);
    setSrc(url);
  }, []);

  const onDrop: React.DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    const f = e.dataTransfer.files?.[0];
    if (f) loadFile(f);
  };

  const onBrowse: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const f = e.target.files?.[0];
    if (f) loadFile(f);
  };

  const clear = () => {
    setSrc(defaultSrc ?? null);
    setFileName(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="space-y-3">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-2">
        <Input
          ref={inputRef}
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={onBrowse}
        />
        <Button onClick={pick} variant="outline" className="brand-border">
          Upload PDF
        </Button>

        {src && (
          <>
            <Button
              onClick={() => {
                const a = document.createElement("a");
                a.href = src;
                a.download = fileName ?? "document.pdf";
                a.click();
              }}
            >
              Download
            </Button>
            <Button variant="ghost" onClick={clear}>
              Clear
            </Button>
          </>
        )}

        {fileName && (
          <span className="truncate text-xs text-zinc-500">{fileName}</span>
        )}
      </div>

      {/* Viewer / Empty state */}
      <div
        className="relative h-[70vh] w-full overflow-hidden rounded-2xl border"
        onDragOver={(e) => e.preventDefault()}
        onDrop={onDrop}
      >
        {src ? (
          <embed src={src} type="application/pdf" className="h-full w-full" />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-3 p-6 text-center">
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              {emptyHint}
            </p>
            <div className="flex gap-2">
              <Button onClick={pick} variant="outline" className="brand-border">
                Upload PDF
              </Button>
              {onBackToGallery && (
                <Button onClick={onBackToGallery} variant="ghost">
                  ← Back to Gallery
                </Button>
              )}
            </div>
            <p className="text-xs text-zinc-500">
              Or drag & drop a PDF into this box
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

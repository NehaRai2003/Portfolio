"use client";

import { useEffect, useState } from "react";
import { HiOutlineEye, HiX } from "react-icons/hi";
import { MdDownload } from "react-icons/md";

export default function ResumeViewer({ src }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button onClick={() => setOpen(true)} className="btn-ghost">
        <HiOutlineEye size={18} />
        View Resume
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Resume"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-3 backdrop-blur-sm sm:p-6"
          onClick={() => setOpen(false)}
        >
          <div
            className="flex h-full max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--bg-soft)] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-3 border-b border-[var(--border)] px-5 py-3">
              <span className="font-display font-semibold">Resume</span>
              <div className="flex items-center gap-2">
                <a href={src} download className="btn-primary !px-4 !py-2 text-sm">
                  <MdDownload size={16} />
                  Download
                </a>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close"
                  className="rounded-full p-2 text-xl hover:bg-white/10"
                >
                  <HiX />
                </button>
              </div>
            </div>
            <iframe src={`${src}#view=FitH`} title="Resume" className="h-full w-full flex-1 bg-white" />
          </div>
        </div>
      )}
    </>
  );
}

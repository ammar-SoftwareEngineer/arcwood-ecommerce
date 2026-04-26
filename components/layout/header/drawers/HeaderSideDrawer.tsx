"use client";

import type { ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useId, useEffect } from "react";

const overlayZ = "z-[2000]";
const panelZ = "z-[2001]";

const overlayClass = `fixed inset-0 ${overlayZ} h-dvh min-h-0 touch-none bg-black/50 transition-opacity duration-300`;
const panelClass = `fixed inset-y-0 end-0 ${panelZ} flex h-dvh min-h-0 w-full max-w-md flex-col border-s border-black/10 bg-white pt-[env(safe-area-inset-top)] shadow-2xl transition-transform duration-300 ease-out`;
const offScreen = "pointer-events-none ltr:translate-x-full rtl:-translate-x-full";
const onScreen = "translate-x-0";

type HeaderSideDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  id: string;
  title: string;
  children: ReactNode;
  closeLabel?: string;
};

export default function HeaderSideDrawer({
  isOpen,
  onClose,
  id,
  title,
  children,
  closeLabel = "Close",
}: HeaderSideDrawerProps) {
  const titleId = useId();

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  return (
    <>
      <div
        className={`${overlayClass} ${isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
        aria-hidden={!isOpen}
        onClick={onClose}
      />
      <div
        id={id}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-hidden={!isOpen}
        className={`${panelClass} ${isOpen ? onScreen : offScreen}`}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-black/10 p-4">
          <h2 id={titleId} className="text-base font-semibold text-black/90">
            {title}
          </h2>
          <button
            type="button"
            className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-0 border border-black/15 text-black/70 transition hover:bg-black/5"
            aria-label={closeLabel}
            onClick={onClose}
          >
            <FontAwesomeIcon icon={faXmark} className="h-4 w-4" />
          </button>
        </div>
        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain">{children}</div>
      </div>
    </>
  );
}

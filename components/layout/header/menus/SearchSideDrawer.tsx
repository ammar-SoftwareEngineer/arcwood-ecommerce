"use client";

import { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import HeaderSideDrawer from "./HeaderSideDrawer";

type SearchSideDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  id: string;
  title?: string;
  searchPlaceholder?: string;
};

export default function SearchSideDrawer({
  isOpen,
  onClose,
  id,
  title = "Search",
  searchPlaceholder = "Search for products",
}: SearchSideDrawerProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    const raf = window.requestAnimationFrame(() => {
      inputRef.current?.focus();
    });
    return () => window.cancelAnimationFrame(raf);
  }, [isOpen]);

  return (
    <HeaderSideDrawer isOpen={isOpen} onClose={onClose} id={id} title={title} closeLabel="Close search">
      <form className="p-4" onSubmit={(e) => e.preventDefault()}>
        <label className="relative block">
          <span className="pointer-events-none absolute inset-y-0 inset-s-3 flex items-center text-black/40">
            <FontAwesomeIcon icon={faSearch} className="h-4 w-4" />
          </span>
          <input
            ref={inputRef}
            type="search"
            name="q"
            autoComplete="off"
            placeholder={searchPlaceholder}
            className="w-full rounded-0 border border-black/20 bg-white py-2.5 ps-10 pe-4 text-sm text-black outline-none transition placeholder:text-black/50 focus:border-black/40"
            tabIndex={isOpen ? 0 : -1}
          />
        </label>
      </form>
    </HeaderSideDrawer>
  );
}

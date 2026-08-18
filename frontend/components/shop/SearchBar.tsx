"use client";

import { useQueryParams } from "@/hooks/use-query-params";
import { SearchIcon } from "@/components/ui/icons";
import { useEffect, useRef, useState } from "react";

export function SearchBar() {
  const { searchParams, setParams } = useQueryParams();
  const current = searchParams.get("q") ?? "";
  const [value, setValue] = useState(current);
  const lastEmittedRef = useRef(current);

  // Reflect external URL changes (back/forward, filter resets) into the input.
  useEffect(() => {
    if (current !== lastEmittedRef.current) {
      setValue(current);
      lastEmittedRef.current = current;
    }
  }, [current]);

  // Realtime search — push to the URL after a short debounce.
  useEffect(() => {
    if (value === current) return;
    const timer = setTimeout(() => {
      setParams({ q: value || null });
      lastEmittedRef.current = value || "";
    }, 350);
    return () => clearTimeout(timer);
  }, [value, current, setParams]);

  return (
    <div className="relative" role="search">
      <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-faint" />
      <input
        type="search"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Search products"
        aria-label="Search products"
        className="h-11 w-full rounded-md border border-border bg-surface pl-10 pr-3 text-body text-ink placeholder:text-ink-faint focus:border-accent focus:outline-none"
      />
    </div>
  );
}
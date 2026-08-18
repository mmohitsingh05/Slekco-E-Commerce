"use client";

import { useQueryParams } from "@/hooks/use-query-params";
import { SearchIcon } from "@/components/ui/icons";

export function SearchBar() {
  const { searchParams, setParams } = useQueryParams();
  const current = searchParams.get("q") ?? "";

  return (
    <form
      role="search"
      className="relative"
      onSubmit={(event) => {
        event.preventDefault();
        const input = event.currentTarget.elements.namedItem("q") as HTMLInputElement;
        setParams({ q: input.value });
      }}
    >
      <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-faint" />
      <input
        type="search"
        name="q"
        defaultValue={current}
        placeholder="Search products"
        aria-label="Search products"
        className="h-11 w-full rounded-md border border-border bg-surface pl-10 pr-3 text-body text-ink placeholder:text-ink-faint focus:border-accent focus:outline-none"
      />
    </form>
  );
}
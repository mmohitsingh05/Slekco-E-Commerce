"use client";

import { useQueryParams } from "@/hooks/use-query-params";
import type { SortOption } from "@/lib/types";

const options: { value: SortOption; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "price_asc", label: "Price: low to high" },
  { value: "price_desc", label: "Price: high to low" },
  { value: "newest", label: "Newest" },
  { value: "rating", label: "Top rated" },
];

export function SortSelect() {
  const { searchParams, setParams } = useQueryParams();
  const current = (searchParams.get("sort") ?? "featured") as SortOption;

  return (
    <label className="flex items-center gap-2 text-body-sm text-ink-soft">
      <span className="sr-only md:not-sr-only">Sort</span>
      <select
        value={current}
        onChange={(event) => setParams({ sort: event.target.value })}
        className="h-11 rounded-md border border-border bg-surface px-3 text-body text-ink focus:border-accent focus:outline-none"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
"use client";

import { useQueryParams } from "@/hooks/use-query-params";
import type { Category } from "@/lib/types";

export function FilterBar({ categories }: { categories: Category[] }) {
  const { searchParams, setParams } = useQueryParams();
  const active = searchParams.get("category") ?? "";

  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
      <button
        type="button"
        onClick={() => setParams({ category: null })}
        aria-pressed={active === ""}
        className={`rounded-full border px-4 py-2 text-body-sm transition-colors ${
          active === ""
            ? "border-accent bg-accent text-surface"
            : "border-border bg-surface text-ink-soft hover:border-ink"
        }`}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category._id}
          type="button"
          onClick={() => setParams({ category: category.slug })}
          aria-pressed={active === category.slug}
          className={`rounded-full border px-4 py-2 text-body-sm transition-colors ${
            active === category.slug
              ? "border-accent bg-accent text-surface"
              : "border-border bg-surface text-ink-soft hover:border-ink"
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}
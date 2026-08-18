"use client";

import { useState } from "react";
import { useQueryParams } from "@/hooks/use-query-params";
import { CloseIcon } from "@/components/ui/icons";
import type { Category } from "@/lib/types";

export function FilterBar({
  categories,
  brands,
}: {
  categories: Category[];
  brands: string[];
}) {
  const { searchParams, setParams } = useQueryParams();

  const activeCategory = searchParams.get("category") ?? "";
  const activeBrand = searchParams.get("brand") ?? "";
  const q = searchParams.get("q") ?? "";
  const minPriceParam = searchParams.get("minPrice") ?? "";
  const maxPriceParam = searchParams.get("maxPrice") ?? "";

  const [min, setMin] = useState(minPriceParam);
  const [max, setMax] = useState(maxPriceParam);

  const [prevMin, setPrevMin] = useState(minPriceParam);
  if (minPriceParam !== prevMin) {
    setPrevMin(minPriceParam);
    setMin(minPriceParam);
  }

  const [prevMax, setPrevMax] = useState(maxPriceParam);
  if (maxPriceParam !== prevMax) {
    setPrevMax(maxPriceParam);
    setMax(maxPriceParam);
  }

  const categoryName = categories.find((c) => c.slug === activeCategory)?.name ?? activeCategory;
  const clearAll = () =>
    setParams({ q: null, category: null, brand: null, minPrice: null, maxPrice: null });

  const activeChips: { label: string; onClear: () => void }[] = [];
  if (q) activeChips.push({ label: `“${q}”`, onClear: () => setParams({ q: null }) });
  if (activeCategory)
    activeChips.push({ label: categoryName, onClear: () => setParams({ category: null }) });
  if (activeBrand) activeChips.push({ label: activeBrand, onClear: () => setParams({ brand: null }) });
  if (minPriceParam || maxPriceParam)
    activeChips.push({
      label: `₹${minPriceParam || 0}–₹${maxPriceParam || "∞"}`,
      onClear: () => setParams({ minPrice: null, maxPrice: null }),
    });

  const chipBase =
    "inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5 text-body-sm text-ink-soft transition-colors hover:border-ink";

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter by category">
        <button
          type="button"
          onClick={() => setParams({ category: null })}
          aria-pressed={activeCategory === ""}
          className={`rounded-full border px-4 py-2 text-body-sm transition-colors ${
            activeCategory === ""
              ? "border-accent bg-accent text-surface"
              : "border-border bg-surface text-ink-soft hover:border-ink"
          }`}
        >
          All categories
        </button>
        {categories.map((category) => (
          <button
            key={category._id}
            type="button"
            onClick={() => setParams({ category: category.slug })}
            aria-pressed={activeCategory === category.slug}
            className={`rounded-full border px-4 py-2 text-body-sm transition-colors ${
              activeCategory === category.slug
                ? "border-accent bg-accent text-surface"
                : "border-border bg-surface text-ink-soft hover:border-ink"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {brands.length > 0 && (
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter by brand">
          <span className="text-body-sm text-ink-faint">Brand:</span>
          <button
            type="button"
            onClick={() => setParams({ brand: null })}
            aria-pressed={activeBrand === ""}
            className={`rounded-full border px-3 py-1.5 text-body-sm transition-colors ${
              activeBrand === ""
                ? "border-accent bg-accent text-surface"
                : "border-border bg-surface text-ink-soft hover:border-ink"
            }`}
          >
            All brands
          </button>
          {brands.map((brand) => (
            <button
              key={brand}
              type="button"
              onClick={() => setParams({ brand })}
              aria-pressed={activeBrand === brand}
              className={`rounded-full border px-3 py-1.5 text-body-sm transition-colors ${
                activeBrand === brand
                  ? "border-accent bg-accent text-surface"
                  : "border-border bg-surface text-ink-soft hover:border-ink"
              }`}
            >
              {brand}
            </button>
          ))}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter by price">
        <span className="text-body-sm text-ink-faint">Price:</span>
        <label className="sr-only" htmlFor="price-min">
          Minimum price
        </label>
        <input
          id="price-min"
          type="number"
          min={0}
          inputMode="numeric"
          value={min}
          onChange={(event) => setMin(event.target.value)}
          placeholder="Min ₹"
          className="h-9 w-24 rounded-md border border-border bg-surface px-2 text-body-sm text-ink placeholder:text-ink-faint focus:border-accent focus:outline-none"
        />
        <span aria-hidden="true" className="text-ink-faint">
          –
        </span>
        <label className="sr-only" htmlFor="price-max">
          Maximum price
        </label>
        <input
          id="price-max"
          type="number"
          min={0}
          inputMode="numeric"
          value={max}
          onChange={(event) => setMax(event.target.value)}
          placeholder="Max ₹"
          className="h-9 w-24 rounded-md border border-border bg-surface px-2 text-body-sm text-ink placeholder:text-ink-faint focus:border-accent focus:outline-none"
        />
        <button
          type="button"
          onClick={() => setParams({ minPrice: min || null, maxPrice: max || null })}
          className="h-9 rounded-md border border-border bg-surface px-4 text-body-sm font-medium text-ink transition-colors hover:border-ink"
        >
          Apply
        </button>
      </div>

      {activeChips.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 border-t border-border pt-4" aria-live="polite">
          <span className="text-body-sm text-ink-faint">Active filters:</span>
          {activeChips.map((chip) => (
            <button
              key={chip.label}
              type="button"
              onClick={chip.onClear}
              className={`${chipBase} pr-2`}
            >
              {chip.label}
              <CloseIcon className="h-3.5 w-3.5" />
            </button>
          ))}
          <button type="button" onClick={clearAll} className="text-body-sm font-medium text-accent underline-offset-2 hover:underline">
            Clear all
          </button>
        </div>
      )}
    </div>
  );
}
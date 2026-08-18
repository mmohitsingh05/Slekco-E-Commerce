"use client";

import { useState } from "react";
import { useQueryParams } from "@/hooks/use-query-params";
import { ChevronDownIcon, CloseIcon } from "@/components/ui/icons";
import type { Category } from "@/lib/types";

const radioRow =
  "flex w-full items-center gap-3 rounded-md px-2 py-2 text-body-sm text-ink-soft transition-colors hover:bg-canvas hover:text-ink";

function RadioDot({ active }: { active: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-colors ${
        active ? "border-accent bg-accent" : "border-border bg-surface"
      }`}
    >
      {active && <span className="h-1.5 w-1.5 rounded-full bg-surface" />}
    </span>
  );
}

export function FilterBar({
  categories,
  brands,
  brandCounts,
}: {
  categories: Category[];
  brands: string[];
  brandCounts?: Record<string, number>;
}) {
  const { searchParams, setParams } = useQueryParams();
  const [mobileOpen, setMobileOpen] = useState(false);

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
    "inline-flex items-center gap-1.5 rounded-full border border-border bg-canvas px-3 py-1 text-body-sm text-ink-soft transition-colors hover:border-ink";

  const section = "border-t border-border first:border-t-0";

  return (
    <div className="flex flex-col gap-4">
      <button
        type="button"
        onClick={() => setMobileOpen((open) => !open)}
        aria-expanded={mobileOpen}
        className="flex h-11 items-center justify-between rounded-md border border-border bg-surface px-4 text-body-sm font-medium text-ink transition-colors hover:border-ink lg:hidden"
      >
        <span>
          Filters{activeChips.length > 0 ? ` (${activeChips.length})` : ""}
        </span>
        <ChevronDownIcon
          className={`h-4 w-4 text-ink-faint transition-transform ${mobileOpen ? "rotate-180" : ""}`}
        />
      </button>

      <div
        className={`flex-col gap-4 ${mobileOpen ? "flex" : "hidden"} lg:flex`}
      >
        <div className="rounded-xl border border-border bg-surface p-5">
          <div className="mb-1 flex items-center justify-between">
            <h2 className="text-label uppercase text-ink-faint">Filters</h2>
            {activeChips.length > 0 && (
              <button
                type="button"
                onClick={clearAll}
                className="text-body-sm font-medium text-accent underline-offset-2 hover:underline"
              >
                Clear all
              </button>
            )}
          </div>

          <fieldset className="pt-4">
            <legend className="text-body-sm font-semibold text-ink">Category</legend>
            <div className="mt-2 flex flex-col gap-0.5">
              <button
                type="button"
                onClick={() => setParams({ category: null })}
                aria-pressed={activeCategory === ""}
                className={`${radioRow} ${activeCategory === "" ? "bg-accent-soft text-ink" : ""}`}
              >
                <RadioDot active={activeCategory === ""} />
                <span className="flex-1 text-left">All categories</span>
                <span className="text-body-xs text-ink-faint">
                  {categories.reduce((sum, c) => sum + (c.productCount ?? 0), 0)}
                </span>
              </button>
              {categories.map((category) => {
                const active = activeCategory === category.slug;
                return (
                  <button
                    key={category._id}
                    type="button"
                    onClick={() => setParams({ category: category.slug })}
                    aria-pressed={active}
                    className={`${radioRow} ${active ? "bg-accent-soft text-ink" : ""}`}
                  >
                    <RadioDot active={active} />
                    <span className="flex-1 text-left">{category.name}</span>
                    {category.productCount !== undefined && (
                      <span className="text-body-xs text-ink-faint">{category.productCount}</span>
                    )}
                  </button>
                );
              })}
            </div>
          </fieldset>

          <fieldset className={`${section} mt-4 pt-4`}>
            <legend className="text-body-sm font-semibold text-ink">Brand</legend>
            <div className="mt-2 flex max-h-56 flex-col gap-0.5 overflow-y-auto pr-1">
              <button
                type="button"
                onClick={() => setParams({ brand: null })}
                aria-pressed={activeBrand === ""}
                className={`${radioRow} ${activeBrand === "" ? "bg-accent-soft text-ink" : ""}`}
              >
                <RadioDot active={activeBrand === ""} />
                <span className="flex-1 text-left">All brands</span>
              </button>
              {brands.map((brand) => {
                const active = activeBrand === brand;
                return (
                  <button
                    key={brand}
                    type="button"
                    onClick={() => setParams({ brand })}
                    aria-pressed={active}
                    className={`${radioRow} ${active ? "bg-accent-soft text-ink" : ""}`}
                  >
                    <RadioDot active={active} />
                    <span className="flex-1 text-left">{brand}</span>
                    {brandCounts?.[brand] !== undefined && (
                      <span className="text-body-xs text-ink-faint">{brandCounts[brand]}</span>
                    )}
                  </button>
                );
              })}
            </div>
          </fieldset>

          <fieldset className={`${section} mt-4 pt-4`}>
            <legend className="text-body-sm font-semibold text-ink">Price</legend>
            <div className="mt-2 flex items-center gap-2">
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
                className="h-10 w-full rounded-md border border-border bg-canvas px-3 text-body-sm text-ink placeholder:text-ink-faint focus:border-accent focus:outline-none"
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
                className="h-10 w-full rounded-md border border-border bg-canvas px-3 text-body-sm text-ink placeholder:text-ink-faint focus:border-accent focus:outline-none"
              />
            </div>
            <button
              type="button"
              onClick={() => setParams({ minPrice: min || null, maxPrice: max || null })}
              className="mt-3 h-10 w-full rounded-md bg-accent text-body-sm font-medium text-surface transition-colors hover:bg-accent-hover"
            >
              Apply
            </button>
          </fieldset>

          {activeChips.length > 0 && (
            <div
              className={`${section} mt-4 flex flex-wrap items-center gap-2 pt-4`}
              aria-live="polite"
            >
              <span className="text-body-xs text-ink-faint">Active:</span>
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
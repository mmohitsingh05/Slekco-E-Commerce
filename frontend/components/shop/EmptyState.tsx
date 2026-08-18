import Link from "next/link";

export function EmptyState() {
  return (
    <div className="flex flex-col items-center gap-4 py-16 text-center">
      <p className="text-h2 font-semibold text-ink">No products found</p>
      <p className="max-w-sm text-body text-ink-soft">
        We couldn&apos;t find anything matching your search. Try a different
        keyword or clear your filters.
      </p>
      <Link
        href="/products"
        className="mt-2 inline-flex items-center rounded-md bg-accent px-5 py-3 text-body-sm font-medium text-surface transition-colors hover:bg-accent-hover"
      >
        Clear filters
      </Link>
    </div>
  );
}
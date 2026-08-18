import Link from "next/link";
import { ArrowRightIcon } from "@/components/ui/icons";

export function Pagination({
  page,
  pages,
  buildHref,
}: {
  page: number;
  pages: number;
  buildHref: (page: number) => string;
}) {
  if (pages <= 1) return null;

  return (
    <nav aria-label="Pagination" className="mt-10 flex items-center justify-center gap-2">
      {page > 1 && (
        <Link
          href={buildHref(page - 1)}
          className="flex h-10 items-center rounded-md border border-border bg-surface px-3 text-body-sm text-ink-soft transition-colors hover:border-ink hover:text-ink"
        >
          Previous
        </Link>
      )}
      <span className="px-3 text-body-sm text-ink-faint" aria-current="page">
        Page {page} of {pages}
      </span>
      {page < pages && (
        <Link
          href={buildHref(page + 1)}
          className="flex h-10 items-center gap-1 rounded-md border border-border bg-surface px-3 text-body-sm text-ink-soft transition-colors hover:border-ink hover:text-ink"
        >
          Next <ArrowRightIcon />
        </Link>
      )}
    </nav>
  );
}
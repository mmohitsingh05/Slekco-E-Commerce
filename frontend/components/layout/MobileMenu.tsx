"use client";

import Link from "next/link";
import { site } from "@/lib/site";

export function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <div
      id="mobile-menu"
      className={`overflow-hidden border-b border-border bg-surface transition-[max-height,opacity] duration-base ease-out md:hidden ${
        open ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
      }`}
    >
      <nav aria-label="Mobile" className="flex flex-col px-5 py-4">
        {site.nav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
            className="rounded-md px-3 py-3 text-body text-ink transition-colors hover:bg-canvas"
          >
            {item.label}
          </Link>
        ))}
        <Link
          href="/products"
          onClick={onClose}
          className="rounded-md px-3 py-3 text-body font-medium text-accent"
        >
          Search
        </Link>
      </nav>
    </div>
  );
}
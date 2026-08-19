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
      className={`overflow-hidden border-b border-gray-200 bg-white transition-[max-height,opacity] duration-base ease-out md:hidden ${
        open ? "max-h-72 opacity-100" : "max-h-0 opacity-0"
      }`}
    >
      <nav aria-label="Mobile" className="flex flex-col px-5 py-4">
        {site.nav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
            className="rounded-md px-3 py-3 text-sm font-bold uppercase tracking-wide text-brand-dark transition-colors hover:bg-gray-50"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}

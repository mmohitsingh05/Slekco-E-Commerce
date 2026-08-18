"use client";

import Link from "next/link";
import { useState } from "react";
import { site } from "@/lib/site";
import { CartButton } from "@/components/layout/CartButton";
import { Container } from "@/components/ui/Container";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { MenuIcon, SearchIcon } from "@/components/ui/icons";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-canvas/80 shadow-sticky backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="text-h3 font-semibold tracking-tight text-ink"
          aria-label={`${site.name} home`}
        >
          {site.name}
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-6 md:flex">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-body-sm text-ink-soft transition-colors hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <Link
            href="/products"
            aria-label="Search products"
            className="flex h-11 w-11 items-center justify-center rounded-md text-ink-soft transition-colors hover:bg-surface hover:text-ink"
          >
            <SearchIcon />
          </Link>
          <CartButton />
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label="Toggle menu"
            className="flex h-11 w-11 items-center justify-center rounded-md text-ink transition-colors hover:bg-surface md:hidden"
          >
            <MenuIcon />
          </button>
        </div>
      </Container>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { site } from "@/lib/site";
import { CartButton } from "@/components/layout/CartButton";
import { Container } from "@/components/ui/Container";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { MenuIcon, SearchIcon, UserIcon } from "@/components/ui/icons";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <Container className="flex h-20 items-center justify-between gap-4">
        {/* Logo */}
        <Link
          href="/"
          className="text-3xl font-black italic uppercase tracking-tighter text-brand-dark"
          aria-label={`${site.name} home`}
        >
          {site.name}
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden items-center space-x-8 text-sm font-bold tracking-wide md:flex">
          {site.nav.map((item) => {
            const active =
              item.href === "/products"
                ? pathname.startsWith("/products") || pathname.startsWith("/categories")
                : pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`pb-1 transition-colors ${
                  active
                    ? "border-b-2 border-brand-yellow text-brand-dark"
                    : "hover:text-gray-600"
                }`}
              >
                {item.label.toUpperCase()}
              </Link>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-6 text-lg">
          <Link
            href="/products"
            aria-label="Search products"
            className="hover:text-gray-600 transition-colors"
          >
            <SearchIcon />
          </Link>
          <button
            type="button"
            aria-label="Account"
            className="hidden hover:text-gray-600 transition-colors md:block"
          >
            <UserIcon />
          </button>
          <CartButton />
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label="Toggle menu"
            className="flex h-11 w-11 items-center justify-center rounded-md text-brand-dark transition-colors hover:bg-gray-100 md:hidden"
          >
            <MenuIcon />
          </button>
        </div>
      </Container>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}

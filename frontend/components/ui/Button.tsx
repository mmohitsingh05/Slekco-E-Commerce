import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "outline" | "outline-light" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-md px-8 py-3 text-xs font-bold uppercase tracking-wide transition-colors duration-fast ease-out focus-visible:outline-2 focus-visible:outline-offset-2";

const variants: Record<Variant, string> = {
  primary: "bg-brand-yellow text-brand-dark hover:bg-brand-yellow-hover",
  outline: "border border-ink bg-transparent text-ink hover:bg-ink hover:text-surface",
  "outline-light": "border border-white bg-transparent text-white hover:bg-white hover:text-brand-dark",
  ghost: "text-ink-soft hover:text-ink",
};

interface CommonProps {
  variant?: Variant;
  children: ReactNode;
  className?: string;
}

export function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: CommonProps & ComponentProps<"button">) {
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}

export function ButtonLink({
  variant = "primary",
  className = "",
  children,
  ...props
}: CommonProps & ComponentProps<typeof Link>) {
  return (
    <Link className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </Link>
  );
}

import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "outline" | "outline-light" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-md px-8 py-3 text-xs font-bold uppercase tracking-wide transition-all duration-fast ease-out focus-visible:outline-2 focus-visible:outline-offset-2";

const variants: Record<Variant, string> = {
  primary: "bg-gradient-to-b from-brand-yellow to-[#c8e430] text-brand-dark shadow-[0_1px_2px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.25)] hover:from-brand-yellow-hover hover:to-[#e6c52e] hover:shadow-[0_2px_8px_rgba(0,0,0,0.15)]",
  outline: "border border-ink bg-transparent text-ink hover:bg-ink hover:text-surface",
  "outline-light": "border border-white/40 bg-transparent text-white hover:bg-white/10 hover:border-white/60",
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

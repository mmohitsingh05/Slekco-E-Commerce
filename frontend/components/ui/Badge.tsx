import type { ReactNode } from "react";

type Tone = "accent" | "neutral" | "danger" | "success";

const tones: Record<Tone, string> = {
  accent: "bg-accent-soft text-accent-foreground",
  neutral: "bg-canvas text-ink-soft",
  danger: "bg-danger/10 text-danger",
  success: "bg-success/10 text-success",
};

export function Badge({
  tone = "neutral",
  children,
  className = "",
}: {
  tone?: Tone;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-sm px-2 py-0.5 text-label uppercase ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
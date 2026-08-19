"use client";

import { content } from "@/lib/content";
import { formatINR } from "@/lib/format";

export function FreeShippingProgress({ subtotal }: { subtotal: number }) {
  const remaining = Math.max(0, content.freeShippingThreshold - subtotal);
  const percent = Math.min(
    100,
    Math.round((subtotal / content.freeShippingThreshold) * 100),
  );
  const unlocked = remaining === 0;

  return (
    <div className="space-y-2">
      {unlocked ? (
        <p className="text-[11px] font-bold uppercase tracking-wide text-success">
          You&apos;ve unlocked free shipping!
        </p>
      ) : (
        <p className="text-[11px] font-bold uppercase tracking-wide">
          You&apos;re{" "}
          <span className="text-ink">{formatINR(remaining)}</span>{" "}
          away from free shipping
        </p>
      )}
      <div
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        className="h-1.5 w-full overflow-hidden rounded-full bg-border"
      >
        <div
          className={`h-full rounded-full transition-[width] duration-fast ease-out ${unlocked ? "bg-success" : "bg-ink"}`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

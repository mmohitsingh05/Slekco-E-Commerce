"use client";

export function QuantityStepper({
  qty,
  onChange,
  max = 99,
}: {
  qty: number;
  onChange: (qty: number) => void;
  max?: number;
}) {
  return (
    <div
      className="inline-flex h-11 items-center rounded-md border border-border bg-surface"
      role="group"
      aria-label="Quantity"
    >
      <button
        type="button"
        onClick={() => onChange(Math.max(1, qty - 1))}
        disabled={qty <= 1}
        aria-label="Decrease quantity"
        className="flex h-full w-10 items-center justify-center text-ink transition-colors hover:bg-canvas disabled:opacity-40"
      >
        −
      </button>
      <span className="w-10 text-center text-body font-medium text-ink" aria-live="polite">
        {qty}
      </span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, qty + 1))}
        disabled={qty >= max}
        aria-label="Increase quantity"
        className="flex h-full w-10 items-center justify-center text-ink transition-colors hover:bg-canvas disabled:opacity-40"
      >
        +
      </button>
    </div>
  );
}
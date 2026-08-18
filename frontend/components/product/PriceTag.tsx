import { discountPercent, formatINR } from "@/lib/format";
import { Badge } from "@/components/ui/Badge";

export function PriceTag({
  price,
  compareAtPrice,
  size = "md",
}: {
  price: number;
  compareAtPrice: number | null;
  size?: "md" | "lg";
}) {
  const discount = discountPercent(price, compareAtPrice);

  return (
    <div className="flex items-center gap-2">
      <span
        className={`font-semibold text-ink ${size === "lg" ? "text-h2" : "text-body"}`}
      >
        {formatINR(price)}
      </span>
      {compareAtPrice && (
        <span
          className={`text-ink-faint line-through ${size === "lg" ? "text-body" : "text-body-sm"}`}
        >
          {formatINR(compareAtPrice)}
        </span>
      )}
      {discount !== null && (
        <Badge tone="accent">{discount}% off</Badge>
      )}
    </div>
  );
}
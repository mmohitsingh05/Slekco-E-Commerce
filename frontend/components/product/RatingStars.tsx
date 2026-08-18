import { formatRating } from "@/lib/format";
import { StarIcon } from "@/components/ui/icons";

export function RatingStars({
  rating,
  ratingCount,
  className = "",
}: {
  rating: number;
  ratingCount?: number;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-1 ${className}`} aria-label={`Rated ${formatRating(rating)} out of 5`}>
      <span className="flex items-center gap-0.5 text-warning" aria-hidden="true">
        <StarIcon />
      </span>
      <span className="text-body-sm font-medium text-ink">{formatRating(rating)}</span>
      {ratingCount !== undefined && (
        <span className="text-body-sm text-ink-faint">({ratingCount})</span>
      )}
    </div>
  );
}
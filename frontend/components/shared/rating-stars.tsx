import { Star } from "lucide-react";

interface RatingStarsProps {
  rating: number;
}

export function RatingStars({
  rating,
}: RatingStarsProps) {
  return (
    <div className="flex items-center gap-1">
      <Star
        className="h-4 w-4 fill-yellow-400 text-yellow-400"
      />

      <span className="text-sm font-medium">
        {rating.toFixed(1)}
      </span>
    </div>
  );
}
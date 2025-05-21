import { Star } from "lucide-react";
import React from "react";

type RatingProps = {
  value: number;
};

const Rating: React.FC<RatingProps> = ({ value }) => {
  const fullStars = Math.floor(value);
  const hasHalfStar = value % 1 >= 0.5;
  const maxStars = 5;

  return (
    <div className="flex items-center gap-1">
      {[...Array(fullStars)].map((_, i) => (
        <Star
          key={`full-${i}`}
          className="text-yellow-500 w-4 h-4 fill-yellow-500"
        />
      ))}

      {hasHalfStar && (
        <Star
          key="half"
          className="text-yellow-500 w-4 h-4 fill-yellow-500 opacity-50"
        />
      )}

      {[...Array(maxStars - fullStars - (hasHalfStar ? 1 : 0))].map((_, i) => (
        <Star key={`empty-${i}`} className="text-gray-300 w-4 h-4" />
      ))}

      <span className="text-gray-700 text-sm ml-1">({value.toFixed(1)})</span>
    </div>
  );
};

export default Rating;

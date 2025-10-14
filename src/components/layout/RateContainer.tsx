import type { RatingAverage } from "../../types/Review";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import ReviewCard from './ReviewCard.tsx'; // 1. IMPORTAR o componente de card individual

interface StoreReviewsProps {
  data: RatingAverage;
}

const StoreReviews: React.FC<StoreReviewsProps> = ({ data }) => {
  const ratingLevels = [
  { level: 5, value: data.ratingDistribution.stars5 },
  { level: 4, value: data.ratingDistribution.stars4 },
  { level: 3, value: data.ratingDistribution.stars3 },
  { level: 2, value: data.ratingDistribution.stars2 },
  { level: 1, value: data.ratingDistribution.stars1 },
];

  return (
    <div>
        <div className="flex items-start gap-6 sm:gap-12 mb-8">
       <div className="flex flex-col flex-shrink-0">
          <p className="text-6xl font-bold text-gray-800">{data.average}</p>
          <div className="flex my-1">
            {[1, 2, 3, 4, 5].map((starNumber) => {
              const starProps = { key: starNumber, sx: { color: "#facc15", width: 20, height: 20 } };
              if (data.average >= starNumber) return <StarIcon {...starProps} />;
              if (data.average >= starNumber - 0.5) return <StarHalfIcon {...starProps} />;
              return <StarBorderIcon {...starProps} />;
            })}
          </div>
          <p className="text-sm text-gray-600">{data.total} avaliações</p>
        </div>

        <div className="w-full pt-2 ">
          <div className="flex flex-col gap-2">
            {ratingLevels.map((item) => (
              <div key={item.level} className="flex items-center gap-2 text-sm">
                <p className="text-gray-600">{item.level}★</p>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-indigo-500 h-2 rounded-full"
                    style={{ width: `${item.value}%` }}
                  ></div>
                </div>
                <p className="font-semibold text-gray-600 w-10 text-right">{item.value}%</p>
              </div>
            ))}
          </div>
        </div>
        </div>
 <div className="mt-8">
        
        {data.reviews.map((review) => (
          <ReviewCard key={review.id} data={review} />
        ))}

      </div>
</div>
  );
};

export default StoreReviews;
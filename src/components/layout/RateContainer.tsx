import type { StoreReviewsData } from "../../types";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarBorderIcon from "@mui/icons-material/StarBorder";

interface StoreReviewsProps {
  data: StoreReviewsData;
}

const StoreReviews: React.FC<StoreReviewsProps> = ({ data }) => {
  return (
    <div className="font-sans p-8 bg-white rounded-lg shadow-md max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Avaliações do produto
      </h2>
      {/* Nosso novo container */}
      <div className="flex">
        <p className="text-5xl font-bold text-gray-800">{data.averageRating}</p>
        <div className="flex">
          {" "}
          {[1, 2, 3, 4, 5].map((starNumber) => {
            if (data.averageRating >= starNumber) {
              return <StarIcon key={starNumber} sx={{ color: "#facc15" }} />;
            }
            if (data.averageRating >= starNumber - 0.5) {
              return (
                <StarHalfIcon key={starNumber} sx={{ color: "#facc15" }} />
              );
            }
            return (
              <StarBorderIcon key={starNumber} sx={{ color: "#facc15" }} />
            );
          })}
        </div>
        <p className="text-1xl font-bold text-gray-800">{data.totalReviews}</p>
      </div>
    </div>
  );
};

export default StoreReviews;

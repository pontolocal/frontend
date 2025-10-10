import React from 'react';
import type { Rating } from '../../types/Review';
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import ProfileIcon from '../ui/ProfileIcon';

interface ReviewCardProps {
  data: Rating;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ data }) => {
  return (
    <div className="py-6 mb-4">
      
      <div className="flex items-start gap-4">
        
        <ProfileIcon 
          photoUrl={data.author.photoUrl}
          initials={data.author.initials}
          authorName={data.author.name}
        />
        <div className="w-full">
          <div className="flex justify-between items-center">
            
            <div className="flex items-center gap-2">
              <p className="font-bold text-gray-800">{data.author.name}</p>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((starNumber) => {
                  const starProps = { key: starNumber, sx: { color: "#facc15", width: 16, height: 16 } };
                  if (data.rating >= starNumber) return <StarIcon {...starProps} />;
                  if (data.rating >= starNumber - 0.5) return <StarHalfIcon {...starProps} />;
                  return <StarBorderIcon {...starProps} />;
                })}
              </div>
            </div>
            <p className="text-sm text-gray-500">{data.createdAt}</p>

          </div>
          <p className="mt-2 text-gray-700 text-sm leading-relaxed">
            {data.comment}
          </p>

        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
import type CategoryType from "../../models/Categories";

const CategoryCard = ({ name, imageUrl }: CategoryType) => {
  return (
    <div className="w-full h-48 flex flex-col gap-2 items-center justify-around rounded-xl cursor-pointer bg-white">
      <img src={imageUrl} alt={name} className="w-28 h-28 object-cover rounded-full" />
      <span className="text-center font-semibold text-grey-3 truncate w-24">{name}</span>
    </div>
  );
};

export default CategoryCard;

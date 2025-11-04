import type { ProductType } from "../../models/Products";
import { Button } from "./Button";
import whatsAppIcon from "../../assets/images/whatsapp-icon.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import Rating from "@mui/material/Rating";
import { FavoriteBorder } from "@mui/icons-material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useGlobal } from "../../hooks/useGlobal";

const ProductCard = ({ product }: { product: ProductType }) => {
  const {themeMode} = useGlobal()
  const [isFavorited, setIsFavorited] = useState<boolean>();
  return (
    <div className={`relative flex flex-col w-[335px] p-8 shadow-xl rounded-2xl ${themeMode === "light" ? "bg-white" : "bg-blue-4"}`}>
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-[180px] object-cover rounded-2xl"
      />
      <div className="flex flex-col gap-2 py-4">
        <div className="flex flex-col">
          <button
            onClick={() => setIsFavorited(!isFavorited)}
            className="absolute right-8 cursor-pointer w-fit"
          >
            {isFavorited ? (
              <FavoriteIcon className="text-red-600" />
            ) : (
              <FavoriteBorder className="text-gray-500" />
            )}
          </button>

          <h2 className="font-bold text-xl">{product.name}</h2>
          <h3 className="text-[#585A5C] font-medium text-xs opacity-60">
            {product.categoryName}
          </h3>
          <h3 className="text-[#585A5C] font-bold">{product.storeName}</h3>
          <Rating
            name="half-rating-read"
            defaultValue={5}
            value={product.rating}
            precision={0.5}
            readOnly
            size="small"
          />
        </div>
        <div className="flex flex-col">
          <span className="text-blue-3 font-bold text-xl">
            R$ {product.price.toFixed(2).replace(".", ",")}
          </span>
          <span className="font-bold text-sm">à unidade</span>
        </div>
        <p className="text-sm">{product.description}</p>
      </div>
      <div className="flex flex-col gap-2">
        <Link to={`/products/${product.id}`}>
          <Button
            styles="border justify-center text-blue-3 font-semibold"
            text="Ver detalhes"
          />
        </Link>
        <Button
          styles="bg-blue-3 text-white font-semibold"
          text="Comprar na What's App"
          icon={whatsAppIcon}
        />
      </div>
    </div>
  );
};

export default ProductCard;

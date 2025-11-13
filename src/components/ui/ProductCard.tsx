import type { Product } from "../../types/Product";
import { Button } from "./Button";
import whatsAppIcon from "../../assets/images/whatsapp-icon.png";
import { Link } from "react-router-dom";
import { useState } from "react";
// import Rating from "@mui/material/Rating";
import { FavoriteBorder } from "@mui/icons-material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useGlobal } from "../../hooks/useGlobal";
import imageDefault from "../../assets/images/no-image.png";
import { useRegisterFavorite } from "../../hooks/useRegisterFavorite";
import { useDeleteFavorite } from "../../hooks/useDeleteFavorite,";

const ProductCard = ({ product }: { product: Product }) => {
  const { themeMode, userId } = useGlobal();
  const [isFavorited, setIsFavorited] = useState<boolean>();
  const { fetchFavorites } = useRegisterFavorite();
  const { fetchDeleteFavorite } = useDeleteFavorite();

  const handleFavorited = (productId: number | undefined) => {
    setIsFavorited(!isFavorited);
    fetchFavorites(`favorites/user/${userId}/product/${productId}`);
    if (!isFavorited) {
    } else {
      fetchDeleteFavorite(`favorites/user/${userId}/product/${productId}`);
    }
  };

  return (
    <div
      className={`relative flex flex-col w-[335px] p-8 shadow-xl rounded-2xl ${
        themeMode === "light" ? "bg-white" : "bg-blue-3"
      }`}
    >
      <img
        src={imageDefault}
        alt={product.name}
        className="w-full h-[180px] object-cover rounded-2xl"
      />
      <div className="flex flex-col gap-2 py-4">
        <div className="flex flex-col">
          <button
            onClick={() => handleFavorited(product?.id)}
            className="absolute right-8 cursor-pointer w-fit"
          >
            {isFavorited ? (
              <FavoriteIcon className="text-red-600" />
            ) : (
              <FavoriteBorder className="text-gray-400" />
            )}
          </button>

          <h2 className="font-bold text-xl w-56 truncate">{product.name}</h2>
          <h3 className=" font-medium text-xs opacity-60">
            {product.categoryName}
          </h3>
          <h3 className="opacity-50 font-bold w-68 truncate text-sm">
            Loja: {product.userName}
          </h3>
          {/* <Rating
            name="half-rating-read"
            defaultValue={5}
            value={product.rating}
            precision={0.5}
            readOnly
            size="small"
          /> */}
        </div>
        <div className="flex flex-col">
          <span
            className={`${
              themeMode === "light" ? "text-blue-3" : "text-green-300"
            } font-bold text-xl`}
          >
            R$ {product.price.toFixed(2).replace(".", ",")}
          </span>
          <span className="font-bold text-sm">à unidade</span>
        </div>
        <p className="text-sm w-68 truncate">{product.description}</p>
      </div>
      <div className="flex flex-col gap-2">
        <Link to={`/products/${product.id}`}>
          <Button
            styles={`${
              themeMode === "light" ? "text-blue-3" : "text-blue-0"
            } border justify-center font-semibold`}
            text="Ver detalhes"
          />
        </Link>
        <Button
          styles={`${
            themeMode === "light" ? "bg-blue-3" : "bg-blue-4"
          } text-white font-semibold`}
          text="Comprar na What's App"
          icon={whatsAppIcon}
        />
      </div>
    </div>
  );
};

export default ProductCard;

import { Link, useParams } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { FavoriteBorder } from "@mui/icons-material";
import whatsAppIcon from "../assets/images/whatsapp-icon.png";
import { useProduct } from "../hooks/useProduct";
import { useEffect, useState } from "react";
import { Button } from "../components/ui/Button";
import { Rating } from "@mui/material";
import { SecAvaliacoes } from "./Dashboard/sections/SecAvaliacoes";
import { useGlobal } from "../hooks/useGlobal";
import noImage from "../assets/images/no-image.png"

const ProductDetail = () => {
  const {themeMode, userId} = useGlobal()
  const [isFavorited, setIsFavorited] = useState<boolean>();
  const productId = useParams().id
  console.log("productId", productId)

  const { products, fetchProducts } = useProduct();

  const product = products.filter(product => product.id == productId)[0]
  console.log("product", product)

  useEffect(() => {
    fetchProducts(`products/user/${userId}`)
  }, [])

  return (
    <main className={`px-4 py-12 ${themeMode === "light" ? "bg-blue-0" : "bg-blue-8"}`}>
      <section className={`flex max-md:flex-col gap-8 rounded-2xl p-8 max-w-[1069px] m-auto ${themeMode === "light" ? "bg-white" : "bg-blue-4"}`}>
        <div className="relative flex-1">
          <img
            src={noImage}
            alt={product?.name}
            className="h-80 max-md:h-64 w-full object-cover rounded-xl"
          />
          <button
            onClick={() => setIsFavorited(!isFavorited)}
            className="absolute right-[-1px] bottom-[-1px] bg-white cursor-pointer rounded-tl-2xl w-fit p-2"
          >
            {isFavorited ? (
              <FavoriteIcon className="text-red-600" />
            ) : (
              <FavoriteBorder className="text-gray-500" />
            )}
          </button>
        </div>
        <div className="flex-1 flex flex-col gap-4">
          <div>
            <h2 className="font-bold">{product?.name}</h2>
            <h3 className="font-medium text-gray-600 text-xs">
              {product?.userName}
            </h3>
          </div>
          <Rating
            name="half-rating-read"
            defaultValue={5}
            value={4}
            precision={0.5}
            readOnly
            size="small"
          />
          <span className="text-green-600 font-semibold text-xl">
            R$ {product?.price.toFixed(2).toString().replace(".", ",")}
          </span>
          <p className="text-sm">{product?.description}</p>
          <div className="flex max-md:flex-col gap-2">
            <Link to={`https://wa.me/${product?.whatsapp?.replace(
            /\D/g,
            ""
          )}?text=Olá,%20gostei%20do%20produto:%20${
            product?.name
          }!%20Vamos%20negociar?`}
          target="_blank">
            <Button
              styles="flex-1 bg-blue-3 text-white font-semibold text-sm"
              text="Comprar no What's App"
              icon={whatsAppIcon}
            />
            </Link>
            <Link to="/" className="flex-1">
              <Button
                styles="border justify-center text-blue-3 font-semibold text-sm"
                text="Ver loja"
              />
            </Link>
          </div>
        </div>
      </section>
      <section className="pt-8 max-w-[1069px] m-auto">
        <SecAvaliacoes />
      </section>
      {/* <section className="pt-8 max-w-[1069px] m-auto">
        <h2 className="font-bold text-xl">Produtos relacionados</h2>
        {isLoading ? (
          <p>Carregando</p>
        ) : products ? (
          <ProductList products={relatedProducts} limit={3} />
        ) : (
          <p>{errorMessage}</p>
        )}
      </section> */}
    </main>
  );
};

export default ProductDetail;

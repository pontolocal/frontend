import { Link, useParams } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { FavoriteBorder } from "@mui/icons-material";
import whatsAppIcon from "../assets/images/whatsapp-icon.png";
import ProductList from "../components/ui/ProductList";

import { useProduct } from "../hooks/useProduct";
import { useState } from "react";
import { Button } from "../components/ui/Button";
import { Rating } from "@mui/material";
import { SecAvaliacoes } from "./Dashboard/sections/SecAvaliacoes";

const product = {
  id: 1,
  name: "Mel Artesanal",
  description:
    "é um produto natural, produzido em pequenas quantidades por apicultores locais, com mínimo processamento e sem aditivos.",
  image: "https://i.postimg.cc/HL5zFhNS/mel-1.png",
  price: 25.0,
  storeName: "Apário São José",
  categoryName: "Hortifruti",
  is_active: true,
  rating: 3.5,
};

const relatedProducts = [
  {
    id: 1,
    name: "Mel Artesanal",
    description:
      "é um produto natural, produzido em pequenas quantidades por apicultores locais, com mínimo processamento e sem aditivos.",
    image: "https://i.postimg.cc/HL5zFhNS/mel-1.png",
    price: 25.0,
    storeName: "Apário São José",
    categoryName: "Hortifruti",
    is_active: true,
    rating: 3.5,
  },
  {
    id: 1,
    name: "Mel Artesanal",
    description:
      "é um produto natural, produzido em pequenas quantidades por apicultores locais, com mínimo processamento e sem aditivos.",
    image: "https://i.postimg.cc/HL5zFhNS/mel-1.png",
    price: 25.0,
    storeName: "Apário São José",
    categoryName: "Hortifruti",
    is_active: true,
    rating: 3.5,
  },
  {
    id: 1,
    name: "Mel Artesanal",
    description:
      "é um produto natural, produzido em pequenas quantidades por apicultores locais, com mínimo processamento e sem aditivos.",
    image: "https://i.postimg.cc/HL5zFhNS/mel-1.png",
    price: 25.0,
    storeName: "Apário São José",
    categoryName: "Hortifruti",
    is_active: true,
    rating: 3.5,
  },
];

const ProductDetail = () => {
  const [isFavorited, setIsFavorited] = useState<boolean>();

  const { products, isLoading, errorMessage } = useProduct("/products.json");

  // const id = useParams().id;
  // Fazer o get para detalhar o produto

  return (
    <main className="bg-blue-0 px-4 py-12">
      <section className="flex max-md:flex-col gap-8 bg-white rounded p-8 max-w-[1069px] m-auto">
        <div className="relative flex-1">
          <img
            src={product.image}
            alt={product.name}
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
            <h2 className="font-bold">{product.name}</h2>
            <h3 className="font-medium text-gray-600 text-xs">
              {product.storeName}
            </h3>
          </div>
          <Rating
            name="half-rating-read"
            defaultValue={5}
            value={product.rating}
            precision={0.5}
            readOnly
            size="small"
          />
          <span className="text-green-600 font-semibold text-xl">
            R$ {product.price},00
          </span>
          <p className="text-sm">{product.description}</p>
          <div className="flex max-md:flex-col gap-2">
            <Button
              styles="flex-1 bg-blue-3 text-white font-semibold text-sm"
              text="Comprar no What's App"
              icon={whatsAppIcon}
            />
            <Link to="/" className="flex-1">
              <Button
                styles="bg-white border justify-center text-blue-3 font-semibold text-sm"
                text="Ver loja"
              />
            </Link>
          </div>
        </div>
      </section>
      <section className="pt-8 max-w-[1069px] m-auto">
        <SecAvaliacoes />
      </section>
      <section className="pt-8 max-w-[1069px] m-auto">
        <h2 className="font-bold text-xl">Produtos relacionados</h2>
        {isLoading ? (
          <p>Carregando</p>
        ) : products ? (
          <ProductList products={relatedProducts} limit={3} />
        ) : (
          <p>{errorMessage}</p>
        )}
      </section>
    </main>
  );
};

export default ProductDetail;

import { Button, Pagination } from "@mui/material";
import ProductList from "../components/ui/ProductList";
import { useProduct } from "../hooks/useProduct";
import { useState } from "react";
import noProducts from "../assets/images/no-products.png";
import { useGlobal } from "../hooks/useGlobal";
import { Link } from "react-router-dom";

const Favorites = () => {
  const { themeMode } = useGlobal();
  const [page, setPage] = useState(1);
  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const {
    products,
    isLoading: productsLoading,
    errorMessage: productsErrorMessage,
  } = useProduct("/products.json");

  return (
    <main className={`${themeMode === "light" ? "bg-blue-0" : "bg-blue-8"}`}>
      <section className="py-12">
        <div className="flex justify-between w-full max-w-[1069px] m-auto px-4">
          {products ? (
            <div
              className={`flex justify-between max-md:items-start max-md:flex-col max-md:gap-4 ${
                themeMode === "light" ? "bg-white" : "bg-blue-4"
              } w-full p-4 rounded-xl`}
            >
              <div className="flex flex-col gap-2">
                <h2 className="font-bold text-xl">Meus produtos favoritos</h2>
                <span className="text-gray-500 text-sm">
                  Gerencie seus produtos favoritos
                </span>
              </div>
              <div className="flex flex-col max-md:flex-row max-md:items-center gap-2 items-end">
                <span className="text-grey-2 text-sm">
                  produtos favoritados
                </span>
                <span className="font-semibold">{products?.length}</span>
              </div>
            </div>
          ) : (
            <h2 className="font-bold text-2xl">
              Pesquise por produtos perto de você
            </h2>
          )}
        </div>
        {productsLoading ? (
          <p>Carregando</p>
        ) : products ? (
          <ProductList products={products} limit={9} />
        ) : (
          <p>{productsErrorMessage}</p>
        )}
        {products.length === 0 && (
          <div className="flex flex-col items-center justify-center gap-4 py-10">
            <img src={noProducts} alt="no products" className="w-72" />
            <h2>Não há produtos ainda nos favoritos</h2>
            <p>Que tal adicionar o seu primeiro produto aos favoritos?</p>
            <Link to="/explore">
              <Button variant="contained" color="primary">
                Explorar produtos
              </Button>
            </Link>
          </div>
        )}
        {products.length > 10 && (
          <Pagination
            count={10}
            page={page}
            onChange={handleChange}
            color="primary"
            className="m-auto w-fit pt-8"
          />
        )}
      </section>
    </main>
  );
};

export default Favorites;

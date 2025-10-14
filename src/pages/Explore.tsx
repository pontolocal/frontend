import StoreCard from "../components/ui/StoreCard";
import ProductList from "../components/ui/ProductList";
import { useProduct } from "../hooks/useProduct";
import { useStores } from "../hooks/useStores";
import SearchIcon from "@mui/icons-material/Search";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import Button from "@mui/material/Button";
import FilterComponent from "../components/ui/FilterComponent";
import { Pagination } from "@mui/material";

// import { useCategories } from "../hooks/useCategories";
// import CategoryList from "../components/ui/CategoryList";

const pages = [
  { name: "Todos", path: "/explore" },
  { name: "Produtos", path: "/products" },
  { name: "Lojas", path: "/stores" },
];

const Explore = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  let location: string = useLocation().pathname;

  const [page, setPage] = useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const {
    products,
    isLoading: productsLoading,
    errorMessage: productsErrorMessage,
  } = useProduct("/products.json");

  const {
    stores,
    isLoading: storesLoading,
    errorMessage: storesErrorMessage,
  } = useStores("/stores.json");

  const handleSearch = () => {
    console.log(searchValue);
  };

  return (
    <main className="bg-blue-0">
      <section className="flex flex-col gap-4 items-center justify-center py-12 px-4">
        <h2 className="text-center font-bold text-2xl">
          Encontre produtos e lojas próximos de você
        </h2>
        <div className="flex items-center justify-between gap-4 p-4 bg-white h-12 max-w-96 w-full rounded shadow-sm shadow-gray-400 ">
          <input
            type="text"
            placeholder="Buscar por produtos ou lojas"
            autoFocus
            className=" w-full outline-0"
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
          />
          <button onClick={() => handleSearch()}>
            <SearchIcon className="opacity-40" />
          </button>
        </div>
        <div className="flex gap-2">
          {pages.map((page, index) => (
            <Button
              key={index}
              component={Link}
              to={page.path}
              variant="outlined"
              size="large"
              sx={{
                padding: "2px 10px",
                fontSize: "0.8rem",
                borderRadius: "10px",
                background: `${
                  location === page.path ? "#314679" : "transparent"
                }`,
                color: `${location === page.path ? "#ffffff" : "#314679"}`,
                "&:hover": {
                  backgroundColor: "#314679",
                  color: "#ffffff",
                },
              }}
            >
              {page.name}
            </Button>
          ))}
        </div>
      </section>

      <FilterComponent />

      {location === "/stores" ? (
        <section className="flex flex-col gap-4 justify-center items-center py-12 ">
          <div className="flex justify-between w-full max-w-[1069px] m-auto px-4">
            {stores ? (
              <div>
                <h2 className="font-bold text-2xl">Resultados da busca</h2>
                <span>{stores.length} lojas encontradas</span>
              </div>
            ) : (
              <h2 className="font-bold text-2xl">
                Pesquise por lojas perto de você
              </h2>
            )}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-16 ">
            {storesLoading ? (
              <p>Carregando</p>
            ) : storesErrorMessage ? (
              <p>{storesErrorMessage}</p>
            ) : (
              stores
                ?.slice(0, 12)
                .map((store) => <StoreCard store={store} key={store.id} />)
            )}
          </div>
          <Pagination count={10} page={page} onChange={handleChange} color="primary" className="m-auto w-fit pt-8" />
        </section>
      ) : location === "/products" ? (
        <section className="py-12">
          <div className="flex justify-between w-full max-w-[1069px] m-auto px-4">
            {products ? (
              <div>
                <h2 className="font-bold text-2xl">Resultados da busca</h2>
                <span>{products?.length} produtos encontrados</span>
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
          <Pagination count={10} page={page} onChange={handleChange} color="primary" className="m-auto w-fit pt-8" />
        </section>
      ) : (
        <div>
          <section className="py-12">
            <div className="flex justify-between items-end w-full max-w-[1069px] m-auto px-4">
              {products ? (
                <div>
                  <h2 className="font-bold text-2xl">Resultados da busca</h2>
                  <span>{products?.length} produtos encontrados</span>
                </div>
              ) : (
                <h2 className="font-bold text-2xl">
                  Pesquise por produtos perto de você
                </h2>
              )}
              <Link
                to="/products"
                className="font-bold underline decoration-1 decoration-black text-sm"
              >
                Mais Produtos
              </Link>
            </div>
            {productsLoading ? (
              <p>Carregando</p>
            ) : products ? (
              <ProductList products={products} limit={3} />
            ) : (
              <p>{productsErrorMessage}</p>
            )}
          </section>
          <section className="flex flex-col gap-4 justify-center items-center py-24 bg-blue-1">
            <div className="flex justify-between items-end w-full max-w-[1069px] m-auto px-4">
              {stores ? (
                <div>
                  <h2 className="font-bold text-2xl">Resultados da busca</h2>
                  <span>{stores.length} lojas encontradas</span>
                </div>
              ) : (
                <h2 className="font-bold text-2xl">
                  Pesquise por lojas perto de você
                </h2>
              )}
              <Link
                to="/stores"
                className="font-bold underline decoration-1 decoration-black text-sm"
              >
                Mais lojas
              </Link>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-16 ">
              {storesLoading ? (
                <p>Carregando</p>
              ) : storesErrorMessage ? (
                <p>{storesErrorMessage}</p>
              ) : (
                stores
                  ?.slice(0, 3)
                  .map((store) => <StoreCard store={store} key={store.id} />)
              )}
            </div>
          </section>
        </div>
      )}
    </main>
  );
};

export default Explore;

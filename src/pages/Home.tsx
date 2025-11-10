import Button from "@mui/material/Button";
// import StoreCard from "../components/ui/StoreCard";
import ProductList from "../components/ui/ProductList";
import { useProduct } from "../hooks/useProduct";
// import { useStores } from "../hooks/useStores";
import SearchIcon from "@mui/icons-material/Search";
import { Link, Link as RouterLink } from "react-router-dom";
import { useCategories } from "../hooks/useCategories";
import CategoryList from "../components/ui/CategoryList";
import { useGlobal } from "../hooks/useGlobal";

export const Home = () => {
  const { themeMode, userId } = useGlobal();
  const {
    products,
    isLoading: productsLoading,
    errorMessage: productsErrorMessage,
  } = useProduct(`/products/user/${userId}`);

  // const {
  //   stores,
  //   isLoading: storesLoading,
  //   errorMessage: storesErrorMessage,
  // } = useStores("/");

  const {
    categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useCategories("/categories");

  return (
    <>
      <main>
        <section
          className={`flex flex-col gap-4 py-12 ${
            themeMode === "light"
              ? "bg-gradient-to-b from-[#728CCC] to-[#C2D2FC]"
              : "bg-gradient-to-b from-[#3C5491] to-[#1D2333]"
          }`}
        >
          <h1 className="text-center font-bold text-3xl">
            Conectando você aos
            <strong className={` ${themeMode === "light" ? "text-blue-3" : "text-blue-1"}`}> Comerciantes Locais</strong>
          </h1>
          <div className="text-center text-sm font-medium">
            <p>
              Descubra produtos únicos da sua região e apoie pequenos negócios
              locais.
            </p>
            <p>
              Compre com facilidade e venda seus produtos para a comunidade.
            </p>
          </div>
          <div className="flex flex-col md:flex-row justify-center gap-4 m-auto mt-4 text-sm">
            <Button
              component={RouterLink}
              to="/products"
              variant="contained"
              size="large"
              sx={{
                padding: "12px 32px",
                fontSize: "1.125rem",
                backgroundColor: "#3C5491",
                borderRadius: "10px",
                "&:hover": {
                  backgroundColor: "#314679",
                },
              }}
            >
              Explorar produtos
            </Button>
            <Button
              component={RouterLink}
              to="/register-product"
              variant="contained"
              size="large"
              sx={{
                padding: "12px 32px",
                fontSize: "1.125rem",
                backgroundColor: "#ffffff",
                borderRadius: "10px",
                color: "#3C5491",
                "&:hover": {
                  backgroundColor: "#f2f2f2",
                },
              }}
            >
              Começar a vender
            </Button>
          </div>
        </section>
        <section
          className={`flex justify-center py-12 ${
            themeMode === "light" ? "bg-blue-0" : "bg-blue-4"
          }`}
        >
          <Link to="/explore">
            <button className="flex items-center justify-between gap-4 p-4 bg-white h-12 w-80 rounded shadow-sm shadow-gray-400">
              <span className="text-black opacity-40 text-sm">
                Buscar por produtos ou lojas
              </span>
              <SearchIcon className="text-black opacity-40" />
            </button>
          </Link>
        </section>

        <section
          className={`flex justify-center py-12 bg-blue-1 ${
            themeMode === "light" ? "bg-blue-0" : "bg-blue-3"
          }`}
        >
          <div className="m-auto">
            {categoriesLoading ? (
              <p>Carregando</p>
            ) : categoriesError ? (
              <p>{categoriesError}</p>
            ) : (
              <CategoryList categories={categories} />
            )}
          </div>
        </section>
        <section
          className={`py-12 ${
            themeMode === "light" ? "bg-blue-0" : "bg-blue-4"
          }`}
        >
          <h2 className="text-center font-bold text-2xl">
            Produtos perto de você
          </h2>
          {productsLoading ? (
            <p>Carregando</p>
          ) : products ? (
            <ProductList products={products} limit={6} />
          ) : (
            <p>{productsErrorMessage}</p>
          )}
        </section>
        <section
          className={`flex justify-center py-12 bg-blue-1 ${
            themeMode === "light" ? "bg-blue-0" : "bg-blue-3"
          }`}
        >
          {/* {storesLoading ? (
            <p>Carregando</p>
          ) : storesErrorMessage ? (
            <p>{storesErrorMessage}</p>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-16 max-md:gap-4 ">
              {stores?.slice(0, 3).map((store) => (
                <StoreCard store={store} key={store.id} />
              ))}
            </div>
          )} */}
        </section>
      </main>
    </>
  );
};

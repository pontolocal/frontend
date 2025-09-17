import { Button } from "../components/ui/Button";
import StoreCard from "../components/ui/StoreCard";
import ProductList from "../components/ui/ProductList";
import { useProduct } from "../hooks/useProduct";
import { useStores } from "../hooks/useStores";
import SearchIcon from '@mui/icons-material/Search';
import { Link } from "react-router-dom";

export const Home = () => {
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
  return (
    <>
      <main className="bg-blue-0">
        <section className="flex flex-col gap-4 py-12 bg-blue-1">
          <h1 className="text-center font-bold text-3xl">
            Conectando Você aos
            <strong className="text-blue-3"> Comerciantes Locais</strong>
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
          <div className="flex justify-center gap-4 m-auto w-[600px] text-sm">
            <Button
              styles="bg-blue-3 max-w-52 text-white"
              text="Explorar Produtos"
            />
            <Button
              styles="bg-white max-w-52 text-blue-3 border-1"
              text="Começar a vender"
            />
          </div>
        </section>
        <section className="flex justify-center bg-blue-0 py-12">
          <Link to="/explore"></Link>
          <button className="flex items-center justify-between gap-4 p-4 bg-white h-12 w-96 rounded shadow-sm shadow-gray-400 ">
            <span className="opacity-40 text-sm">Buscar por produtos ou lojas</span>
            <SearchIcon className="opacity-40"/>
          </button>
        </section>
        <section className="flex justify-center py-24 bg-blue-1">
          <div className="grid grid-cols-3 gap-4 w-fit">
            {storesLoading ? (
              <p>Carregando</p>
            ) : storesErrorMessage ? (
              <p>{storesErrorMessage}</p>
            ) : (
              stores?.slice(0, 3).map((store) => <StoreCard store={store} />)
            )}
          </div>
        </section>
        <section className="py-12">
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
        <section className="flex justify-center py-24 bg-blue-1">
          <div className="grid grid-cols-3 gap-4 w-fit">
            {storesLoading ? (
              <p>Carregando</p>
            ) : storesErrorMessage ? (
              <p>{storesErrorMessage}</p>
            ) : (
              stores?.slice(0, 3).map((store) => <StoreCard store={store} />)
            )}
          </div>
        </section>
      </main>
    </>
  );
};

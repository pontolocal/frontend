import ProductList from "../components/ui/ProductList";
import { useProduct } from "../hooks/useProduct";

export const Home = () => {
  const { products, isLoading, errorMessage } = useProduct("/products.json");
  return (
    <>
      <main className="bg-blue-0">
        {isLoading ? (
          <p>Carregando</p>
        ) : products ? (
          <ProductList products={products} limit={6} />
        ) : (
          <p>{errorMessage}</p>
        )}
      </main>
    </>
  );
};

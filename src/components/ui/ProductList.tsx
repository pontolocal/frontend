import ProductCard from "../../components/ui/ProductCard";
import type { ProductType } from "../../models/Products";

interface ProductListProps {
  products: ProductType[];
  limit: number;
}

const ProductList = ({ products, limit }: ProductListProps) => {
  return (
    <div className="grid grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 m-auto max-w-[1100px] gap-8 py-8 w-fit items-center justify-center">
      {products.slice(0, limit).map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
  );
};

export default ProductList;

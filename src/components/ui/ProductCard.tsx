import type { ProductType } from "../../models/Products";
import { Button } from "./Button";
import whatsAppIcon from "../../assets/images/whatsapp-icon.png";
import { Link } from "react-router-dom";

const ProductCard = ({ product }: { product: ProductType }) => {
  return (
    <div className="flex flex-col w-[335px] h-[575px] p-8 shadow-xl rounded-2xl bg-white">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-[180px] object-cover rounded-2xl"
      />
      <div className="flex flex-col gap-2 py-4">
        <div className="flex flex-col">
          <h2 className="font-bold text-xl">{product.name}</h2>
          <h3 className="text-[#585A5C] font-bold">Apiário São José</h3>
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
        <Link to="/">
          <Button
            styles="bg-white border justify-center text-blue-3 font-semibold"
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

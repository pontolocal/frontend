import { Button } from "./Button";
import builderIcon from "../../assets/images/builder-icon.png";
import { Link } from "react-router-dom";
import type StoresType from "../../models/Stores";

interface storesProps {
  store: StoresType
}

const StoreCard = ({store} : storesProps) => {
  return (
    <div className="flex flex-col gap-4 bg-white w-[300px] rounded box-border p-4">
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-1">
          <img src={builderIcon} alt="builder" width={30} />
        </div>
        <div className="">
          <h2 className="text-grey-3 font-semibold text-xl truncate max-w-48">
            {store.name}
          </h2>
          <h3 className="text-sm">{store.category}</h3>
        </div>
      </div>
      <div className="flex flex-col gap-4 items-center">
        <p className="line-clamp-2 w-64">
          {store.description}
        </p>
        <Link to={`/stores/${store.id}`}>
          <Button
            text="Ver loja"
            styles="bg-blue-3 text-white max-w-32 h-8! text-sm"
          />
        </Link>
      </div>
    </div>
  );
};

export default StoreCard;

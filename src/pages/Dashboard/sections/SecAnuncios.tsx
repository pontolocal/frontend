import { useEffect, useState } from "react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { RiDeleteBin6Line } from "react-icons/ri";
import { type Disponibilidade } from "../../../data/dashboardMock.js";
import { BtnPrimary } from "../../../components/ui/Buttons/BtnPrimary.js";
import { BtnGhost } from "../../../components/ui/Buttons/BtnGhost.js";
import { Link } from "react-router-dom";
import { useGlobal } from "../../../hooks/useGlobal.js";
import { useProduct } from "../../../hooks/useProduct.js";
import imageDefault from "../../../assets/images/no-image.png";
import { useDeleteProduct } from "../../../hooks/useDeleteProduct.js";

type Filtro = "todos" | Disponibilidade;

export function SecAnuncios() {
  const { themeMode, userId } = useGlobal();
  const { products, fetchProducts } = useProduct();
  const { fetchDeleteProduct } = useDeleteProduct();
  const [filter, setFilter] = useState<Filtro>("todos");
  const [page, setPage] = useState(1);
  const [updateLProductList, setUpdateProductList] = useState(false);
  // const pageSize = 10;

  const FILTERS: Filtro[] = [
    "todos",
    "disponivel",
    "indisponivel",
    "cancelado",
  ] as Filtro[];
  const LABEL: Record<Filtro, string> = {
    todos: "Todos",
    disponivel: "Disponíveis",
    indisponivel: "Indisponíveis",
    cancelado: "Cancelados",
  };

  const handleDeleteProduct = async (productId: number) => {
    fetchDeleteProduct(`/products/${productId}/user/${userId}`);
    setUpdateProductList(true);
  };

  useEffect(() => {
    fetchProducts(`/products/user/${userId}`);
  }, []);

  useEffect(() => {
    fetchProducts(`/products/user/${userId}`);
    setUpdateProductList(false);
  }, [updateLProductList]);

  return (
    <div className="h-full min-h-[500px]">
      <div
        className={`md:rounded-xl shadow-sm mb-4 md:mb-8 ${
          themeMode === "light" ? "bg-white" : "bg-blue-4"
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex w-full gap-1 px-1 py-5 md:gap-5 md:px-6 md:py-6">
            {FILTERS.map((k) => (
              <button
                key={k}
                onClick={() => {
                  setFilter(k);
                  setPage(1);
                }}
                className={` flex-1 basis-1/4 md:basis-auto md:flex-none
                  px-2 py-2 md:px-6 md:py-2
                  rounded-xl text-xs md:text-sm leading-none
                  font-semibold transition whitespace-nowrap
                  border border-[#D2D2D2]
              ${
                filter === k
                  ? "bg-blue-2 shadow-sm"
                  : "bg-transparent hover:bg-blue-2"
              }`}
              >
                {LABEL[k]}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mb-5 md:mb-7 flex flex-col items-center text-center gap-2 md:flex-row md:items-center md:justify-between md:text-left">
        <h2 className="font-semibold text-xl md:text-2xl">Meus produtos</h2>

        <div className="flex flex-col items-center gap-2">
          <span className="mb-2 text-xs md:text-sm">
            {} anúncios encontrados
          </span>
          <Link to="/register-product">
            <button className={BtnPrimary}>Criar novo produto</button>
          </Link>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className={`md:rounded-xl border border-[#DDDDDD] p-4 sm:px-6 md:px-8 ${
              themeMode === "light" ? "bg-white" : "bg-blue-4 text-white!"
            }`}
          >
            <div className="flex max-md:flex-col justify-between gap-2 sm:gap-6 items-center">
              <div className="flex items-start gap-4 min-w-0">
                <img
                  src={imageDefault}
                  alt="sem imagem"
                  className="w-[153px] h-[114px] rounded-md object-cover block shrink-0"
                />
                <div className="min-w-0">
                  <p className="text-base font-bold truncate w-32">
                    {product.name}
                  </p>
                  <p className="text-sm leading-snug line-clamp-2 break-words">
                    {product.description}
                  </p>
                </div>
              </div>

              {/* <span className="m-auto text-xs px-4 py-1 border">Status</span> */}

              <div className="flex flex-col max-md:flex-row gap-2 items-end justify-center min-w-[220px]">
                <Link to={`/products/${product?.id}`}>
                  <button
                    className={`${BtnGhost} whitespace-nowrap w-auto max-w-none shrink-0 order-1 sm:order-2`}
                  >
                    Ver detalhes
                  </button>
                </Link>

                <div className="flex items-center gap-2 justify-end shrink-0 order-2 sm:order-1">
                  <Link to={`update-product/${product.id}`}>
                    <button
                      className="p-1 rounded-md border border-transparent text-gray-600 hover:text-[#1E40AF] hover:bg-[#EEF3FB] hover:border-[#E2E8F0] transition-colors"
                      title="Editar"
                      aria-label="Editar"
                    >
                      <EditOutlinedIcon fontSize="small" />
                    </button>
                  </Link>
                  <button
                    className="p-2 rounded-md border border-transparent text-gray-600 hover:text-[#1E40AF] hover:bg-[#EEF3FB] hover:border-[#E2E8F0] transition-colors"
                    title="Excluir"
                    aria-label="Excluir"
                    onClick={() => handleDeleteProduct(product.id!)}
                  >
                    <RiDeleteBin6Line />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

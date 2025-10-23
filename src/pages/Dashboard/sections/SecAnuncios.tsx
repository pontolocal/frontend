import { useMemo, useState, useEffect } from "react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { RiDeleteBin6Line } from "react-icons/ri";
import {
  buildAnuncios,
  type Disponibilidade,
} from "../../../data/dashboardMock.js";
import { BtnPrimary } from "../../../components/ui/Buttons/BtnPrimary.js";
import { ChipDisponibilidade } from "../../../components/ui/Chips/ChipDisponibilidade.js";
import { BtnGhost } from "../../../components/ui/Buttons/BtnGhost.js";
import Pagination from "../../../components/ui/Pagination/index.js";
import { Link } from "react-router-dom";

type Filtro = "todos" | Disponibilidade;

function BreakAfter({ text, anchor }: { text: string; anchor: string }) {
  const i = text.toLowerCase().indexOf(anchor.toLowerCase());
  if (i === -1) return <>{text}</>;
  const a = i + anchor.length;
  return (
    <>
      {text.slice(0, a)}
      <br />
      {text.slice(a).trimStart()}
    </>
  );
}

export function SecAnuncios() {
  const [filter, setFilter] = useState<Filtro>("todos");
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const data = useMemo(buildAnuncios, []);
  const filtered =
    filter === "todos"
      ? data
      : data.filter((d) => d.disponibilidade === filter);
  const totalPages = Math.ceil(filtered.length / pageSize);
  const pageData = filtered.slice((page - 1) * pageSize, page * pageSize);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages || 1);
  }, [totalPages, page]);

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

  return (
    <div>
      <div className="bg-white md:rounded-xl shadow-sm mb-4 md:mb-8">
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
                  ? "bg-[#DCE5FE] shadow-sm"
                  : "bg-white hover:bg-[#EEF3FF]"
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
            {filtered.length} anúncios encontrados
          </span>
          <button className={BtnPrimary}>Criar novo produto</button>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {pageData.map((a) => (
          <div
            key={a.id}
            className="bg-white md:rounded-xl border border-[#DDDDDD] p-4 sm:px-6 md:px-8"
          >
            <div className="grid grid-cols-1 sm:grid-cols-[2fr_1fr_2fr] gap-4 sm:gap-6 items-center">
              <div className="flex items-start gap-[38px] min-w-0">
                <img
                  src={a.imageUrl}
                  alt={a.title}
                  className="w-[153px] h-[114px] rounded-md object-cover block shrink-0"
                />
                <div className="min-w-0">
                  <p className="text-base font-bold truncate">{a.title}</p>
                  <p className="text-xs text-[#1F384C] leading-snug line-clamp-2 break-words">
                    <BreakAfter text={a.desc} anchor="crocante" />
                  </p>

                  <div className="sm:hidden mt-8">
                    <ChipDisponibilidade d={a.disponibilidade} />
                  </div>
                </div>
              </div>

              <div className="hidden sm:flex justify-center items-center">
                <ChipDisponibilidade d={a.disponibilidade} />
              </div>

              <div
                className=" grid grid-cols-2 gap-2 sm:flex sm:flex-col sm:items-end sm:justify-center sm:gap-3 sm:min-w-[220px]"
              >    
                <button
                  className={`${BtnGhost} whitespace-nowrap w-auto max-w-none shrink-0 order-1 sm:order-2`}
                >
                  Ver detalhes
                </button>

                <div className="flex items-center gap-2 justify-end shrink-0 order-2 sm:order-1">
                  <Link to={`update-product/${a.id}`}>
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
                  >
                    <RiDeleteBin6Line />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Pagination
        page={page}
        setPage={setPage}
        total={filtered.length}
        pageSize={pageSize}
        totalPages={totalPages}
      />
    </div>
  );
}

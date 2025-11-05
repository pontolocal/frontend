import { useMemo, useState } from "react";
import { buildNegociações, type Status } from "../../../data/dashboardMock.js";
import { ChipStatus } from "../../../components/ui/Chips/ChipStatus.js";
import { BtnPrimary } from "../../../components/ui/Buttons/BtnPrimary.js";
import { BtnGhost } from "../../../components/ui/Buttons/BtnGhost.js";
import Pagination from "../../../components/ui/Pagination/index.js";
import { useGlobal } from "../../../hooks/useGlobal.js";

export function SecNegociacoes() {
  const { themeMode } = useGlobal();
  const [filter, setFilter] = useState<"todos" | Status>("todos");
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const data = useMemo(buildNegociações, []);
  const filtered =
    filter === "todos" ? data : data.filter((d) => d.status === filter);
  const totalPages = Math.ceil(filtered.length / pageSize);
  const pageData = filtered.slice((page - 1) * pageSize, page * pageSize);

  const tabs = ["todos", "confirmado", "pendente", "cancelado"] as const;

  return (
    <div className="text-black">
      <div
        className={`md:rounded-xl shadow-sm mb-4 md:mb-8 ${
          themeMode === "light" ? "bg-white text-black" : "bg-blue-4 text-white"
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex w-full gap-1 px-1 py-5 md:gap-5 md:px-6 md:py-6">
            {tabs.map((k) => (
              <button
                key={k}
                onClick={() => {
                  setFilter(k);
                  setPage(1);
                }}
                aria-pressed={filter === k}
                className={`
                  flex-1 basis-1/4 md:basis-auto md:flex-none
                  px-2 py-2 md:px-6 md:py-2
                  rounded-xl text-xs md:text-sm leading-none
                  font-semibold transition whitespace-nowrap
                  border border-[#D2D2D2] cursor-pointer
                  ${
                    filter === k
                      ? "bg-blue-2 shadow-sm"
                      : "bg-transparent hover:bg-blue-2"
                  }
                `}
              >
                {k === "todos"
                  ? "Todos"
                  : k === "confirmado"
                  ? "Confirmados"
                  : k === "pendente"
                  ? "Pendentes"
                  : "Cancelados"}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div
        className={`mb-3 md:mb-7 flex flex-col items-center text-center gap-2 md:flex-row md:items-center md:justify-between md:text-left ${
          themeMode === "light" ? "text-black" : "text-white"
        }`}
      >
        <h2 className="font-semibold text-xl md:text-2xl">
          Meu histórico de negociações
        </h2>
        <span className="text-xs md:text-sm">
          {filtered.length} pedidos encontrados
        </span>
      </div>

      <div className="flex flex-col gap-4">
        {pageData.map((o) => (
          <div
            key={o.id}
            className={`md:rounded-xl border border-[#DDDDDD] p-4 sm:px-6 md:px-8 ${
              themeMode === "light"
                ? "bg-white text-black"
                : "bg-blue-4 text-white"
            }`}
          >
            <div className="grid grid-cols-1 sm:grid-cols-[2fr_1fr_2fr] sm:gap-6 gap-4 items-center">
              <div className="flex items-start gap-[38px] min-w-0">
                <img
                  src={o.imageUrl}
                  alt={o.product}
                  className="w-[153px] h-[114px] rounded-md object-cover flex-shrink-0"
                />
                <div className="min-w-0">
                  <p className="text-xs font-medium ">{o.date}</p>
                  <p className="text-xs font-medium text-[#696969]">
                    {o.store}
                  </p>
                  <p className="text-sm sm:text-base font-semibold truncate">
                    {o.product}
                  </p>

                  <div className="mt-8 sm:hidden">
                    <ChipStatus status={o.status} />
                  </div>
                </div>
              </div>

              <div className="hidden sm:flex justify-center items-center place-self-center">
                <ChipStatus status={o.status} />
              </div>

              <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-row sm:justify-end">
                <button className={`${BtnPrimary} w-full sm:w-auto`}>
                  {o.status === "confirmado"
                    ? "Comprar novamente"
                    : "Confirmar compra"}
                </button>
                <button className={`${BtnGhost} w-full sm:w-auto text-black`}>
                  Ver loja
                </button>
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

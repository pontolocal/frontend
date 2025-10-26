// src/components/dashboard/Dashboard.tsx
import { useState } from "react";
import { SecVendas } from "./sections/SecVendas.js";
import { SecAnuncios } from "./sections/SecAnuncios.js";
import { SecAvaliacoes } from "./sections/SecAvaliacoes.js";
import { SecNegociacoes } from "./sections/SecNegociacoes.js";

export type Tab = "Negociações" | "vendas" | "anuncios" | "avaliacoes";

export const Dashboard = () => {
  const [tab, setTab] = useState<Tab>("Negociações");

  const tabBtn =
    "flex-1 basis-1/4 md:basis-auto md:flex-none \
px-2 py-2 md:px-6 md:py-2 \
text-[10px] md:text-sm leading-none \
rounded-xl font-semibold \
border border-[#D2D2D2] transition";

  const tabActive = "bg-white border-[#D2D2D2] shadow-sm";

  const tabIdle =
    "text-[#696969] border-[#D2D2D2] bg-[#F0F0F0] hover:bg-gray-100";

  return (
    <div className="p-4 max-w-[1069px] m-auto">
      <div className=" mb-5 md:mb-8 flex flex-col items-center text-center md:block md:text-left">
        <h1 className=" pt-5 md:pt-0 font-bold text-xl md:text-3xl">
          Olá, João
        </h1>
        <p className="text-[#404040] md:text-sm">
          Bem-vindo (a) ao seu dashboard geral
        </p>
      </div>

      <div className="p-2 md:p-0 flex gap-3 md:gap-5 pb-6 md:mb-11">
        {(
          [
            ["Negociações", "Negociações"],
            ["vendas", "Vendas"],
            ["anuncios", "Meus anúncios"],
            ["avaliacoes", "Avaliações de clientes"],
          ] as [Tab, string][]
        ).map(([k, label]) => (
          <button
            key={k}
            onClick={() => setTab(k)}
            className={`${tabBtn} ${tab === k ? tabActive : tabIdle}`}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "Negociações" && <SecNegociacoes />}
      {tab === "vendas" && <SecVendas />}
      {tab === "anuncios" && <SecAnuncios />}
      {tab === "avaliacoes" && <SecAvaliacoes />}
    </div>
  );
};

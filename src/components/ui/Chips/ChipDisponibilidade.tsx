import { FaCheck } from "react-icons/fa";
import { RiCloseCircleLine } from "react-icons/ri";

export type Disponibilidade = "disponivel" | "indisponivel" | "cancelado";

export const ChipDisponibilidade = ({ d }: { d: Disponibilidade }) => {
  if (d === "disponivel")
    return (
      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] md:text-xs font-semibold bg-[#EAF9F0] text-[#27A26B]">
        <FaCheck className="text-[10px]" /> disponível
      </span>
    );

  if (d === "indisponivel")
    return (
      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] md:text-xs font-semibold bg-[#FFF3E1] text-[#B3741E]">
        indisponível
      </span>
    );

  // cancelado
  return (
    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] md:text-xs font-semibold bg-[#FEECEC] text-[#D32F2F]">
      <RiCloseCircleLine className="text-[11px]" /> cancelado
    </span>
  );
};

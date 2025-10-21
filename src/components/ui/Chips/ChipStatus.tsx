import { FaCheck, FaTimes } from "react-icons/fa";

type Status = "confirmado" | "pendente" | "cancelado";

export const ChipStatus = ({ status }: { status: Status }) => {
  if (status === "confirmado") {
    return (
      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-xl text-[10px] md:text-xs font-semibold bg-[#DCFCE7] text-[#166537] border border-[#DDDDDD]">
        <span className="text-xs"><FaCheck /></span>
        Confirmado
      </span>
    );
  }

  if (status === "cancelado") {
    return (
      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-xl text-[10px] md:text-xs font-semibold bg-[#FDE2E2] text-[#7A1D1D] border border-[#DDDDDD]">
        <span className="text-xs"><FaTimes /></span>
        Cancelado
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-xl text-[10px] md:text-xs font-semibold bg-[#F9E7C0] text-[#943412] border border-[#DDDDDD]">
      Pendente
    </span>
  );
};

import { useMemo, useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { avaliacoesMock } from "../../../data/dashboardMock";

type AvaliacaoFilter =
  | "Todos"
  | "5 estrelas"
  | "4 estrelas"
  | "3 estrelas"
  | "2 estrelas"
  | "1 estrela"
  | "Com comentário"
  | "Mais recente";

type Review = {
  initials: string;
  name: string;
  stars: 1 | 2 | 3 | 4 | 5;
  text?: string;
  ago?: string; 
  createdAt?: string | number | Date; 
};

export function SecAvaliacoes() {
  const [filter, setFilter] = useState<AvaliacaoFilter>("Todos");

  const reviews = avaliacoesMock as Review[];
  const total = reviews.length;

  const media = useMemo(
    () => (total ? reviews.reduce((s, r) => s + r.stars, 0) / total : 0),
    [reviews, total]
  );

  const counts = useMemo(() => {
    const c: Record<1 | 2 | 3 | 4 | 5, number> = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    };
    reviews.forEach((r) => (c[r.stars] += 1));
    return c;
  }, [reviews]);

  const pct = (n: number) => (total ? Math.round((n / total) * 100) : 0);

  const withIdx = useMemo(
    () => reviews.map((r, __idx) => ({ ...r, __idx })),
    [reviews]
  );

  const filteredReviews = useMemo(() => {
    let arr = withIdx;

    if (filter === "Com comentário") {
      arr = arr.filter((r) => (r.text ?? "").trim().length > 0);
    } else if (filter === "Mais recente") {
      arr = [...arr].sort((a, b) => {
        const ta = a.createdAt ? new Date(a.createdAt).getTime() : a.__idx;
        const tb = b.createdAt ? new Date(b.createdAt).getTime() : b.__idx;
        return tb - ta;
      });
    } else {
      const m = filter.match(/^(\d)\s+estrela/);
      if (m) {
        const s = Number(m[1]) as 1 | 2 | 3 | 4 | 5;
        arr = arr.filter((r) => r.stars === s);
      }
    }

    return arr;
  }, [filter, withIdx]);

  const Bar = ({ pct }: { pct: number }) => (
    <div className="w-full h-3 bg-[#F2F4F7] rounded-md overflow-hidden">
      <div className="h-3 bg-[#C9D6FF]" style={{ width: `${pct}%` }} />
    </div>
  );

  const filters: AvaliacaoFilter[] = [
    "Todos",
    "5 estrelas",
    "4 estrelas",
    "3 estrelas",
    "2 estrelas",
    "1 estrela",
    "Com comentário",
    "Mais recente",
  ];

  return (
    <div>
      {/* filtros */}
     <div className="bg-white md:rounded-xl p-6 shadow-sm mb-7
                grid grid-cols-3 gap-2 md:gap-3">
  {filters.map((label) => (
    <button
      key={label}
      onClick={() => setFilter(label)}
      aria-pressed={filter === label}
      className={`w-full
                  px-2 py-2 md:px-6 md:py-2
                  rounded-xl text-xs md:text-sm leading-none
                  font-semibold transition whitespace-nowrap
                  border border-[#D2D2D2]
                  ${filter === label ? "bg-[#DCE5FE] shadow-sm" : "bg-white hover:bg-[#EEF3FF]"}`}
    >
      {label}
    </button>
  ))}
</div>


      <div className="bg-white md:rounded-xl py-13 px-10 shadow-sm mb-4">
        <h3
          className="font-bold text-xl sm:text-xl md:text-2xl text-center sm:text-left mb-6 sm:mb-8 md:mb-11"
        >
          Avaliações da loja
        </h3>

        <div className="bg-[#F8FAFF] rounded-md p-6 flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 mb-4">
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <div className="flex items-center gap-2">
              <div className="text-4xl font-bold">{media.toFixed(1)}</div>
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) =>
                  i < Math.round(media) ? (
                    <StarIcon key={i} fontSize="small" htmlColor="#FFB400" />
                  ) : (
                    <StarBorderIcon
                      key={i}
                      fontSize="small"
                      htmlColor="#FFB400"
                    />
                  )
                )}
              </div>
            </div>
            <div className="text-xs text-[#6B7A99] mt-1">
              {total} avaliações
            </div>
          </div>

          <div className="flex-1 w-full sm:w-auto">
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((n) => (
                <button
                  type="button"
                  key={n}
                  onClick={() =>
                    setFilter(`${n} estrelas` as unknown as AvaliacaoFilter)
                  }
                  className="w-full"
                  aria-label={`Filtrar por ${n} estrelas`}
                >
                  <div className="flex items-center gap-2 text-sm">
                    <span className="w-5 text-right">{n}★</span>
                    <Bar pct={pct(counts[n as 1 | 2 | 3 | 4 | 5])} />
                    <span className="w-10 text-right">
                      {pct(counts[n as 1 | 2 | 3 | 4 | 5])}%
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-[#6B7A99]">
            {filter === "Todos" ? "Todas as avaliações" : `Filtro: ${filter}`}
          </span>
          <span className="text-sm text-[#1F384C] font-medium">
            {filteredReviews.length} resultado
            {filteredReviews.length === 1 ? "" : "s"}
          </span>
        </div>

        <div className="space-y-6">
          {filteredReviews.length === 0 && (
            <div className="text-sm text-[#6B7A99]">
              Nenhuma avaliação encontrada.
            </div>
          )}

          {filteredReviews.map((r, idx) => (
            <div key={idx} className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-[#E6EAF2] flex items-center justify-center text-xs font-semibold text-[#1F384C]">
                {r.initials}
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 text-sm">
                  <span className="font-semibold">{r.name}</span>
                  <div className="flex items-center bg-white  px-1 py-0.5">
                    {Array.from({ length: 5 }).map((_, i) =>
                      i < r.stars ? (
                        <StarIcon
                          key={i}
                          fontSize="inherit"
                          htmlColor="#FFB400"
                        />
                      ) : (
                        <StarBorderIcon
                          key={i}
                          fontSize="inherit"
                          htmlColor="#FFB400"
                        />
                      )
                    )}
                  </div>
                  {r.ago && <span className="text-[#6B7A99]">{r.ago}</span>}
                </div>
                {r.text && (
                  <p className="text-sm text-[#1F384C] mt-1">{r.text}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

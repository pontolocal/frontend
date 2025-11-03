type Props = {
  page: number;
  setPage: (v: number) => void;
  total: number;
  pageSize: number;
  totalPages: number;
  className?: string;
  hideIfSinglePage?: boolean;
};

export default function Pagination({
  page,
  setPage,
  total,
  pageSize,
  totalPages,
  className,
  hideIfSinglePage = true,
}: Props) {
  if (hideIfSinglePage && totalPages <= 1) return null;

  const canPrev = page > 1;
  const canNext = page < totalPages;

  const getMobilePages = () => {
    const pages: number[] = [];
    const start = Math.max(1, page - 1);
    const end = Math.min(totalPages, page + 1);
    for (let p = start; p <= end; p++) pages.push(p);
    while (pages.length < 3) {
      if (pages[0] > 1) pages.unshift(pages[0] - 1);
      else if (pages[pages.length - 1] < totalPages)
        pages.push(pages[pages.length - 1] + 1);
      else break;
    }
    return pages;
  };

  const mobilePages = getMobilePages();

  return (
    <nav aria-label="Paginação" className={`mt-6 w-full ${className ?? ""}`}>
      <div className="flex w-full flex-col items-center gap-2 md:flex-row md:items-center md:justify-between">
        <div
          className="text-center md:text-left text-[#6B7A99] text-sm"
          aria-live="polite"
        >
          {Math.min(page * pageSize, total)} de {total}
        </div>

        <div className="w-full md:w-auto">
          <div className="md:hidden w-full flex items-center justify-center gap-1 text-sm">
            <button
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={!canPrev}
              className={`px-2 py-1 rounded-md border border-[#D2D2D2] ${
                !canPrev ? "opacity-50 cursor-not-allowed" : "hover:bg-[#F8FAFF]"
              }`}
              aria-label="Página anterior"
            >
              Anterior
            </button>

            {mobilePages.map((n) => (
              <button
                key={n}
                onClick={() => setPage(n)}
                aria-current={n === page ? "page" : undefined}
                className={`w-8 h-8 rounded-md border border-[#D2D2D2] transition ${
                  n === page ? "bg-white text-black" : "bg-[#E4EBFF] hover:bg-[#F8FAFF]"
                }`}
              >
                {n}
              </button>
            ))}

            <button
              onClick={() => setPage(Math.min(totalPages, page + 1))}
              disabled={!canNext}
              className={`px-2 py-1 rounded-md border border-[#D2D2D2] ${
                !canNext ? "opacity-50 cursor-not-allowed" : "hover:bg-[#F8FAFF]"
              }`}
              aria-label="Próxima página"
            >
              Próximo
            </button>
          </div>

          {/* DESKTOP (sm+): versão completa à direita */}
          <div className="hidden md:flex items-center gap-2 text-sm">
            <button
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={!canPrev}
              className={`px-3 py-2 rounded-md border border-[#D2D2D2] ${
                !canPrev ? "opacity-50 cursor-not-allowed" : "hover:bg-[#F8FAFF]"
              }`}
              aria-label="Página anterior"
            >
              Anterior
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                onClick={() => setPage(n)}
                aria-current={n === page ? "page" : undefined}
                className={`w-9 h-9 rounded-md border border-[#D2D2D2] transition ${
                  n === page ? "bg-white text-black" : "bg-[#E4EBFF] hover:bg-[#F8FAFF]"
                }`}
              >
                {n}
              </button>
            ))}

            <button
              onClick={() => setPage(Math.min(totalPages, page + 1))}
              disabled={!canNext}
              className={`px-3 py-2 rounded-md border border-[#D2D2D2] ${
                !canNext ? "opacity-50 cursor-not-allowed" : "hover:bg-[#F8FAFF]"
              }`}
              aria-label="Próxima página"
            >
              Próximo
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

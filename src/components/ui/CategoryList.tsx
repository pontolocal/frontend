import { useLayoutEffect, useEffect, useRef, useState } from "react";
import CategoryCard from "./CategoryCard";
import type CategoryType from "../../models/Categories";
import { Link } from "react-router-dom";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

interface Props {
  categories: CategoryType[];
}

function chunkArray<T>(arr: T[], size: number) {
  const res: T[][] = [];
  for (let i = 0; i < arr.length; i += size) res.push(arr.slice(i, i + size));
  return res;
}

function padPage<T>(page: (T | null)[], perPage: number) {
  if (page.length >= perPage) return page;
  const padCount = perPage - page.length;
  return [...page, ...Array.from({ length: padCount }).map(() => null)];
}

export default function CategoryList({ categories }: Props) {
  const perPage = 6;
  const pages = chunkArray(categories, perPage);
  const totalPages = pages.length || 1;

  const [currentPage, setCurrentPage] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [containerWidth, setContainerWidth] = useState(400);

  useLayoutEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.clientWidth);
    }
  }, [categories]);

  useEffect(() => {
    const onResize = () => {
      if (containerRef.current)
        setContainerWidth(containerRef.current.clientWidth);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const prevPage = () =>
    setCurrentPage((p) => (p === 0 ? totalPages - 1 : p - 1));
  const nextPage = () =>
    setCurrentPage((p) => (p === totalPages - 1 ? 0 : p + 1));

  if (!categories || categories.length === 0) return null;

  return (
    <section
      className="flex flex-col gap-8 w-full max-w-[1040px] max-lg:max-w-[700px] max-md:max-w-[343px] mx-auto overflow-hidden max-md:my-16"
      ref={containerRef}
    >
      <div className="relative w-full max-lg:max-w-[700px] max-md:max-w-[343px] m-auto">
        <h2 className="text-2xl font-bold pl-2">Categorias</h2>
        <button
          onClick={prevPage}
          aria-label="Previous"
          className="absolute top-0 right-12 cursor-pointer"
        >
          <KeyboardArrowLeftIcon />
        </button>
        <button
          onClick={nextPage}
          aria-label="Next"
          className="absolute top-0 right-0 cursor-pointer"
        >
          <KeyboardArrowRightIcon />
        </button>
      </div>

      <div
        className="flex gap-4 transition-transform duration-1000"
        style={{
          width: `${totalPages * containerWidth}px`,
          transform: `translateX(-${currentPage * containerWidth}px)`,
        }}
      >
        {pages.map((page, pageIndex) => (
          <div
            key={pageIndex}
            className=""
            style={{ width: `${containerWidth}px` }}
          >
            <div className="grid grid-cols-6 max-lg:grid-cols-3 max-md:grid-cols-2 gap-8 max-md:gap-4 w-full m-auto">
              {padPage(page, perPage).map((category, i) => (
                <Link
                  to={`/products/${category?.name}`}
                  key={
                    (category && (category.id ?? category.image_url)) ??
                    `empty-${i}`
                  }
                >
                  {category ? (
                    <CategoryCard
                      name={category.name}
                      image_url={category.image_url}
                    />
                  ) : (
                    <div className="w-full h-32" />
                  )}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

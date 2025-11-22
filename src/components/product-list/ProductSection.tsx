"use client";
import productApiRequest from "@/apiRequests/product";
import { filterBrands } from "@/data/brand";
import { categories } from "@/data/category";
import { cn, getIdFromSlug, getKeyByValueIgnoreCase } from "@/lib/utils";
import { ProductsMetaType, ProductsResType } from "@/types/product";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import CustomPagination from "../common/CustomPagination";
import MobileFilter from "./MobileFilter";
import ProductCard from "./ProductCard";
import { ProductsLoading } from "./ProductsLoading";

type SortOptions = "asc" | "desc";

const ProductSection = ({ category }: { category: string }) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const productsContainerRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState<ProductsResType>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [meta, setMeta] = useState<ProductsMetaType>({
    current_page: 1,
    from: null,
    last_page: 1,
    links: [],
    path: "",
    per_page: 12,
    to: null,
    total: 0,
  });
  const [sortOption, setSortOption] = useState<SortOptions>("asc");

  const handleClearFilters = () => {
    router.push(pathname);
    router.refresh();
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [pathname, searchParams]);

  useEffect(() => {
    setIsLoading(true);
    const paramsObject: Record<string, string[]> = {};

    searchParams.forEach((value, key) => {
      if (!paramsObject[key]) {
        paramsObject[key] = [];
      }
      if (key === "category") {
        const categoryValue = getKeyByValueIgnoreCase(categories, value || "");
        if (categoryValue) {
          paramsObject[key].push(categoryValue);
        }
      } else if (key === "brand") {
        const brandValue = getKeyByValueIgnoreCase(filterBrands, value || "");
        if (brandValue) {
          paramsObject[key].push(brandValue);
        }
      } else paramsObject[key].push(value);
    });

    const params = {
      page: [currentPage.toString()],
      sortByPrice: [sortOption],
      ...paramsObject,
    };

    // Query products
    if (category === "tat-ca-san-pham") {
      productApiRequest
        .allProducts(buildSearchParams(params))
        .then((result) => {
          setData(result.payload.data);
          setMeta(result.payload.meta);
        })
        .finally(() => setIsLoading(false));
    } else if (category === "tim-kiem") {
      productApiRequest
        .searchProducts(buildSearchParams(params))
        .then((result) => {
          setData(result.payload.data);
          setMeta(result.payload.meta);
        })
        .finally(() => setIsLoading(false));
    } else {
      productApiRequest
        .categoryProducts(getIdFromSlug(category), buildSearchParams(params))
        .then((result) => {
          setData(result.payload.data);
          setMeta(result.payload.meta);
        })
        .finally(() => setIsLoading(false));
    }
  }, [pathname, searchParams, sortOption, currentPage]);

  const buildSearchParams = (params: Record<string, string[]>): string => {
    const urlSearchParams = new URLSearchParams();

    Object.entries(params).forEach(([key, values]) => {
      values.forEach((value) => {
        urlSearchParams.append(key, value);
      });
    });

    return urlSearchParams.toString();
  };
  return (
    <div ref={productsContainerRef} className="w-full">
      <div className="w-full bg-white xl:hidden">
        <div className="border-b border-solid border-[#333]/30 px-3 py-4">
          <h3 className="text-center text-[1.125rem] font-bold text-black xs:text-left">
            Danh mục sản phẩm
          </h3>
        </div>
        <div className="flex flex-row items-center justify-between px-3 py-2">
          <div className="flex grow flex-wrap items-center gap-2 text-[0.875rem] font-bold leading-[1.21] ml:gap-4">
            <span className="hidden text-base font-normal xs:block">
              Sắp xếp theo
            </span>
            <button
              onClick={() => {
                if (sortOption !== "asc") setSortOption("asc");
              }}
              className={cn(
                "rounded-full border border-solid bg-white px-3 py-2 transition-all duration-300",
                sortOption === "asc"
                  ? "border-[#1F5ADD] text-[#1F5ADD]"
                  : "border-[#8C8F8D] text-[#8C8F8D]",
              )}
            >
              Giá thấp
            </button>
            <button
              onClick={() => {
                if (sortOption !== "desc") setSortOption("desc");
              }}
              className={cn(
                "mr-auto rounded-full border border-solid bg-white px-3 py-2 transition-all duration-300",
                sortOption === "desc"
                  ? "border-[#1F5ADD] text-[#1F5ADD]"
                  : "border-[#8C8F8D] text-[#8C8F8D]",
              )}
            >
              Giá cao
            </button>
            <button
              onClick={handleClearFilters}
              className={cn(
                "flex flex-row items-center gap-1 rounded-xl border border-solid border-[#8C8F8D] py-1 pl-3 pr-1.5 text-sm font-medium text-[#333]",
                Boolean(searchParams.toString()) ? "" : "hidden",
              )}
            >
              Xóa bộ lọc
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="#000"
                className="size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="ml-2 flex flex-row items-center gap-1 border-l border-solid border-[#333]/30 p-2">
            <MobileFilter category={category} />
          </div>
        </div>
      </div>
      <div className="hidden flex-row items-center justify-between xl:flex">
        <div className="flex flex-row items-center gap-4">
          <h3 className="text-[1.125rem] font-bold text-black">
            Danh mục sản phẩm
          </h3>
          <button
            onClick={handleClearFilters}
            className={cn(
              "flex flex-row items-center gap-1 rounded-xl border border-solid border-[#8C8F8D] py-1 pl-3 pr-1.5 text-sm font-medium text-[#333]",
              Boolean(searchParams.toString()) ? "" : "hidden",
            )}
          >
            Xóa bộ lọc
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="#000"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="flex flex-row items-center gap-4 text-[0.875rem] font-bold leading-[1.21]">
          <span className="text-[1.125rem] font-normal">Sắp xếp theo</span>
          <button
            onClick={() => {
              if (sortOption !== "asc") setSortOption("asc");
            }}
            className={cn(
              "rounded-full border border-solid bg-white px-3 py-2 transition-all duration-300",
              sortOption === "asc"
                ? "border-[#1F5ADD] text-[#1F5ADD]"
                : "border-[#8C8F8D] text-[#8C8F8D]",
            )}
          >
            Giá thấp
          </button>
          <button
            onClick={() => {
              if (sortOption !== "desc") setSortOption("desc");
            }}
            className={cn(
              "rounded-full border border-solid bg-white px-3 py-2 transition-all duration-300",
              sortOption === "desc"
                ? "border-[#1F5ADD] text-[#1F5ADD]"
                : "border-[#8C8F8D] text-[#8C8F8D]",
            )}
          >
            Giá cao
          </button>
        </div>
      </div>
      {/* Products */}
      {isLoading ? (
        <ProductsLoading />
      ) : (
        <div>
          {data && data.length > 0 ? (
            <>
              <div className="mx-auto mt-8 grid w-[95%] grid-cols-2 gap-x-2 gap-y-4 sm:grid-cols-3 sm:gap-y-6 ml:grid-cols-4 ml:gap-y-4 xl:mt-4 xl:w-full">
                {data.map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>
              <div className="mt-6 flex justify-center">
                <CustomPagination
                  count={meta.last_page}
                  currentPage={currentPage}
                  scrollToRef={productsContainerRef}
                  setCurrentPage={setCurrentPage}
                />
              </div>
            </>
          ) : (
            <div className="w-full pt-12 text-center text-lg text-[#333]">
              Không tìm thấy sản phẩm
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductSection;

"use client";
import productApiRequest from "@/apiRequests/product";
import { categories } from "@/data/category";
import { cn, convertSlugUrl } from "@/lib/utils";
import { TopDealsResType } from "@/types/product";
import { useEffect, useState } from "react";
import { CustomCarousel } from "../common/CustomCarousel";
import { CarouselItem } from "../ui/carousel";
import HomeProductCard from "./HomeProductCard";
import { SeeMoreButton } from "./SeeMoreButton";

const ClearanceSaleSection = () => {
  const [activeProduct, setActiveProduct] = useState("clearance-sale");
  const [displayData, setDisplayData] = useState<TopDealsResType>([]);

  useEffect(() => {
    productApiRequest
      .topDeals()
      .then((result) => setDisplayData(result.payload));
  }, []);

  return (
    <div className="w-full rounded-[0.9375rem] bg-white p-4 pb-3">
      <div className="flex flex-col items-start justify-start xs:flex-row xs:items-center xs:justify-between">
        <h3 className="mb-2 text-[1.25rem] font-bold uppercase leading-[1.21] text-[#333]">
          Thanh lý - Xả kho
        </h3>
        <div className="flex flex-row gap-2 text-[0.875rem] leading-[1.21] transition-all duration-300">
          <button
            onClick={() => setActiveProduct("clearance-sale")}
            className={cn(
              "rounded-[0.625rem] px-2 py-1 transition-all duration-200",
              activeProduct === "clearance-sale"
                ? "bg-[#0A68FF] text-white"
                : "border border-solid border-[#8C8F8D] bg-white text-[#333]",
            )}
          >
            Sale xả kho
          </button>
          <button
            onClick={() => setActiveProduct("liquidation")}
            className={cn(
              "rounded-[0.625rem] px-2 py-1 transition-all duration-200",
              activeProduct === "liquidation"
                ? "bg-[#0A68FF] text-white"
                : "border border-solid border-[#8C8F8D] bg-white text-[#333]",
            )}
          >
            Thanh lý hàng lỗi
          </button>
        </div>
      </div>
      <div className="mx-auto mt-2 w-full px-3 sm:w-[80%] ml:w-full ml:px-4">
        <CustomCarousel>
          {displayData.map((product, index) => (
            <CarouselItem
              key={product.id}
              className="flex basis-full justify-center xs:basis-1/2 ml:basis-1/3"
            >
              <HomeProductCard index={index} product={product} />
            </CarouselItem>
          ))}
        </CustomCarousel>
      </div>
      <div className="mt-2 flex justify-center">
        <SeeMoreButton url={`/danh-muc/${convertSlugUrl(categories[10])}-10`} />
      </div>
    </div>
  );
};

export default ClearanceSaleSection;

"use client";
import productApiRequest from "@/apiRequests/product";
import { TopDealsResType } from "@/types/product";
import { useEffect, useState } from "react";
import { CustomCarousel } from "../common/CustomCarousel";
import { CarouselItem } from "../ui/carousel";
import HomeProductCard from "./HomeProductCard";

const TopDealListSection = () => {
  const [data, setData] = useState<TopDealsResType>([]);

  useEffect(() => {
    productApiRequest.topDeals().then((result) => setData(result.payload));
  }, []);

  // if (data.length <= 3)
  //   return (
  //     <>
  //       {data.map((product, index) => (
  //         <HomeProductCard key={index} index={index} product={product} />
  //       ))}
  //     </>
  //   );
  return (
    <CustomCarousel>
      {data.map((product, index) => (
        <CarouselItem
          key={product.id}
          className="flex basis-full justify-center xs:basis-1/2 ml:basis-1/3"
        >
          <HomeProductCard index={index} product={product} />
        </CarouselItem>
      ))}
    </CustomCarousel>
  );
};

export default TopDealListSection;

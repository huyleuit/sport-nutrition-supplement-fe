import { categories } from "@/data/category";
import { convertSlugUrl } from "@/lib/utils";
import Image from "next/image";
import { SeeMoreButton } from "./SeeMoreButton";
import TopDealListSection from "./TopDealListSection";
import saleIcon from "/public/sale-icon.svg";

const TopDealSection = () => {
  return (
    <div className="w-full rounded-[0.9375rem] bg-white p-4">
      <h3 className="mb-2 flex flex-row items-center gap-1 text-[1.25rem] font-bold uppercase leading-[1.21] text-[#C11616]">
        <Image src={saleIcon} alt="top deal" className="size-8" />
        <span>TOP DEAL • SIÊU RẺ</span>
      </h3>
      <div className="mx-auto mt-2 w-full px-3 sm:w-[80%] ml:w-full ml:px-4">
        <TopDealListSection />
      </div>
      <div className="mt-2 flex justify-center">
        <SeeMoreButton url={`/danh-muc/${convertSlugUrl(categories[31])}-31`} />
      </div>
    </div>
  );
};

export default TopDealSection;

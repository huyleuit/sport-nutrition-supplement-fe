// ** Import image
import Image from "next/image";
import dymatize from "/public/home/brand-logo/dymatize.webp";
import evl from "/public/home/brand-logo/evl.webp";
import kfd from "/public/home/brand-logo/kfd.webp";
import muscletech from "/public/home/brand-logo/muscletech.webp";
import nutrex from "/public/home/brand-logo/nutrex.webp";
import on from "/public/home/brand-logo/on.webp";
import onerule from "/public/home/brand-logo/onerule.webp";
import ostrovit from "/public/home/brand-logo/ostrovit.webp";
import zNutrition from "/public/home/brand-logo/z-nutrition.webp";

const brandList = [
  {
    name: "Muscletech",
    img: muscletech,
  },
  {
    name: "Onerule",
    img: onerule,
  },
  {
    name: "Dymatize",
    img: dymatize,
  },
  {
    name: "On",
    img: on,
  },
  {
    name: "Ostrovit",
    img: ostrovit,
  },
  {
    name: "Z Nutrition",
    img: zNutrition,
  },
  {
    name: "KFD Nutrition",
    img: kfd,
  },
  {
    name: "Nutrex Research",
    img: nutrex,
  },
  {
    name: "Evolution Nutrition",
    img: evl,
  },
];

const BrandLogoSection = () => {
  return (
    <div className="w-full space-y-4 p-4">
      <h3 className="mb-2 flex flex-row items-center gap-1 text-[1.25rem] font-bold uppercase leading-[1.21] text-[#333]">
        Thương hiệu sản phẩm
      </h3>
      <div className="flex flex-row flex-wrap gap-6">
        {brandList.map((brand) => (
          <div key={brand.name} className="size-20 bg-white">
            <Image src={brand.img} alt={brand.name} className="size-full" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandLogoSection;

import { cn, convertSlugUrl } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

// ** Import images
import { categories } from "@/data/category";
import accessory from "/public/home/category-bar/accessory.webp";
import bcaa from "/public/home/category-bar/bcaa.webp";
import bounty from "/public/home/category-bar/bounty.webp";
import diet from "/public/home/category-bar/diet.webp";
import element from "/public/home/category-bar/element.webp";
import lipo from "/public/home/category-bar/lipo.webp";
import mass from "/public/home/category-bar/mass.webp";
import preworkout from "/public/home/category-bar/pre-workout.webp";
import vitamin from "/public/home/category-bar/vitamin.webp";
import whey from "/public/home/category-bar/whey.webp";

const categoryList = [
  {
    name: "Tăng cơ",
    img: whey,
    bgColor: "#F99A9AB2",
    url: `/danh-muc/${convertSlugUrl(categories[1])}-1`,
  },
  {
    name: "Tăng cân",
    img: mass,
    bgColor: "#82E885",
    url: `/danh-muc/${convertSlugUrl(categories[2])}-2`,
  },
  {
    name: "BCAA-EAA",
    img: bcaa,
    bgColor: "#9ACBF9B2",
    url: `/danh-muc/${convertSlugUrl(categories[3])}-3`,
  },
  {
    name: "Đốt mỡ",
    img: lipo,
    bgColor: "#F9E99AB2",
    url: `/danh-muc/${convertSlugUrl(categories[4])}-4`,
  },
  {
    name: "Tăng sức mạnh",
    img: preworkout,
    bgColor: "#9F9B9BB2",
    url: `/danh-muc/${convertSlugUrl(categories[5])}-5`,
  },
  {
    name: "Vitamin Khoáng Chất",
    img: vitamin,
    bgColor: "#F99A9AB2",
    url: `/danh-muc/${convertSlugUrl(categories[6])}-6`,
  },
  {
    name: "Đơn Chất",
    img: element,
    bgColor: "#F9C79AB2",
    url: `/danh-muc/${convertSlugUrl(categories[7])}-7`,
  },
  {
    name: "Ăn Kiêng",
    img: diet,
    bgColor: "#9AC5F9B2",
    url: `/danh-muc/${convertSlugUrl(categories[8])}-8`,
  },
  {
    name: "Phụ Kiện",
    img: accessory,
    bgColor: "#E6DCDCB2",
    url: `/danh-muc/${convertSlugUrl(categories[9])}-9`,
  },
  {
    name: "Sắc Đẹp",
    img: bounty,
    bgColor: "#9C9AF9B2",
    url: `/danh-muc/${convertSlugUrl(categories[22])}-22`,
  },
];

const CategoryBar = () => {
  return (
    <ScrollArea className="w-full whitespace-nowrap rounded-[0.9375rem] bg-white py-3">
      <div className="flex h-full w-max flex-row justify-evenly">
        {categoryList.map((category, index) => (
          <div key={index} className="p-1">
            <Link href={category.url}>
              <div
                className={cn(
                  "relative mx-auto flex size-16 items-center justify-center rounded-full md:size-[4.5rem]",
                )}
              >
                <div
                  className="absolute z-0 h-full w-full rounded-full opacity-70 blur-[2px]"
                  style={{ backgroundColor: `${category.bgColor}` }}
                ></div>
                <Image
                  src={category.img}
                  alt={category.name}
                  className="relative h-10 w-auto md:h-[3.25rem]"
                />
              </div>
              <p className="mt-1 w-[6rem] max-w-[6rem] whitespace-normal text-center text-[0.875rem]">
                {category.name}
              </p>
            </Link>
          </div>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default CategoryBar;

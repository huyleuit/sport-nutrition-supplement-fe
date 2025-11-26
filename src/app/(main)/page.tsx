import { cn } from "@/lib/utils";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

// ** Import components
import BrandLogoSection from "@/components/home/BrandLogoSection";
import ClearanceSaleSection from "@/components/home/ClearanceSaleSection";
import TopDealSection from "@/components/home/TopDealSection";
import SideBar from "@/components/nav-bar/SideBar";

// ** Import images
import banner1 from "/public/product-banners/banner-1.webp";
import banner2 from "/public/product-banners/banner-2.webp";
import banner3 from "/public/product-banners/banner-3.webp";
import liciousGainer from "/public/product-banners/licious-gainer-banner.webp";
import megaMass from "/public/product-banners/mega-mass-banner.webp";
import proteinGainer from "/public/product-banners/protein-gainer-banner.webp";

export const metadata: Metadata = {
  title: "4HProtein | Thực phẩm thể hình chính hãng",
  description:
    "4HProtein | Thương hiệu hàng đầu về sản phẩm dinh dưỡng thể thao, giúp bạn nâng cao hiệu suất và chăm sóc sức khỏe toàn diện.",
};

// const couponData = [
//   {
//     title: "MÃ 5% GIẢM TỐI ĐA 50K",
//     shortDescription: [
//       "🔅Áp dụng toàn bộ sản phẩm",
//       "🔅Giảm tối đa 50k",
//       "🔅Áp dụng đơn > 399k",
//     ],
//     conditionUrl: "#",
//     code: "FS50K",
//   },
//   {
//     title: "MÃ 5% GIẢM TỐI ĐA 100K",
//     shortDescription: [
//       "🔅Áp dụng toàn bộ sản phẩm",
//       "🔅Giảm tối đa 100k",
//       "🔅Áp dụng đơn > 999k",
//     ],
//     conditionUrl: "#",
//     code: "FS100K",
//   },
//   {
//     title: "MÃ 5% GIẢM TỐI ĐA 150K",
//     shortDescription: [
//       "🔅Áp dụng toàn bộ sản phẩm",
//       "🔅Giảm tối đa 150k",
//       "🔅Áp dụng đơn > 1999k",
//     ],
//     conditionUrl: "#",
//     code: "FS150K",
//   },
// ];

export default function Home() {
  return (
    <div className="relative w-full">
      <div className="mx-auto flex w-full max-w-[75rem] flex-row justify-around py-8">
        <SideBar />
        <div className="w-[90%] space-y-7 overflow-hidden ml:w-[52.5rem]">
          <div
            className={cn(
              "grid w-full grid-cols-4 grid-rows-4 gap-4 rounded-[0.9375rem] bg-white p-4 sm:grid-cols-6 xl:h-[27.5rem]",
            )}
          >
            <Link href="#" className="col-span-4 row-span-4 rounded-[0.625rem]">
              <Image
                src={banner1}
                alt="banner"
                loading="eager"
                priority={true}
                className="h-full w-full rounded-[0.625rem] object-fill"
              />
            </Link>
            <Link
              href="#"
              className="col-span-2 col-start-5 row-span-2 hidden rounded-[0.625rem] sm:block"
            >
              <Image
                src={banner2}
                alt="banner"
                loading="eager"
                className="h-full w-full rounded-[0.625rem] object-fill"
              />
            </Link>
            <Link
              href="#"
              className="col-span-2 col-start-5 row-span-2 row-start-3 hidden rounded-[0.625rem] sm:block"
            >
              <Image
                src={banner3}
                alt="banner"
                loading="eager"
                className="h-full w-full rounded-[0.625rem] object-fill"
              />
            </Link>
          </div>
          {/* <CategoryBar /> */}
          {/* <div className="flex w-full flex-row items-center gap-4 overflow-x-scroll ml:justify-between ml:gap-0 ml:overflow-hidden xl:h-[7.375rem]">
            {couponData.map((coupon, index) => (
              <CouponCard key={index} {...coupon} />
            ))}
          </div> */}
          <TopDealSection />
          <div className="flex h-[18rem] w-full flex-row items-center gap-4 overflow-x-scroll rounded-[0.9375rem] bg-white px-3 ml:justify-evenly ml:gap-0 ml:overflow-hidden ml:px-0">
            <Link href="#" className="shrink-0">
              <Image
                src={proteinGainer}
                alt="Protein Gainer"
                loading="lazy"
                width={265}
                height={265}
                className="size-[16.5625rem] rounded-[0.625rem] transition-all duration-300 hover:scale-90"
              />
            </Link>
            <Link href="#" className="shrink-0">
              <Image
                src={liciousGainer}
                alt="Licious Gainer"
                loading="lazy"
                width={265}
                height={265}
                className="size-[16.5625rem] rounded-[0.625rem] transition-all duration-300 hover:scale-90"
              />
            </Link>
            <Link href="#" className="shrink-0">
              <Image
                src={megaMass}
                alt="Mega Mass"
                loading="lazy"
                width={265}
                height={265}
                className="size-[16.5625rem] rounded-[0.625rem] transition-all duration-300 hover:scale-90"
              />
            </Link>
          </div>
          <ClearanceSaleSection />
          <BrandLogoSection />
        </div>
      </div>
    </div>
  );
}

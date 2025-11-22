import { categories } from "@/data/category";
import { nunito } from "@/lib/font";
import { cn, convertSlugUrl } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import MobileNavBar from "../nav-bar/MobileNavBar";
import { HeaderCart } from "./HeaderCart";
import { HeaderUser } from "./HeaderUser";
import SearchInput from "./SearchInput";
import { UserAndCart } from "./UserAndCart";
import logo from "/public/logo.png";
import phoneIcon from "/public/phone-icon.svg";
import saleIcon from "/public/sale-icon.svg";
import saleTag from "/public/sale-tag.svg";
import trackingIcon from "/public/tracking-icon.svg";

export const Header = () => {
  return (
    <header
      className="sticky top-0 z-[49] w-full pb-2 xl:pb-0"
      style={{
        background:
          "linear-gradient(180deg, rgba(63,133,233,1) 0%, rgba(48,116,225,1) 50%, rgba(37,105,222,1) 100%)",
      }}
    >
      <div
        className={cn(
          "relative mx-auto flex max-w-[75rem] flex-col items-center justify-center px-8 pb-1 pt-2",
          "xl:h-[6.75rem] xl:flex-row xl:justify-between xl:py-2",
        )}
      >
        <div className="absolute right-9 top-2 hidden flex-row items-center gap-1 xl:flex">
          <Image src={phoneIcon} alt="phone" className="size-4" />
          <p className="text-center text-[0.75rem] font-semibold text-white">
            Tel: 033 330 3802
          </p>
        </div>
        <MobileNavBar />
        <Link
          href="/"
          className={cn(
            "mx-auto flex flex-row items-center xl:mx-0",
            "-translate-x-4 xs:-translate-x-6 xl:-translate-x-0",
          )}
          title="4HProtein"
        >
          <Image
            src={logo}
            alt="logo"
            className="size-12 xs:size-16 xl:size-20"
          />
          <p
            className={cn(
              nunito.className,
              "max-w-[10rem] text-center text-[0.5rem] font-extrabold uppercase text-white xs:max-w-[15rem] xs:text-[0.75rem]",
            )}
          >
            Thực phẩm dinh dưỡng thể thao sport nutrition supplements
          </p>
        </Link>
        <div className={cn("relative hidden w-fit xl:block", nunito.className)}>
          <SearchInput />
          <div
            className={cn(
              "absolute -bottom-7 left-4 flex flex-row items-center gap-6 text-[0.75rem] font-bold italic text-white",
            )}
          >
            <Link
              href={`/danh-muc/${convertSlugUrl(categories[32])}-32`}
              className="flex flex-row items-center gap-1"
            >
              <Image src={saleIcon} alt="" className="size-6" />
              <span>Hot Deals</span>
            </Link>
            <Link
              href="/nguoi-dung/lich-su-don-hang"
              className="flex flex-row items-center"
            >
              <Image src={trackingIcon} alt="" className="size-5" />
              <span>Tra cứu đơn hàng</span>
            </Link>
            <Link
              href={`/danh-muc/${convertSlugUrl(categories[10])}-10`}
              className="flex flex-row items-center"
            >
              <Image src={saleTag} alt="" className="size-6" />
              <span>Xả kho hàng</span>
            </Link>
          </div>
        </div>
        <HeaderUser />
        <HeaderCart />
        <UserAndCart />
      </div>
      <div className="w-full xl:hidden">
        <SearchInput />
      </div>
    </header>
  );
};

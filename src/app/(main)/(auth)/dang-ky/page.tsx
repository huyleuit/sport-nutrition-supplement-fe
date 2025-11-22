import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import RegisterForm from "./register-form";
import googleLogo from "/public/google-icon.svg";

export const metadata: Metadata = {
  title: "Đăng ký",
  description:
    "Đăng ký để khám phá và mua sắm các sản phẩm dinh dưỡng thể thao chất lượng cao đến từ 4HProtein.",
};

export default function page() {
  return (
    <div className="w-full bg-white py-[3.5rem]">
      <div className="mx-auto flex w-[25rem] flex-col">
        <h1 className="text-center text-[1.5625rem] font-semibold uppercase">
          Đăng ký tài khoản
        </h1>
        <RegisterForm />
        <div className="mx-auto mt-3 space-x-1">
          <span>Bạn đã có tài khoản?</span>
          <Link
            href={"/dang-nhap"}
            className="text-center font-bold"
            prefetch={true}
          >
            Đăng nhập
          </Link>
        </div>
        <div className="mt-8">
          <div className="flex flex-row items-center justify-center gap-2">
            <div className="h-px w-[5rem] bg-app-carbon"></div>
            <div className="text-[0.875rem]">Hoặc đăng ký với</div>
            <div className="h-px w-[5rem] bg-app-carbon"></div>
          </div>
          <div className="mt-4 flex justify-center">
            <button className="flex h-10 flex-row items-center gap-[0.625rem] rounded-[6.25rem] border border-solid border-[#747775] px-3 py-[0.625rem] shadow-lg hover:border-[#5478B1] active:border-none active:bg-[#EEEEEE]">
              <Image src={googleLogo} alt="" className="size-[1.125rem]" />
              <span className="text-[0.875rem] font-medium leading-normal text-[#1F1F1F]">
                Đăng ký với Google
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import LoginForm from "./login-form";
import googleLogo from "/public/google-icon.svg";

export const metadata: Metadata = {
  title: "Đăng nhập",
  description:
    "Đăng nhập vào 4H Protein để khám phá và mua sắm các sản phẩm dinh dưỡng thể thao chất lượng cao.",
};

export default function page() {
  return (
    <Fragment>
      <h1 className="text-center text-[1.5625rem] font-semibold uppercase">
        Đăng nhập tài khoản
      </h1>
      <LoginForm />
      <div className="mx-auto mt-3 space-x-1">
        <span>Bạn chưa có tài khoản?</span>
        <Link
          href={"/dang-ky"}
          prefetch={true}
          className="text-center font-bold"
        >
          Đăng ký
        </Link>
      </div>
      <div className="mt-6">
        <div className="flex flex-row items-center justify-center gap-2">
          <div className="h-px w-[5rem] bg-app-carbon"></div>
          <div className="text-[0.875rem]">Hoặc đăng nhập với</div>
          <div className="h-px w-[5rem] bg-app-carbon"></div>
        </div>
        <div className="mt-4 flex justify-center">
          <button className="flex h-10 flex-row items-center gap-[0.625rem] rounded-[6.25rem] border border-solid border-[#747775] px-3 py-[0.625rem] shadow-lg transition-all duration-300 hover:border-[#5478B1] active:border-none active:bg-[#EEEEEE]">
            <Image src={googleLogo} alt="" className="size-[1.125rem]" />
            <span className="text-[0.875rem] font-medium leading-normal text-[#1F1F1F]">
              Đăng nhập với Google
            </span>
          </button>
        </div>
      </div>
    </Fragment>
  );
}

import { Metadata } from "next";
import { Fragment } from "react";
import ChangePasswordForm from "./change-password-form";

export const metadata: Metadata = {
  title: "Đổi mật khẩu",
};

const page = () => {
  return (
    <Fragment>
      <h1 className="mb-6 text-center text-[1.5625rem] font-semibold uppercase">
        Đổi mật khẩu
      </h1>
      <ChangePasswordForm />
    </Fragment>
  );
};

export default page;

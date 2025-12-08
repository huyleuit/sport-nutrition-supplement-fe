"use client";

import authApiRequest from "@/apiRequests/auth";
import userApiRequest from "@/apiRequests/user";
import { useAppContext } from "@/app/app-provider";
import CustomLoadingAnimation from "@/components/common/CustomLoadingAnimation";
import { DynamicForm, FormFieldConfig } from "@/components/form";
import { useToast } from "@/hooks/use-toast";
import { handleErrorApi } from "@/lib/utils";
import { LoginBody, LoginBodyType } from "@/schemaValidations/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Fragment, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setUser } = useAppContext();
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<LoginBodyType>({
    resolver: zodResolver(LoginBody),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const formFields: FormFieldConfig<LoginBodyType>[] = useMemo(
    () => [
      {
        name: "email",
        label: "Email",
        placeholder: "Email",
        type: "email",
      },
      {
        name: "password",
        label: "Mật khẩu",
        placeholder: "Mật khẩu",
        type: "password",
      },
    ],
    [],
  );

  async function onSubmit(values: LoginBodyType) {
    if (loading) return;
    setLoading(true);
    setError(null);
    try {
      console.log("[Login] Step 1: Calling login API...");
      const result = await authApiRequest.login(values);
      console.log("[Login] Step 1 SUCCESS - Login response:", result);

      const token = result.payload.token;
      console.log(
        "[Login] Token received:",
        token ? `${token.substring(0, 20)}...` : "NO TOKEN",
      );

      console.log("[Login] Step 2: Setting token...");
      await authApiRequest.setToken(token);
      console.log("[Login] Step 2 SUCCESS - Token set");

      console.log("[Login] Step 3: Fetching user profile...");
      const profileResult = await userApiRequest.profile();
      console.log("[Login] Step 3 SUCCESS - Profile:", profileResult);

      setUser(profileResult.payload);
      console.log("[Login] User set in context");

      toast({
        variant: "success",
        title: "Đăng nhập thành công!",
      });

      router.push("/");
      router.refresh();
    } catch (error: any) {
      console.error("[Login] ERROR caught:", error);
      console.error("[Login] Error details:", {
        message: error?.message,
        status: error?.status,
        payload: error?.payload,
        name: error?.name,
        stack: error?.stack,
      });

      let errorMessage = "Đã có lỗi xảy ra. Vui lòng thử lại.";

      if (error?.status === 401 || error?.payload?.status === 401) {
        errorMessage = "Tài khoản hoặc mật khẩu không chính xác";
      } else if (error?.status === 422 || error?.payload?.status === 422) {
        handleErrorApi({
          error,
          setError: form.setError,
        });
        errorMessage = "Vui lòng kiểm tra lại thông tin đăng nhập";
      } else if (!navigator.onLine) {
        errorMessage = "Không có kết nối mạng. Vui lòng kiểm tra lại.";
      } else if (error?.message?.includes("fetch")) {
        errorMessage = "Không thể kết nối đến máy chủ. Vui lòng thử lại sau.";
      }

      console.error("[Login] Final error message:", errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }
  return (
    <Fragment>
      <CustomLoadingAnimation isLoading={loading} />
      {error && (
        <p className="mt-1 text-center text-[0.75rem] font-medium text-red-600 md:text-sm">
          {error}
        </p>
      )}
      <DynamicForm
        form={form}
        fields={formFields}
        onSubmit={onSubmit}
        submitButtonText="Đăng nhập"
        loading={loading}
        renderExtraContent={() => (
          <div className="!mt-2">
            <Link href={"#"} className="float-right hover:underline">
              Quên mật khẩu?
            </Link>
          </div>
        )}
      />
    </Fragment>
  );
};

export default LoginForm;

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
      const result = await authApiRequest.login(values);
      const token = result.payload.token;

      await authApiRequest.setToken(token);

      const profileResult = await userApiRequest.profile();
      setUser(profileResult.payload);

      toast({
        variant: "success",
        title: "Đăng nhập thành công!",
      });

      router.push("/");
      router.refresh();
    } catch (error: any) {
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

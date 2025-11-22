"use client";

import authApiRequest from "@/apiRequests/auth";
import CustomLoadingAnimation from "@/components/common/CustomLoadingAnimation";
import { DynamicForm, FormFieldConfig } from "@/components/form";
import { useToast } from "@/hooks/use-toast";
import { handleErrorApi } from "@/lib/utils";
import {
  RegisterBody,
  RegisterBodyType,
} from "@/schemaValidations/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Fragment, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

const RegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<RegisterBodyType>({
    resolver: zodResolver(RegisterBody),
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const formFields: FormFieldConfig<RegisterBodyType>[] = useMemo(
    () => [
      {
        name: "fullName",
        label: "Họ và tên",
        placeholder: "Họ và tên",
        type: "text",
      },
      {
        name: "phoneNumber",
        label: "Số điện thoại",
        placeholder: "Số điện thoại",
        type: "tel",
      },
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
      {
        name: "confirmPassword",
        label: "Nhập lại mật khẩu",
        placeholder: "Nhập lại mật khẩu",
        type: "password",
      },
    ],
    [],
  );

  async function onSubmit(values: RegisterBodyType) {
    if (loading) return;
    setLoading(true);
    try {
      await authApiRequest.register(values);
      toast({
        variant: "success",
        title: "Đăng ký thành công! Vui lòng đăng nhập.",
      });
      router.push("/dang-nhap");
    } catch (error: any) {
      handleErrorApi({
        error,
        setError: form.setError,
      });
    } finally {
      setLoading(false);
    }
  }
  return (
    <Fragment>
      <CustomLoadingAnimation isLoading={loading} />
      <DynamicForm
        form={form}
        fields={formFields}
        onSubmit={onSubmit}
        submitButtonText="Đăng ký"
        loading={loading}
      />
    </Fragment>
  );
};

export default RegisterForm;

"use client";
import authApiRequest from "@/apiRequests/auth";
import CustomLoadingAnimation from "@/components/common/CustomLoadingAnimation";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { cn, handleErrorApi } from "@/lib/utils";
import {
  ChangePasswordBody,
  ChangePasswordBodyType,
} from "@/schemaValidations/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Fragment, useState } from "react";
import { useForm } from "react-hook-form";

const ChangePasswordForm = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<ChangePasswordBodyType>({
    resolver: zodResolver(ChangePasswordBody),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: ChangePasswordBodyType) {
    if (loading) return;
    setLoading(true);
    try {
      await authApiRequest.changePassword(values);
      toast({
        variant: "success",
        title: "Đổi mật khẩu thành công",
      });
      router.push("/nguoi-dung/thong-tin-ca-nhan");
      router.refresh();
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
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-[600px] flex-shrink-0 space-y-2"
          noValidate
        >
          <FormField
            control={form.control}
            name="currentPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mật khẩu hiện tại</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Mật khẩu hiện tại"
                    type="password"
                    className={cn(
                      "!h-auto !rounded-none border border-solid border-app-carbon px-3 py-2 pr-[2.625rem] text-base font-normal focus:outline-none",
                    )}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mật khẩu mới</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Mật khẩu mới"
                    type="password"
                    className={cn(
                      "!h-auto !rounded-none border border-solid border-app-carbon px-3 py-2 pr-[2.625rem] text-base font-normal focus:outline-none",
                    )}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nhập lại mật khẩu mới</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Nhập lại mật khẩu mới"
                    type="password"
                    className={cn(
                      "!h-auto !rounded-none border border-solid border-app-carbon px-3 py-2 pr-[2.625rem] text-base font-normal focus:outline-none",
                    )}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="!mt-4 h-auto w-full rounded-none border-[2px] border-solid border-[#1250DC] bg-[#1250DC] py-3 text-base font-bold text-white transition-all duration-200 hover:bg-[#1250DC]/[0.9]"
          >
            Đổi mật khẩu
          </Button>
        </form>
      </Form>
    </Fragment>
  );
};

export default ChangePasswordForm;

"use client";
import { cn, handleErrorApi } from "@/lib/utils";
import {
  AddressBody,
  AddressBodyType,
  AddressResType,
} from "@/schemaValidations/address.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogClose } from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";
import { z } from "zod";

// ** Import UI
import addressApiRequest from "@/apiRequests/address";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { useState } from "react";

type TProps = {
  address: AddressResType;
};

const EditAddressModal = ({ address }: TProps) => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<z.infer<typeof AddressBody>>({
    resolver: zodResolver(AddressBody),
    defaultValues: {
      // addressDetail: address.addressDetail,
      location: address.location,
    },
  });

  async function onSubmit(values: AddressBodyType) {
    try {
      // await addressApiRequest.updateAddress(address.addressId, values);
      await addressApiRequest.updateAddress(address.id, values);
      toast({
        variant: "success",
        title: "Cập nhật địa chỉ thành công",
      });
    } catch (error) {
      handleErrorApi({
        error,
        setError: form.setError,
      });
    } finally {
      setIsOpen(false);
      setTimeout(() => {
        location.reload();
      }, 1000);
    }
  }
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="font-normal leading-[1.21] text-[#1250DC]">
        Sửa
      </DialogTrigger>
      <DialogContent
        className={cn(
          "p-6 md:p-4 lg:p-5 xl:p-6",
          "max-w-lg md:max-w-sm lg:max-w-md xl:max-w-lg",
          "gap-4 md:gap-2 lg:gap-3 xl:gap-4",
        )}
      >
        <DialogHeader>
          <DialogTitle className="text-[1.125rem] leading-none md:text-[0.703125rem] lg:text-[0.9140625rem] xl:text-[1.125rem]">
            Sửa địa chỉ
          </DialogTitle>
          <DialogDescription className="text-[0.875rem] md:text-[0.625rem] lg:text-[0.725rem] xl:text-[0.875rem]">
            Thay đổi địa chỉ cho đơn hàng của bạn.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-[0.5em]"
          >
            <FormField
              control={form.control}
              // name="addressDetail"
              name="location"
              render={({ field }) => (
                <FormItem className="space-y-2 md:space-y-0.5 lg:space-y-1 xl:space-y-2">
                  <FormLabel className="text-[0.875rem] md:text-[0.625rem] lg:text-[0.725rem] xl:text-[0.875rem]">
                    Địa chỉ
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="35/22 Đ. Số 9, Hiệp Bình Phước, Thủ Đức, TP.HCM"
                      className="!h-auto border border-solid border-app-carbon px-3 py-2 text-[0.875rem] md:text-[0.625rem] lg:text-[0.725rem] xl:text-[0.875rem]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div
              className={cn(
                "flex flex-row items-center justify-end",
                "gap-4 md:gap-2 lg:gap-3 xl:gap-4",
              )}
            >
              <DialogFooter className="sm:justify-start">
                <DialogClose className="flex flex-row gap-2">
                  <Button
                    type="button"
                    variant="secondary"
                    className={cn(
                      "text-[0.875rem] md:text-[0.625rem] lg:text-[0.725rem] xl:text-[0.875rem]",
                      "leading-[1.25rem] md:leading-[0.78125rem] lg:leading-[1.015625rem] xl:leading-[1.25rem]",
                      "px-4 py-2 md:px-3 md:py-0.5 lg:py-1.5 xl:px-4 xl:py-2.5",
                    )}
                  >
                    Hủy
                  </Button>
                  <Button
                    type="submit"
                    className={cn(
                      "bg-[#1250DC] hover:bg-[#1250DC]/[0.9]",
                      "text-[0.875rem] md:text-[0.625rem] lg:text-[0.725rem] xl:text-[0.875rem]",
                      "leading-[1.25rem] md:leading-[0.78125rem] lg:leading-[1.015625rem] xl:leading-[1.25rem]",
                      "px-4 py-2 md:px-3 md:py-0.5 lg:py-1.5 xl:px-4 xl:py-2.5",
                    )}
                  >
                    Xác nhận
                  </Button>
                </DialogClose>
              </DialogFooter>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditAddressModal;

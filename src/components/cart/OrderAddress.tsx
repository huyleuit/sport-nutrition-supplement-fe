"use client";
import addressApiRequest from "@/apiRequests/address";
import { useAppContext } from "@/app/app-provider";
import { cn } from "@/lib/utils";
import { AddressListResType } from "@/schemaValidations/address.schema";
import { TextField } from "@mui/material";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { OrderAddressCard } from "./OrderAddressCard";
import addressIcon from "/public/address-icon.svg";
import profile from "/public/profile.svg";

type TProps = {
  addressId: string;
  setAddressId: Dispatch<SetStateAction<string>>;
  addressDetail: string;
  setAddressDetail: Dispatch<SetStateAction<string>>;
  note: string;
  setNote: Dispatch<SetStateAction<string>>;
};

export const OrderAddress = ({
  addressId,
  setAddressId,
  addressDetail,
  setAddressDetail,
  note,
  setNote,
}: TProps) => {
  const { user } = useAppContext();
  const [data, setData] = useState<AddressListResType>([]);

  useEffect(() => {
    addressApiRequest.getAddress().then((res) => {
      setData(res.payload);
    });
    // .finally(() => {
    //   setIsLoading(false);
    // });
  }, []);

  if (!data[0]) {
    return (
      <div>
        <h2 className="ml-2 text-base font-bold">Địa chỉ</h2>
        <div className="mt-1 w-full bg-white p-4 lg:rounded-[0.75rem]">
          <h3 className="flex select-none flex-row items-center gap-2">
            <Image src={profile} alt="profile" />
            Thông tin người đặt
          </h3>
          <div className="mt-4 flex flex-row items-center justify-between gap-5">
            <TextField
              disabled
              label="Họ và tên"
              value={user?.name}
              variant="outlined"
              className={cn(
                "grow rounded-lg border border-solid border-[#8C8F8D] px-4 py-2 text-sm",
              )}
            />
            <TextField
              disabled
              label="Số điện thoại"
              value={user?.phone}
              variant="outlined"
              className={cn(
                "grow rounded-lg border border-solid border-[#8C8F8D] px-4 py-1 text-sm",
              )}
            />
          </div>
          <h3 className="my-4 flex select-none flex-row items-center gap-2">
            <Image src={addressIcon} alt="address icon" className="size-6" />
            Địa chỉ nhận hàng
          </h3>
          <div className="space-y-3">
            <TextField
              className={cn(
                "w-full rounded-lg border border-solid border-[#8C8F8D] px-4 py-1 text-sm",
              )}
              label="Địa chỉ"
              onChange={(e) => setAddressDetail(e.target.value)}
              placeholder="Số nhà + Tên đường, Phường / Xã, Tỉnh / Thành phố"
              value={addressDetail}
              variant="outlined"
            />
            <TextField
              className={cn(
                "w-full rounded-lg border border-solid border-[#8C8F8D] px-4 py-1 text-sm",
              )}
              label="Ghi chú"
              multiline
              onChange={(e) => setNote(e.target.value)}
              placeholder="Ghi chú"
              rows={4}
              value={note}
              variant="outlined"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="ml-2 text-base font-bold">Địa chỉ</h2>
      <div className="mt-1 w-full bg-white p-4 lg:rounded-[0.75rem]">
        <div className="my-4 flex flex-col gap-2">
          {data.map((item) => (
            <button key={item.id} onClick={() => setAddressId(item.id)}>
              <OrderAddressCard address={item} currentAddressId={addressId} />
            </button>
          ))}
        </div>
        <TextField
          className={cn(
            "w-full rounded-lg border border-solid border-[#8C8F8D] px-4 py-1 text-sm",
          )}
          label="Ghi chú"
          multiline
          onChange={(e) => setNote(e.target.value)}
          placeholder="Ghi chú"
          rows={4}
          value={note}
          variant="outlined"
        />
      </div>
    </div>
  );
};

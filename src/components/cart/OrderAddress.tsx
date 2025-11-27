"use client";
import addressApiRequest from "@/apiRequests/address";
// import { useAppContext } from "@/app/app-provider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AddressListResType } from "@/schemaValidations/address.schema";
import { TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { OrderAddressCard } from "./OrderAddressCard";

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
  addressDetail: _addressDetail,
  setAddressDetail: _setAddressDetail,
  note,
  setNote,
}: TProps) => {
  // const { user } = useAppContext();
  const router = useRouter();
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
          <div className="space-y-3">
            <Button
              onClick={() => router.push("/nguoi-dung/so-dia-chi")}
              className={cn(
                "w-full rounded-lg border border-solid border-[#8C8F8D] bg-white px-4 py-3 text-sm font-normal text-gray-700 hover:bg-gray-50",
              )}
              variant="outline"
            >
              Thêm địa chỉ nhận hàng
            </Button>
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

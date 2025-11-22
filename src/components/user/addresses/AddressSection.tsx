"use client";
import addressApiRequest from "@/apiRequests/address";
import { Skeleton } from "@/components/ui/skeleton";
import { AddressListResType } from "@/schemaValidations/address.schema";
import Image from "next/image";
import { useEffect, useState } from "react";
import AddAddressModal from "./AddAddressModal";
import AddressCard from "./AddressCard";
import noAddress from "/public/no-address.webp";

const AddressSection = () => {
  const [data, setData] = useState<AddressListResType>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    addressApiRequest
      .getAddress()
      .then((res) => {
        setData(res.payload);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="mt-[0.75em] min-h-[30em] w-full rounded-[0.625em] bg-white pb-4">
        <div className="flex w-full flex-row items-center gap-[0.5em] px-[1em] py-[0.75em]">
          <div className="grow space-y-2">
            <Skeleton className="h-[1.45em] w-[15em]" />
            <Skeleton className="h-[1.45em] w-[30em]" />
          </div>
          <Skeleton className="h-[1.5em] w-[4.125em]" />
        </div>
      </div>
    );
  }

  if (!data[0]) {
    return (
      <div className="mt-[0.75em] flex h-[25em] w-full flex-col items-center justify-center gap-[0.5em] rounded-[0.625em] bg-white md:h-[30em]">
        <Image
          src={noAddress}
          alt="no address"
          className="size-[7.5em] opacity-70"
        />
        <p className="text-center text-[1.25em] font-bold text-[#4a4f63]">
          Bạn chưa thêm địa chỉ nào
        </p>

        <AddAddressModal />
      </div>
    );
  }
  return (
    <div className="mt-[0.75em] min-h-[30em] w-full rounded-[0.625em] bg-white pb-4">
      <div className="divide-y">
        {data.map((address) => (
          // <AddressCard key={address.addressId} address={address} />
          <AddressCard key={address.id} address={address} />
        ))}
      </div>
      <div className="flex w-full justify-center">
        <AddAddressModal />
      </div>
    </div>
  );
};

export default AddressSection;

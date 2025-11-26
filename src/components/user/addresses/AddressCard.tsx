"use client";
import addressApiRequest from "@/apiRequests/address";
import { useAppContext } from "@/app/app-provider";
import EditAddressModal from "@/components/user/addresses/EditAddressModal";
import { useToast } from "@/hooks/use-toast";
import { formatPhoneNumber } from "@/lib/utils";
import { AddressResType } from "@/schemaValidations/address.schema";

type TProps = {
  address: AddressResType;
};

const AddressCard = ({ address }: TProps) => {
  const { user } = useAppContext();
  const { toast } = useToast();

  const handleDelete = async () => {
    try {
      // await addressApiRequest.deleteAddress(address.addressId);
      await addressApiRequest.deleteAddress(address.id);
      toast({
        variant: "success",
        title: "Xóa địa chỉ thành công",
      });
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => {
        location.reload();
      }, 1000);
    }
  };
  return (
    <div className="flex w-full flex-row gap-[0.5em] px-[1em] py-[0.75em]">
      <div className="grow">
        <div className="flex w-full flex-col gap-x-[1em] text-[1em] font-medium text-[#333] md:flex-row">
          <div className="line-clamp-1 max-w-[20em]">
            {user ? user.fullName : ""}
          </div>
          <div className="hidden h-[1.5em] w-px bg-[#333] md:block"></div>
          <div className="line-clamp-1 max-w-[20em]">
            {user ? formatPhoneNumber(user.phoneNumber) : ""}
          </div>
        </div>
        <div className="line-clamp-3 font-normal text-[#8C8F8D]">
          {/* {address.addressDetail} */}
          {address.location}
        </div>
      </div>
      <div className="flex flex-row items-center gap-[0.5em] text-[0.875em] leading-[1.21]">
        <EditAddressModal address={address} />
        <div className="h-[1.5em] w-px bg-black"></div>
        <button onClick={handleDelete} className="text-[#C11616]">
          Xóa
        </button>
      </div>
    </div>
  );
};

export default AddressCard;

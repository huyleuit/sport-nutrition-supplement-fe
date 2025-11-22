import { z } from "zod";

export const AddressBody = z.object({
  // addressDetail: z.string().min(1, { message: "Địa chỉ không được để trống" }),
  location: z.string().min(1, { message: "Địa chỉ không được để trống" }),
});

export type AddressBodyType = z.TypeOf<typeof AddressBody>;

export const AddressRes = z.object({
  // addressId: z.number(),
  id: z.string(),
  userId: z.string(),
  location: z.string(),
  // addressDetail: z.string(),
});

export type AddressResType = z.TypeOf<typeof AddressRes>;

export const AddressListRes = z.array(AddressRes);

export type AddressListResType = z.TypeOf<typeof AddressListRes>;

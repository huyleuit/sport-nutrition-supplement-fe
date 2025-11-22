import http from "@/lib/http";
import {
  AddressBodyType,
  AddressListResType,
} from "@/schemaValidations/address.schema";

const addressApiRequest = {
  getAddress: () => http.get<AddressListResType>("/address"),
  addAddress: (body: AddressBodyType) =>
    http.post<{ id: string }>("/address", body),
  updateAddress: (addressId: string, body: AddressBodyType) =>
    http.put<{ status: string }>(`/address/${addressId}`, body),
  deleteAddress: (addressId: string) =>
    http.delete<{ status: string }>(`/address/${addressId}`),
};

export default addressApiRequest;

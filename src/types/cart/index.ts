export type CartResType = {
  id: string;
  variantId: string;
  variantName: string;
  price: number;
  quantity: number;
  imgUrl: string;
}[];

export type CartProductType = {
  cartItemId: number;
  productId: number;
  productName: string;
  image: string;
  priceAfterSale: number;
  price: number;
  variantId: number;
  variantName: string;
  stockQuantity?: number;
  quantity: number;
};

export type CartProductsType = CartProductType[];

export type AddProductToCartBodyType = {
  variantId: string;
  quantity: number;
};

export type OrderProductType = {
  productId: number;
  variantId: number;
  variantName: string;
  productName: string;
  price: number;
  priceAfterSale: number;
  quantity: number;
};

export type OrderRequestResType = {
  orderId: number;
  createdDate: string;
  totalAmount: number;
  note: string | null;
  status: string;
  addressDetail: string;
  shipmentCharges: number | null;
  products: OrderProductType[];
};

export type OrderContentBodyType = {
  orderId: number;
  paymentMethod: string;
  addressId: string | null;
  addressDetail: string | null;
  method: string;
  note: string | null;
};

export type OrderContentResType = {
  orderId: number;
  createdDate: string;
  totalAmount: number;
  note: string | null;
  status: string;
  addressDetail: string;
  shipmentCharges: number | null;
  redirectUrl: string;
};

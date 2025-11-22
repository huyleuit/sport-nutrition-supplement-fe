export type CartResType = {
  cartId: number;
  userId: number;
  products: CartProductsType;
  combos: [] | null;
  isAvailable: boolean;
};

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
  productId: number;
  variantId: number;
  comboId: number | null;
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

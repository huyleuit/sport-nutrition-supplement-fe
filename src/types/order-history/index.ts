export type TParamsOrderHistory = {
  orderId: number;
  products: {
    productId: number;
    productName: string;
    variant: string;
    productImage: string;
    quantity: number;
    price: number;
  }[];
  orderDate: string;
  totalAmount: number;
  status: string;
}[];

export type TParamsOrder = {
  orderId: number;
  products: {
    productId: number;
    productName: string;
    variant: string;
    productImage: string;
    quantity: number;
    price: number;
  }[];
  orderDate: string;
  totalAmount: number;
  status: string;
};

export type OrderHistoryType = {
  orderId: number;
  createdDate: string;
  totalAmount: number;
  note: string | null;
  status: "CANCELLED" | "PENDING" | "SHIPPING" | "SUCCESS";
  addressDetail: string | null;
  shipmentCharges: number | null;
  products: {
    productId: number;
    variantId: number;
    variantName: string;
    productName: string;
    price: number;
    priceAfterSale: number;
    quantity: number;
    image: string;
  }[];
};

export type OrderHistoryResType = OrderHistoryType[];

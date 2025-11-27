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
  id: string;
  createdDate: string;
  totalAmount: number;
  status: "PAID" | "PENDING" | "CANCELLED";
  addressDetail: string | null;
  products: {
    id: string;
    variantName: string;
    productName: string;
    price: number;
    quantity: number;
    imgUrl: string;
  }[];
};

export type OrderHistoryResType = OrderHistoryType[];

export type OrderDetailResType = {
  id: string;
  location: string;
  email: string;
  phone: string;
  orderDate: string;
  totalAmount: number;
  note: string | null;
  status: "PAID" | "PENDING" | "CANCELLED";
  items: {
    id: string;
    orderId: string;
    variantId: string;
    variantName: string;
    quantity: number;
    price: number;
    imgUrl: string;
    productName?: string;
  }[];
};

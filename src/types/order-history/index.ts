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
  status: "CANCELLED" | "PENDING" | "SHIPPING" | "SUCCESS";
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

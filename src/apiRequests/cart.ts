import http from "@/lib/http";
import {
  AddProductToCartBodyType,
  CartResType,
  OrderContentBodyType,
  OrderContentResType,
  OrderRequestResType,
} from "@/types/cart";
import { OrderHistoryResType } from "@/types/order-history";

const cartApiRequests = {
  // Cart
  getCartProducts: () => http.get<CartResType>("/cart"),
  addProductToCart: (body: AddProductToCartBodyType) =>
    http.post<{ id: string }>("/cart", body),
  updateProductQuantity: (id: string, quantity: number) =>
    http.put(`/cart/${id}`, { quantity }),
  deleteProductFromCart: (id: string) => http.delete(`/cart/${id}`),

  // Order
  getAllOrders: () => http.get<OrderHistoryResType>("/orders/user"),
  createOrder: () => http.post<OrderRequestResType>("/order/create", {}),
  addOrderContent: (body: OrderContentBodyType) =>
    http.post<OrderContentResType>("/orders", body),
};

export default cartApiRequests;

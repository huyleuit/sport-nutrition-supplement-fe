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
  getCartProducts: () => http.get<CartResType>("/cart/all"),
  addProductToCart: (body: AddProductToCartBodyType) =>
    http.post<{ id: string }>("/cart/item", body),
  updateProductQuantity: (cartProductId: number, quantity: number) =>
    http.patch(`/cart/item/${cartProductId}`, { quantity }),
  deleteProductFromCart: (cartItemId: number) =>
    http.delete(`/cart/item/${cartItemId}`),

  // Order
  getAllOrders: () => http.get<OrderHistoryResType>("/order/all"),
  createOrder: () => http.post<OrderRequestResType>("/order/create", {}),
  addOrderContent: (body: OrderContentBodyType) =>
    http.post<OrderContentResType>("/order/content", body),
};

export default cartApiRequests;

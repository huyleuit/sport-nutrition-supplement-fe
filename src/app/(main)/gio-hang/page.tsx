import { CartSection } from "@/components/cart/CartSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Giỏ hàng",
};

export default function page() {
  return <CartSection />;
}

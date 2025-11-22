import { LoyaltySection } from "@/components/loyalty/LoyaltySection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Khách hàng thân thiết",
};

export default function page() {
  return <LoyaltySection />;
}

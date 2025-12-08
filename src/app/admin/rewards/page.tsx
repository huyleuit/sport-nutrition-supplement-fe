import { RewardsAdmin } from "@/components/admin/RewardsAdmin";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quản lý Rewards | Admin",
  description: "Tạo và quản lý phần thưởng loyalty trên blockchain",
};

export default function RewardsPage() {
  return <RewardsAdmin />;
}


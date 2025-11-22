export const runtime = "edge";

import { Footer } from "@/components/footer/Footer";
import { Header } from "@/components/header/Header";
import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: {
    default: "4HProtein | Thực phẩm thể hình chính hãng",
    template: `%s | 4HProtein`,
  },
  description:
    "Thương hiệu hàng đầu về sản phẩm dinh dưỡng thể thao, giúp bạn nâng cao hiệu suất và chăm sóc sức khỏe toàn diện.",
  openGraph: {
    title: "4HProtein | Thực phẩm thể hình chính hãng",
    description:
      "Thương hiệu hàng đầu về sản phẩm dinh dưỡng thể thao, giúp bạn nâng cao hiệu suất và chăm sóc sức khỏe toàn diện.",
    type: "website",
    images: [
      "https://raw.githubusercontent.com/Bearackle/Sport-Nutrition-Supplement/refs/heads/main/frontend/public/logo.png",
    ],
  },
};

export async function generateStaticParams() {
  return [{ lang: "en-US" }];
}

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

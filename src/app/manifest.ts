import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "4HProtein",
    short_name: "4HProtein",
    description:
      "Thương hiệu hàng đầu về sản phẩm dinh dưỡng thể thao, giúp bạn nâng cao hiệu suất và chăm sóc sức khỏe toàn diện.",
    icons: [
      {
        src: "https://raw.githubusercontent.com/Bearackle/Sport-Nutrition-Supplement/refs/heads/main/frontend/public/logo.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "https://raw.githubusercontent.com/Bearackle/Sport-Nutrition-Supplement/refs/heads/main/frontend/public/logo.png",
        sizes: "500x500",
        type: "image/png",
      },
    ],
    theme_color: "#1F5ADD",
    background_color: "#1F5ADD",
    start_url: "/",
    display: "standalone",
    related_applications: [
      {
        platform: "webapp",
        url: "https://4hprotein.vercel.app/manifest.json",
      },
    ],
    scope: "/",
  };
}

"use client";
import { useAppContext } from "@/app/app-provider";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export const Subscription = () => {
  const router = useRouter();
  const { isAuthenticated } = useAppContext();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isAuthenticated) {
      router.push("/");
    } else {
      router.push("/dang-ky");
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "rounded-[0.5rem] bg-white text-[0.875rem] leading-[1.21] text-[#333]",
      )}
    >
      <input
        type="email"
        name="subcription"
        id="subcription"
        placeholder="Nhận ngay ưu đãi.."
        required
        className={cn("bg-transparent px-4 py-3 focus:outline-none")}
      />
      <button
        type="submit"
        className={cn(
          "border-l border-solid border-[#333]/30 p-2 text-[0.8rem] font-medium",
        )}
      >
        Đăng ký
      </button>
    </form>
  );
};

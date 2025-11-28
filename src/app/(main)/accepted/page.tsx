import { Button } from "@/components/ui/button";
import { CheckCircledIcon } from "@radix-ui/react-icons";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Đặt hàng thành công",
};

export default function AcceptedPage() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl">
        <div className="flex flex-col items-center justify-center rounded-lg border bg-white p-8 shadow-lg">
          {/* Success Icon */}
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <CheckCircledIcon className="h-12 w-12 text-green-600" />
          </div>

          {/* Success Message */}
          <h1 className="mb-4 text-center text-3xl font-bold text-gray-900">
            Đặt hàng thành công!
          </h1>
          <p className="mb-2 text-center text-lg text-gray-600">
            Cảm ơn bạn đã đặt hàng tại 4HProtein
          </p>
          <p className="mb-8 text-center text-sm text-gray-500">
            Chúng tôi đã nhận được đơn hàng của bạn và sẽ xử lý trong thời gian
            sớm nhất.
          </p>

          {/* Order Info */}
          <div className="mb-8 w-full rounded-lg bg-gray-50 p-6">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">
              Thông tin đơn hàng
            </h2>
            <div className="space-y-2 text-sm text-gray-600">
              <p>
                Bạn sẽ nhận được email xác nhận đơn hàng trong vài phút tới.
              </p>
              <p>
                Bạn có thể theo dõi trạng thái đơn hàng trong phần{" "}
                <Link
                  href="/nguoi-dung/lich-su-don-hang"
                  className="font-semibold text-primary hover:underline"
                >
                  Lịch sử đơn hàng
                </Link>
                .
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex w-full flex-col gap-4 sm:flex-row sm:justify-center">
            <Button
              asChild
              variant="default"
              size="lg"
              className="w-full sm:w-auto"
            >
              <Link href="/nguoi-dung/lich-su-don-hang">
                Xem đơn hàng của tôi
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="w-full sm:w-auto"
            >
              <Link href="/">Tiếp tục mua sắm</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}


import { cn } from "@/lib/utils";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hướng dẫn mua hàng",
};

export default function page() {
  return (
    <div
      className={cn(
        "mx-auto flex w-[95%] max-w-[75rem] flex-col gap-3 py-12 text-justify text-[#333] xl:w-full",
      )}
    >
      <h2 className={cn("text-[1.5rem] font-bold uppercase")}>
        Hướng dẫn mua hàng
      </h2>
      <p>
        <strong>Bước 1:</strong> Truy cập website và lựa chọn sản phẩm cần mua
        để mua hàng
      </p>
      <p>
        <strong>Bước 2:</strong> Click và sản phẩm muốn mua, màn hình hiển thị
        ra pop up với các lựa chọn sau
      </p>
      <p>
        Nếu bạn muốn tiếp tục mua hàng: Bấm vào phần tiếp tục mua hàng để lựa
        chọn thêm sản phẩm vào giỏ hàng
      </p>
      <p>
        Nếu bạn muốn xem giỏ hàng để cập nhật sản phẩm: Bấm vào xem giỏ hàng
      </p>
      <p>
        Nếu bạn muốn đặt hàng và thanh toán cho sản phẩm này vui lòng bấm vào:
        Đặt hàng và thanh toán
      </p>
      <p>
        <strong>Bước 3:</strong> Lựa chọn thông tin tài khoản thanh toán
      </p>
      <p>
        Nếu bạn đã có tài khoản vui lòng nhập thông tin tên đăng nhập là email
        và mật khẩu vào mục đã có tài khoản trên hệ thống
      </p>
      <p>
        Nếu bạn chưa có tài khoản và muốn đăng ký tài khoản vui lòng điền các
        thông tin cá nhân để tiếp tục đăng ký tài khoản. Khi có tài khoản bạn sẽ
        dễ dàng theo dõi được đơn hàng của mình
      </p>
      <p>
        Nếu bạn muốn mua hàng mà không cần tài khoản vui lòng nhấp chuột vào mục
        đặt hàng không cần tài khoản
      </p>
      <p>
        <strong>Bước 4:</strong> Điền các thông tin của bạn để nhận đơn hàng,
        lựa chọn hình thức thanh toán và vận chuyển cho đơn hàng của mình
      </p>
      <p>
        <strong>Bước 5:</strong> Xem lại thông tin đặt hàng, điền chú thích và
        gửi đơn hàng
      </p>
      <p>
        Sau khi nhận được đơn hàng bạn gửi chúng tôi sẽ liên hệ bằng cách gọi
        điện lại để xác nhận lại đơn hàng và địa chỉ của bạn.
      </p>
      <p>Trân trọng cảm ơn.</p>
    </div>
  );
}

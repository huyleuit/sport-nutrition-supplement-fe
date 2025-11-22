import { cn } from "@/lib/utils";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Hướng dẫn Thanh Toán",
};

export default function page() {
  return (
    <div
      className={cn(
        "mx-auto flex w-[95%] max-w-[75rem] flex-col gap-3 py-12 text-justify text-[#333] xl:w-full",
      )}
    >
      <h2 className={cn("text-[1.5rem] font-bold uppercase")}>
        Hướng dẫn Thanh Toán
      </h2>

      <h3 className={cn("mt-2 font-bold")}>I. GIÁ SẢN PHẨM</h3>
      <ul className={cn("list-disc space-y-1 pl-4")}>
        <li>
          Giá bán niêm yết trên website 4HProtein .vn là giá bán đã gồm GTGT
          theo quy định của pháp luật và chi phí đóng gói sản phẩm.
        </li>
        <li>
          Giá bán này là chưa bao gồm chi phí vận chuyển. Phí vận chuyển sẽ được
          tính khi Khách hàng thực hiện mua hàng trên website, thể hiện trên
          bước Thanh toán, phí vận chuyển sẽ phụ thuộc vào trọng lượng và vị trí
          địa lý từ 4HProtein đến khách hàng. Hoặc sẽ được thông báo nếu có phát
          sinh.
        </li>
        <li>
          Phí vận chuyển đã bao gồm chi phí hàng hóa cồng kềnh và phí thu hộ,
          Khách hàng sẽ không phải trả thêm bất kỳ khoản phí ngoài nào.
        </li>
      </ul>

      <h3 className={cn("mt-2 font-bold")}>II. HÌNH THỨC THANH TOÁN</h3>
      <p>
        Với tiêu chí không ngừng nỗ lực để trải nghiệm mua hàng của Quý khách
        diễn ra thuận tiện và nhanh chóng nhất, Gymstore hiện hỗ trợ tất cả các
        phương thức thanh toán tiên tiến tại Việt Nam tại showroom bán hàng và
        website online{" "}
        <strong>
          <Link href="/" title="4HProtein">
            4HProtein
          </Link>
        </strong>
        .
      </p>
      <p>
        Khách hàng vui lòng kiểm tra hàng hóa và các thanh toán mà 4HProtein đã
        xác nhận tại Đơn hàng trước khi thanh toán.Số tiền khách hàng phải thanh
        toán cho 4HProtein chính là Số tiền cần thanh toán đã trừ mã giảm giá
        (nếu có) và cộng phí vận chuyển (nếu có), thể hiện trên website ở bước
        “Thanh toán”. Hoặc thông tin được thông báo từ cuộc gọi của nhân viên
        4HProtein.
      </p>

      <h3 className={cn("mt-2 font-bold")}>
        1. Mua hàng và thanh toán tại Store (Cash In Store)
      </h3>
      <p>
        Quý khách có thể tới thăm quan, lựa chọn và nghe tư vấn về các sản phẩm
        tại store - đồng thời được đo chỉ số cơ thể miễn phí bằng máy đo hiện
        đại Inbody. Quý khách có thể thanh toán bằng tiền mặt, chuyển khoản,
        VNPayQR hoặc thanh toán bằng thẻ. Chúng tôi chấp nhận thanh toán bằng
        tất cả các loại thẻ ( Visa, Mastercard, Amex, Thẻ ATM nội địa...) miễn
        phí quẹt thẻ.
      </p>

      <h3 className={cn("mt-2 font-bold")}>
        2. Thanh toán khi nhận hàng (COD).
      </h3>
      <p>
        Áp dụng cho mọi đơn hàng. Quý khách sẽ được báo trước số tiền cần thanh
        toán mà không phải thanh toán bất cứ khoản tiền nào trước, nhân viên
        giao hàng sẽ gọi điện trước khi giao hàng, quý khách thanh toán cho nhân
        viên giao hàng sau khi kiểm tra hàng.
      </p>

      <h3 className={cn("mt-2 font-bold")}>
        3. Chuyển khoản qua ngân hàng (Internet Banking)
      </h3>
      <p>
        Quý khách cần chuyển khoản trước cho chúng tôi nếu muốn sử dụng dịch vụ
        gửi hàng qua các tuyến xe khách. Ngoài ra ở một số đơn hàng đặc biệt
        chúng tôi sẽ yêu cầu quý khách chuyển hàng trước. Danh sách tài khoản
        ngân hàng của 4HProtein.
      </p>

      <strong className={cn("mt-4")}>
        <p>THÔNG TIN TÀI KHOẢN NGÂN HÀNG</p>
        <p className={cn("mt-2")}>
          NGÂN HÀNG NGOẠI THƯƠNG VIỆT NAM - VIETCOMBANK <br /> STK: 1021194195{" "}
          <br /> CTK: TRAN DUY HUNG
        </p>
      </strong>
    </div>
  );
}

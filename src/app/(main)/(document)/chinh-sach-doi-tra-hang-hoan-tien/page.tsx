import { cn } from "@/lib/utils";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chính Sách Đổi Trả Hàng, Hoàn Tiền",
};

export default function page() {
  return (
    <div
      className={cn(
        "mx-auto flex w-[95%] max-w-[75rem] flex-col gap-3 py-12 text-justify text-[#333] xl:w-full",
      )}
    >
      <h2 className={cn("text-[1.5rem] font-bold uppercase")}>
        Chính Sách Đổi Trả Hàng, Hoàn Tiền
      </h2>

      <h3 className={cn("mt-2 font-bold")}>
        1. Quy Định Đổi Trả Hàng Tại 4HProtein Store
      </h3>
      <ul className={cn("space-y-2")}>
        <li>
          - Hàng hóa đã mua trong vòng 07 kể từ ngày khách hàng nhận được hàng
          được quyền đổi trả nếu cảm thấy không ưng ý, hoặc không còn nhu cầu sử
          dụng sản phẩm.
        </li>
        <li>
          - Sau 07 ngày, khách hàng chỉ được trả lại hàng hoặc đổi sang mặt hàng
          khác khi:
          <ul className={cn("ml-2 space-y-2 pt-2")}>
            <li>
              + Đối với các sản phẩm đã mua trong vòng 15 ngày: Hàng bị lỗi
              không phải nguyên nhân từ phía khách hàng, đã được 4HProtein xác
              nhận.
            </li>
            <li>
              + Đối với các sản phẩm đã mua ngoài thời hạn 15 ngày sẽ không được
              đổi trả bởi bất cứ lý do gì.
            </li>
          </ul>
        </li>
        <li>
          - Hàng đổi trả phải đảm bảo các yếu tố sau:
          <ul className={cn("ml-2 space-y-2 pt-2")}>
            <li>
              + Hàng nhập lại phải sạch sẽ, còn nguyên tem, Serial, hoá đơn bán
              hàng, nguyên hình dạng, không xước, biến dạng, cháy nổ…
            </li>
            <li>
              + Hàng phải còn nguyên vẹn, không móp méo, không có dấu hiệu hư
              hại và các sản phẩm khuyến mãi đi kèm. Ghi chú: Khách hàng vui
              lòng mang sản phẩm cần đổi trả qua nơi mua để được giải quyết theo
              quy định. Các sản phẩm cần vận chuyển tới 4HProtein , khách hàng
              sẽ phải thanh toán phí vận chuyển phát sinh đồng thời thanh toán
              phí vận chuyển chiều giao đi nếu được khuyến mãi miễn phí vận
              chuyển.
            </li>
            <li>
              + Hàng thanh lý, giảm giá không được áp dụng chính sách nhập lại,
              đổi mới
            </li>
          </ul>
        </li>
      </ul>

      <h3 className={cn("mt-2 font-bold")}>2. CHÍNH SÁCH HOÀN TIỀN:</h3>
      <ul className={cn("space-y-2")}>
        <li>
          - Quý khách hàng sẽ được hoàn tiền sau khi thực hiện xong thủ tục trả
          hàng hoá. Số tiền hoàn lại bằng 100% số tiền khách hàng đã thanh toán
          cho 4HProtein .
        </li>
        <li>- Phương thức thanh toán: Chuyển khoản hoặc tiền mặt.</li>
        <li>
          - Đối với phương thức khách hàng thanh toán bằng máy quẹt thẻ POS hoặc
          thanh toán trực tuyến. Khách hàng vui lòng chịu phí giao dịch từ 2-3%
          giá trị đơn hàng.
        </li>
      </ul>
      <p>
        Lưu ý: Chúng tôi chỉ hoàn lại số tiền Quý khách thanh toán cho sản phẩm
        đã mua, các chi phí khác phát sinh như chi phí giao hàng, chi phí thanh
        toán qua thẻ tín dụng, chi phí cài đặt hoặc hỗ trợ kỹ thuật,… sẽ không
        được hoàn.
      </p>

      <h3 className={cn("mt-2 font-bold")}>3. THỦ TỤC NHẬP LẠI</h3>
      <p>
        Bắt buộc khách hàng phải xuất trình Hoá đơn bán lẻ hoặc mã khách hàng
        tại 4HProtein , được xác minh bằng số điện thoại hoặc Email đặt hàng.
      </p>
    </div>
  );
}

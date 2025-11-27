import { cn } from "@/lib/utils";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Chính sách thu thập và xử lý dữ liệu cá nhân",
};

export default function page() {
  return (
    <div
      className={cn(
        "mx-auto flex w-[95%] max-w-[75rem] flex-col gap-3 py-12 text-justify text-[#333] xl:w-full",
      )}
    >
      <h2 className={cn("text-[1.5rem] font-bold uppercase")}>
        CHÍNH SÁCH THU THẬP VÀ XỬ LÝ DỮ LIỆU CÁ NHÂN
      </h2>
      <p>
        4HProtein cam kết bảo vệ sự riêng tư và thông tin cá nhân của khách hàng
        khi sử dụng dịch vụ và sản phẩm của chúng tôi. Chính sách này giải thích
        cách chúng tôi thu thập, sử dụng, và bảo mật dữ liệu cá nhân của quý
        khách.
      </p>

      <h3 className={cn("mt-2 font-bold")}>1. Thu thập thông tin cá nhân</h3>
      <p>
        Khi quý khách truy cập và sử dụng dịch vụ của 4HProtein, chúng tôi có
        thể thu thập các thông tin cá nhân sau đây:
      </p>
      <ul className={cn("list-disc pl-4")}>
        <li>Họ và tên</li>
        <li>Địa chỉ email</li>
        <li>Số điện thoại</li>
        <li>Địa chỉ giao hàng</li>
        <li>
          Thông tin thanh toán (ví dụ: số thẻ tín dụng, tài khoản ngân hàng)
        </li>
        <li>
          Các thông tin khác liên quan đến đơn hàng hoặc hỗ trợ khách hàng
        </li>
      </ul>

      <h3 className={cn("mt-2 font-bold")}>
        2. Mục đích sử dụng thông tin cá nhân
      </h3>
      <p>
        Chúng tôi thu thập thông tin cá nhân của quý khách với các mục đích sau:
      </p>
      <ul className={cn("list-disc pl-4")}>
        <li>Xử lý và xác nhận đơn hàng</li>
        <li>Cung cấp sản phẩm và dịch vụ theo yêu cầu</li>
        <li>Liên hệ và hỗ trợ khách hàng khi cần thiết</li>
        <li>
          Gửi các thông báo về chương trình khuyến mãi, ưu đãi đặc biệt hoặc
          thông tin sản phẩm mới (nếu quý khách đồng ý nhận)
        </li>
        <li>Nâng cao chất lượng dịch vụ và cải thiện trải nghiệm người dùng</li>
      </ul>

      <h3 className={cn("mt-2 font-bold")}>3. Chia sẻ thông tin cá nhân</h3>
      <p>
        4HProtein cam kết không chia sẻ, bán hoặc trao đổi thông tin cá nhân của
        quý khách cho bên thứ ba, trừ các trường hợp sau:
      </p>
      <ul className={cn("list-disc pl-4")}>
        <li>Đối tác vận chuyển để giao hàng cho quý khách</li>
        <li>Đối tác thanh toán để xử lý giao dịch</li>
        <li>
          Cơ quan pháp luật khi có yêu cầu theo quy định của pháp luật hiện hành
        </li>
      </ul>

      <h3 className={cn("mt-2 font-bold")}>4. Lưu trữ và bảo mật thông tin</h3>
      <p>
        Chúng tôi áp dụng các biện pháp bảo mật để bảo vệ thông tin cá nhân của
        quý khách khỏi việc truy cập trái phép, mất mát, hoặc tiết lộ không hợp
        lệ. Dữ liệu cá nhân của quý khách được lưu trữ trên các hệ thống bảo mật
        cao và chỉ những nhân viên có thẩm quyền mới được truy cập.
      </p>

      <h3 className={cn("mt-2 font-bold")}>5. Quyền của khách hàng</h3>
      <p>Quý khách có quyền:</p>
      <ul className={cn("list-disc pl-4")}>
        <li>Yêu cầu xem lại thông tin cá nhân mà 4HProtein đang lưu trữ</li>
        <li>Yêu cầu chỉnh sửa hoặc xóa thông tin cá nhân của mình</li>
        <li>
          Rút lại sự đồng ý cho phép chúng tôi sử dụng thông tin cá nhân vào bất
          kỳ thời điểm nào
        </li>
      </ul>
      <p>
        Để thực hiện các quyền này, vui lòng liên hệ với chúng tôi qua email:{" "}
        <strong>
          <Link href="mailto:support@4hprotein.store" target="_blank">
            support@4hprotein.store
          </Link>
        </strong>
        .
      </p>

      <h3 className={cn("mt-2 font-bold")}>6. Cookie và công nghệ theo dõi</h3>
      <p>
        4HProtein sử dụng cookie và các công nghệ theo dõi khác để cải thiện
        trải nghiệm của quý khách trên trang web. Cookie giúp chúng tôi ghi nhớ
        các thông tin liên quan đến việc sử dụng trang web của quý khách, chẳng
        hạn như các sản phẩm mà quý khách đã xem hoặc thêm vào giỏ hàng. Quý
        khách có thể tắt cookie trong cài đặt trình duyệt của mình, nhưng điều
        này có thể ảnh hưởng đến trải nghiệm sử dụng trang web.
      </p>

      <h3 className={cn("mt-2 font-bold")}>7. Thay đổi chính sách</h3>
      <p>
        4HProtein có quyền thay đổi hoặc cập nhật chính sách thu thập và xử lý
        dữ liệu cá nhân bất kỳ lúc nào. Chúng tôi sẽ thông báo cho quý khách khi
        có bất kỳ thay đổi nào và khuyến khích quý khách kiểm tra lại chính sách
        thường xuyên để nắm bắt các cập nhật mới nhất.
      </p>

      <h3 className={cn("mt-2 font-bold")}>8. Liên hệ</h3>
      <p>
        Nếu quý khách có bất kỳ câu hỏi hoặc thắc mắc nào liên quan đến chính
        sách thu thập và xử lý dữ liệu cá nhân của chúng tôi, xin vui lòng liên
        hệ qua email:{" "}
        <strong>
          <Link href="mailto:support@4hprotein.store" target="_blank">
            support@4hprotein.store
          </Link>
        </strong>{" "}
        hoặc hotline:{" "}
        <strong>
          <Link href="tel:0333303802">033 330 3802</Link>
        </strong>
        .
      </p>

      <p>
        4HProtein cam kết bảo vệ sự riêng tư và an toàn cho thông tin cá nhân
        của quý khách.
      </p>
    </div>
  );
}

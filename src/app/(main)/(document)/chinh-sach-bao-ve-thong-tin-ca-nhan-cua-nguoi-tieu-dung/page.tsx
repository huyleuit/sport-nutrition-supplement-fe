import { cn } from "@/lib/utils";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Chính sách bảo vệ thông tin cá nhân của người tiêu dùng",
};

export default function page() {
  return (
    <div
      className={cn(
        "mx-auto flex w-[95%] max-w-[75rem] flex-col gap-3 py-12 text-justify text-[#333] xl:w-full",
      )}
    >
      <h2 className={cn("text-[1.5rem] font-bold uppercase")}>
        Chính sách bảo vệ thông tin cá nhân của người tiêu dùng
      </h2>
      <p>
        <strong>
          Chính sách bảo vệ thông tin cá nhân của người tiêu dùng (Điều 68 đến
          Điều 73), bao gồm:
        </strong>
      </p>
      <h3 className={cn("mt-2 font-bold")}>
        a) Mục đích thu thập thông tin cá nhân:
      </h3>
      <p>Cung cấp dịch vụ cho khách hàng và quản lý.</p>
      <p>
        Sử dụng thông tin cá nhân của Người Tiêu Dùng nhằm mục đích quản lý cơ
        sở dữ liệu về Người Tiêu Dùng và kịp thời xử lý các tình huống phát sinh
        (nếu có).
      </p>
      <h3 className={cn("mt-2 font-bold")}>b) Phạm vi sử dụng thông tin:</h3>
      <p>Cung cấp các dịch vụ đến Người Tiêu Dùng:</p>
      <ul className={cn("list-disc space-y-1 pl-4")}>
        <li>
          Gửi các thông báo về các hoạt động trao đổi thông tin giữa Người Tiêu
          Dùng và Gạo Home.
        </li>
        <li>
          Ngăn ngừa các hoạt động phá hủy, chiếm đoạt tài khoản người dùng của
          Người Tiêu Dùng hoặc các hoạt động giả mạo Người Tiêu Dùng.
        </li>
        <li>Liên lạc và giải quyết khiếu nại với Người Tiêu Dùng.</li>
        <li>
          Xác nhận và trao đổi thông tin về giao dịch của Người Tiêu Dùng tại
          Gạo Home.
        </li>
        <li>
          Trong trường hợp có yêu cầu của cơ quan quản lý nhà nước có thẩm
          quyền.
        </li>
      </ul>

      <h3 className={cn("mt-2 font-bold")}>c) Thời gian lưu trữ thông tin:</h3>
      <p>
        Không có thời hạn, ngoại trừ trường hợp Người Tiêu Dùng gửi có yêu cầu
        hủy bỏ tới cho Ban quản trị Công ty.
      </p>

      <h3 className={cn("mt-2 font-bold")}>
        d) Những người hoặc tổ chức có thể được tiếp cận với thông tin đó:
      </h3>
      <p>
        Người Tiêu Dùng đồng ý rằng, trong trường hợp cần thiết, các cơ quan/ tổ
        chức/cá nhân sau có quyền được tiếp cận và thu thập các thông tin cá
        nhân của mình, bao gồm:
      </p>
      <ul className={cn("list-disc space-y-1 pl-4")}>
        <li>Ban quản trị.</li>
        <li>
          Bên thứ ba có dịch vụ tích hợp với Website:{" "}
          <strong>
            <Link href="/" title="4HProtein">
              4HProtein
            </Link>
          </strong>
        </li>
        <li>
          Cơ quan nhà nước có thẩm quyền trong trường hợp có yêu cầu theo quy
          định tại quy chế hoạt động.
        </li>
        <li>Cố vấn tài chính, pháp lý và Công ty kiểm toán.</li>
        <li>
          Bên khiếu nại chứng minh được hành vi vi phạm của Người Tiêu Dùng.
        </li>
        <li>Theo yêu cầu của cơ quan nhà nước có thẩm quyền.</li>
      </ul>

      <h3 className={cn("mt-2 font-bold")}>
        đ) Địa chỉ của đơn vị thu thập và quản lý thông tin, bao gồm cách thức
        liên lạc để người tiêu dùng có thể hỏi về hoạt động thu thập, xử lý
        thông tin liên quan đến cá nhân mình:
      </h3>
      <p>4HProtein Store</p>
      <p>Địa chỉ: 201 Tây Hòa, Phước Long A, TP Thủ Đức</p>
      <p>
        Hotline: <Link href="tel:0333303802">033 330 3802</Link>
      </p>
      <p>
        Email:{" "}
        <Link href="mailto:support@4hprotein.store" target="_blank">
          support@4hprotein.store
        </Link>
      </p>

      <h3 className={cn("mt-2 font-bold")}>
        e) Phương thức và công cụ để người tiêu dùng tiếp cận và chỉnh sửa dữ
        liệu cá nhân của mình trên hệ thống thương mại điện tử của đơn vị thu
        thập thông tin.
      </h3>
      <p>
        Người Tiêu Dùng có quyền yêu cầu kiểm tra, cập nhật, điều chỉnh hoặc hủy
        bỏ thông tin cá nhân của mình bằng cách yêu cầu Ban quản trị thực hiện
        việc này.
      </p>
      <p>
        Người Tiêu Dùng có quyền gửi khiếu nại về việc lộ thông tin cá nhân của
        mình cho bên thứ 3 đến Ban quản trị.
      </p>
      <p>
        Khi tiếp nhận những phản hồi này, 4HProtein sẽ xác nhận lại thông tin,
        phải có trách nhiệm trả lời lý do và hướng dẫn Người Tiêu Dùng khôi phục
        và bảo mật lại thông tin.
      </p>
      <p>Các hình thức tiếp nhận thông tin khiếu nại của Người Tiêu Dùng:</p>
      <ul className={cn("ml-2 list-[lower-roman] space-y-1 pl-4")}>
        <li>
          Qua email:{" "}
          <Link href="mailto:support@4hprotein.store" target="_blank">
            support@4hprotein.store
          </Link>
        </li>
        <li>
          Qua điện thoại: <Link href="tel:0333303802">033 330 3802</Link>
        </li>
      </ul>

      <p>
        =&gt; Cơ chế tiếp nhận và giải quyết khiếu nại của người tiêu dùng liên
        quan đến việc thông tin cá nhân bị sử dụng sai mục đích hoặc phạm vi đã
        thông báo.
      </p>
      <p>
        =&gt; Chính sách này phải được hiển thị rõ ràng cho người tiêu dùng
        trước hoặc tại thời điểm thu thập thông tin.
      </p>
    </div>
  );
}

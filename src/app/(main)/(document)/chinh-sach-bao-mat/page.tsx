import { cn } from "@/lib/utils";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chính sách bảo mật",
};

export default function page() {
  return (
    <div
      className={cn(
        "mx-auto flex w-[95%] max-w-[75rem] flex-col gap-3 py-12 text-justify text-[#333] xl:w-full",
      )}
    >
      <h2 className={cn("text-[1.5rem] font-bold uppercase")}>
        Chính sách bảo mật
      </h2>
      <p>
        Cám ơn quý khách đã quan tâm và truy cập vào website. Chúng tôi tôn
        trọng và cam kết sẽ bảo mật những thông tin mang tính riêng tư của quý
        khách.
      </p>
      <p>
        Chính sách bảo mật sẽ giải thích cách chúng tôi tiếp nhận, sử dụng và
        (trong trường hợp nào đó) tiết lộ thông tin cá nhân của quý khách.
      </p>
      <p>
        Bảo vệ dữ liệu cá nhân và gây dựng được niềm tin cho quý khách là vấn đề
        rất quan trọng với chúng tôi. Vì vậy, chúng tôi sẽ dùng tên và các thông
        tin khác liên quan đến quý khách tuân thủ theo nội dung của Chính sách
        bảo mật. Chúng tôi chỉ thu thập những thông tin cần thiết liên quan đến
        giao dịch mua bán.
      </p>
      <p>
        Chúng tôi sẽ giữ thông tin của khách hàng trong thời gian luật pháp quy
        định hoặc cho mục đích nào đó. Quý khách có thể truy cập vào website và
        trình duyệt mà không cần phải cung cấp chi tiết cá nhân. Lúc đó, quý
        khách đang ẩn danh và chúng tôi không thể biết bạn là ai nếu quý khách
        không đăng nhập vào tài khoản của mình.
      </p>

      <h3 className={cn("mt-2 font-bold")}>1. Thu thập thông tin cá nhân</h3>
      <ul className={cn("list-disc space-y-1 pl-4")}>
        <li>
          Chúng tôi thu thập, lưu trữ và xử lý thông tin của bạn cho quá trình
          mua hàng và cho những thông báo sau này liên quan đến đơn hàng, và để
          cung cấp dịch vụ, bao gồm một số thông tin cá nhân: danh hiệu, tên,
          giới tính, ngày sinh, email, địa chỉ, địa chỉ giao hàng, số điện
          thoại, fax, chi tiết thanh toán, chi tiết thanh toán bằng thẻ hoặc chi
          tiết tài khoản ngân hàng.
        </li>
        <li>
          Chúng tôi sẽ dùng thông tin quý khách đã cung cấp để xử lý đơn đặt
          hàng, cung cấp các dịch vụ và thông tin yêu cầu thông qua website và
          theo yêu cầu của bạn.
        </li>
        <li>
          Hơn nữa, chúng tôi sẽ sử dụng các thông tin đó để quản lý tài khoản
          của bạn; xác minh và thực hiện giao dịch trực tuyến, nhận diện khách
          vào web, nghiên cứu nhân khẩu học, gửi thông tin bao gồm thông tin sản
          phẩm và dịch vụ. Nếu quý khách không muốn nhận bất cứ thông tin tiếp
          thị của chúng tôi thì có thể từ chối bất cứ lúc nào.
        </li>
        <li>
          Chúng tôi có thể chuyển tên và địa chỉ cho bên thứ ba để họ giao hàng
          cho bạn (ví dụ cho bên chuyển phát nhanh hoặc nhà cung cấp).
        </li>
        <li>
          Chi tiết đơn đặt hàng của bạn được chúng tôi lưu giữ nhưng vì lí do
          bảo mật nên chúng tôi không công khai trực tiếp được. Tuy nhiên, quý
          khách có thể tiếp cận thông tin bằng cách đăng nhập tài khoản trên
          web. Tại đây, quý khách sẽ thấy chi tiết đơn đặt hàng của mình, những
          sản phẩm đã nhận và những sản phẩm đã gửi và chi tiết email, ngân hàng
          và bản tin mà bạn đặt theo dõi dài hạn.
        </li>
        <li>
          Quý khách cam kết bảo mật dữ liệu cá nhân và không được phép tiết lộ
          cho bên thứ ba. Chúng tôi không chịu bất kỳ trách nhiệm nào cho việc
          dùng sai mật khẩu nếu đây không phải lỗi của chúng tôi.
        </li>
        <li>
          Chúng tôi có thể dùng thông tin cá nhân của bạn để nghiên cứu thị
          trường. mọi thông tin chi tiết sẽ được ẩn và chỉ được dùng để thống
          kê. Quý khách có thể từ chối không tham gia bất cứ lúc nào.
        </li>
      </ul>

      <h3 className={cn("mt-2 font-bold")}>2. Bảo mật</h3>
      <ul className={cn("list-disc space-y-1 pl-4")}>
        <li>
          Chúng tôi có biện pháp thích hợp về kỹ thuật và an ninh để ngăn chặn
          truy cập trái phép hoặc trái pháp luật hoặc mất mát hoặc tiêu hủy hoặc
          thiệt hại cho thông tin của bạn.
        </li>
        <li>
          Chúng tôi khuyên quý khách không nên đưa thông tin chi tiết về việc
          thanh toán với bất kỳ ai bằng e-mail, chúng tôi không chịu trách nhiệm
          về những mất mát quý khách có thể gánh chịu trong việc trao đổi thông
          tin của quý khách qua internet hoặc email.
        </li>
        <li>
          Quý khách tuyệt đối không sử dụng bất kỳ chương trình, công cụ hay
          hình thức nào khác để can thiệp vào hệ thống hay làm thay đổi cấu trúc
          dữ liệu. Nghiêm cấm việc phát tán, truyền bá hay cổ vũ cho bất kỳ hoạt
          động nào nhằm can thiệp, phá hoại hay xâm nhập vào dữ liệu của hệ
          thống website. Mọi vi phạm sẽ bị tước bỏ mọi quyền lợi cũng như sẽ bị
          truy tố trước pháp luật nếu cần thiết.
        </li>
        <li>
          Mọi thông tin giao dịch sẽ được bảo mật nhưng trong trường hợp cơ quan
          pháp luật yêu cầu, chúng tôi sẽ buộc phải cung cấp những thông tin này
          cho các cơ quan pháp luật.
        </li>
      </ul>
      <p>
        Các điều kiện, điều khoản và nội dung của trang web này được điều chỉnh
        bởi luật pháp Việt Nam và tòa án Việt Nam có thẩm quyền xem xét.
      </p>
      <p>
        Khách hàng giao dịch mua hàng tại 4HProtein qua Thẻ tín dụng/thẻ ghi
        nợ/thẻ ATM nội địa đều được bảo mật thông tin bằng mã hóa. Chúng tôi lưu
        ý quý khách khi thực hiện thanh toán qua mạng:
      </p>
      <ul className={cn("term space-y-1")}>
        <li>
          Chỉ thanh toán trên website có chứng chỉ an toàn, bảo mật hệ thống
          thẻ.
        </li>
        <li>
          Tuyệt đối không cho người khác mượn thẻ tín dụng hoặc tài khoản của
          mình để thực hiện thanh toán trên website; trong trường hợp phát sinh
          giao dịch ngoài ý muốn, khách hàng vui lòng thông báo ngay lập tức cho
          hotline 4HProtein để chúng tôi có thể hỗ trợ kịp thời.
        </li>
        <li>
          Kiểm tra tài khoản ngân hàng của mình thường xuyên để đảm bảo tất cả
          giao dịch qua thẻ đều nằm trong tầm kiểm soát.
        </li>
      </ul>

      <h3 className={cn("mt-2 font-bold")}>3. Quyền lợi khách hàng</h3>
      <p>
        Quý khách có quyền yêu cầu truy cập vào dữ liệu cá nhân của mình, có
        quyền yêu cầu chúng tôi sửa lại những sai sót trong dữ liệu của bạn mà
        không mất phí. Bất cứ lúc nào bạn cũng có quyền yêu cầu chúng tôi ngưng
        sử dụng dữ liệu cá nhân của bạn cho mục đích tiếp thị.
      </p>
    </div>
  );
}

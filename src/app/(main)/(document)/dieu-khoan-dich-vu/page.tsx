import { cn } from "@/lib/utils";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Điều khoản dịch vụ",
};

export default function page() {
  return (
    <div
      className={cn(
        "mx-auto flex w-[95%] max-w-[75rem] flex-col gap-3 py-12 text-justify text-[#333] xl:w-full",
      )}
    >
      <h2 className={cn("text-[1.5rem] font-bold uppercase")}>
        Điều khoản dịch vụ
      </h2>
      <p>
        Chào mừng quý khách đến với 4HProtein. Khi truy cập và sử dụng trang web
        của chúng tôi, quý khách đồng ý tuân thủ các điều khoản và điều kiện sau
        đây. Xin vui lòng đọc kỹ trước khi sử dụng dịch vụ của chúng tôi.
      </p>

      <h3 className={cn("mt-2 font-bold")}>1. Chấp nhận điều khoản</h3>
      <p>
        Khi sử dụng trang web 4HProtein, quý khách đồng ý tuân theo tất cả các
        điều khoản, điều kiện và chính sách của chúng tôi. Nếu quý khách không
        đồng ý với bất kỳ phần nào của điều khoản, vui lòng không sử dụng trang
        web.
      </p>

      <h3 className={cn("mt-2 font-bold")}>2. Dịch vụ và sản phẩm</h3>
      <p>
        4HProtein cung cấp các sản phẩm thực phẩm chức năng với mục đích hỗ trợ
        sức khỏe và cải thiện thể chất. Mọi sản phẩm được cung cấp trên trang
        web đều được mô tả chi tiết, và chúng tôi không chịu trách nhiệm nếu sản
        phẩm không phù hợp hoặc gây ra phản ứng không mong muốn do tình trạng
        sức khỏe cá nhân của quý khách.
      </p>

      <h3 className={cn("mt-2 font-bold")}>3. Thông tin cá nhân và bảo mật</h3>
      <p>
        Chúng tôi cam kết bảo mật thông tin cá nhân của quý khách khi sử dụng
        dịch vụ của 4HProtein. Thông tin cá nhân của quý khách sẽ được sử dụng
        chỉ với mục đích liên hệ, xác nhận đơn hàng, và cải thiện dịch vụ. Quý
        khách có trách nhiệm bảo mật tài khoản của mình và không chia sẻ thông
        tin đăng nhập với bất kỳ ai.
      </p>

      <h3 className={cn("mt-2 font-bold")}>
        4. Chính sách hoàn trả và bảo hành
      </h3>
      <p>
        Chúng tôi cam kết mang đến cho quý khách hàng những sản phẩm chất lượng.
        Nếu có bất kỳ vấn đề nào với sản phẩm, quý khách có thể liên hệ với
        chúng tôi để được hỗ trợ hoàn trả hoặc đổi trả theo chính sách cụ thể
        của 4HProtein. Các sản phẩm phải được giữ nguyên bao bì và không có dấu
        hiệu sử dụng mới đủ điều kiện hoàn trả.
      </p>

      <h3 className={cn("mt-2 font-bold")}>5. Giá cả và thanh toán</h3>
      <p>
        Giá cả của các sản phẩm trên 4HProtein được niêm yết rõ ràng và có thể
        thay đổi mà không cần báo trước. Quý khách có thể thanh toán qua các
        phương thức mà chúng tôi hỗ trợ, bao gồm chuyển khoản ngân hàng, thẻ tín
        dụng, và các ví điện tử hợp pháp.
      </p>

      <h3 className={cn("mt-2 font-bold")}>6. Trách nhiệm của khách hàng</h3>
      <p>
        Khi sử dụng các sản phẩm của 4HProtein, quý khách cần đọc kỹ thông tin
        và hướng dẫn sử dụng sản phẩm để đảm bảo an toàn. Quý khách chịu hoàn
        toàn trách nhiệm về các vấn đề liên quan đến sức khỏe khi sử dụng sản
        phẩm mà không tuân theo hướng dẫn hoặc tư vấn của chúng tôi.
      </p>

      <h3 className={cn("mt-2 font-bold")}>
        7. Bản quyền và quyền sở hữu trí tuệ
      </h3>
      <p>
        Tất cả các nội dung trên trang web 4HProtein, bao gồm nhưng không giới
        hạn hình ảnh, văn bản, logo và thiết kế, đều thuộc quyền sở hữu của
        4HProtein. Nghiêm cấm mọi hành vi sao chép, chỉnh sửa hoặc sử dụng mà
        không có sự cho phép bằng văn bản từ chúng tôi.
      </p>

      <h3 className={cn("mt-2 font-bold")}>8. Thay đổi điều khoản dịch vụ</h3>
      <p>
        4HProtein có quyền thay đổi hoặc cập nhật điều khoản dịch vụ bất cứ lúc
        nào mà không cần báo trước. Quý khách nên kiểm tra lại điều khoản dịch
        vụ thường xuyên để cập nhật những thay đổi mới nhất.
      </p>

      <h3 className={cn("mt-2 font-bold")}>9. Liên hệ</h3>
      <p>
        Nếu có bất kỳ câu hỏi hoặc thắc mắc nào về điều khoản dịch vụ, xin vui
        lòng liên hệ với chúng tôi qua email: support@4hprotein.vn hoặc hotline:
        0123456789.
      </p>

      <p>
        <strong>4HProtein</strong> cảm ơn quý khách đã tin tưởng và sử dụng dịch
        vụ của chúng tôi.
      </p>
    </div>
  );
}

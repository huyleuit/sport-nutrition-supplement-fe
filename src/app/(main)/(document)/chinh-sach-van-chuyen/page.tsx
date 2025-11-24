import { cn } from "@/lib/utils";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Chính sách vận chuyển",
};

export default function Page() {
  return (
    <div
      className={cn(
        "mx-auto flex w-[95%] max-w-[75rem] flex-col gap-3 py-12 text-justify text-[#333] xl:w-full",
      )}
    >
      <h2 className={cn("text-[1.5rem] font-bold uppercase")}>
        Chính sách vận chuyển
      </h2>
      <p>
        Sau khi bạn đặt hàng, trong vòng 4 giờ làm việc chúng tôi sẽ liên lạc
        lại để xác nhận và kiểm tra thông tin. Những rủi ro phát sinh trong quá
        trình vận chuyển (va đập, ẩm ướt, tai nạn..) có thể ảnh hưởng đến hàng
        hóa, vì thế xin Quý Khách vui lòng kiểm tra hàng hóa thật kỹ trước khi
        ký nhận. 4HProtein sẽ không chịu trách nhiệm với những sai lệch hình
        thức của hàng hóa sau khi Quý khách đã ký nhận hàng. Nếu phát hiện bất
        cứ hư hại nào vui lòng từ chối nhận hàng và liên hệ với 4HProtein ngay
        sau đó để được hỗ trợ.
      </p>

      <h3 className={cn("mt-2 font-bold")}>A. Nhận hàng tại Cửa hàng</h3>
      <p>
        Sau khi đặt hàng Online tại website{" "}
        <strong>
          <Link href="/" title="4HProtein">
            4HProtein
          </Link>
        </strong>
        , quý khách có thể lựa chọn nhận hàng tại cửa hàng của 4HProtein mà quý
        khách thấy thuận tiện. Chúng tôi sẽ chuẩn bị hàng trước và thông báo cho
        quý khách về thời gian dự kiến hàng về. Ngay khi hàng về tới cửa hàng,
        4HProtein sẽ báo cho quý khách và hướng dẫn đầu mối tiếp đón khách hàng
        tại cửa hàng.
      </p>

      <h3 className={cn("mt-2 font-bold")}>B. Giao hàng tận nơi</h3>
      <p>
        Giao hàng tận nơi: 4HProtein cung cấp dịch vụ giao hàng toàn quốc, gửi
        hàng tận nơi đến địa chỉ cung cấp của quý khách. Thời gian giao hàng dự
        kiến phụ thuộc vào kho có hàng và địa chỉ nhận hàng của quý khách.
      </p>
      <ul className={cn("term space-y-1")}>
        <li>
          Giao hàng nhanh 1-2h áp dụng cho những sản phẩm còn hàng trong kho của
          4HProtein trong cùng tỉnh thành với điểm nhận hàng của Khách hàng.
        </li>
        <li>
          Giao hàng nhanh 1-2h áp dụng trong bán kính 20km từ showroom bán hàng
          của 4HProtein
        </li>
        <li>
          Giao hàng nhanh 1-2h áp dụng cho các đơn hàng lẻ (sản phẩm có kích
          thước nhỏ gọn, các sản phẩm không yêu cầu lắp ráp, …)
        </li>
      </ul>
      <p>
        Số Km được tính từ cửa hàng 4HProtein tới địa chỉ giao hàng của khách
        hàng.
      </p>
      <p>
        Chương trình miễn phí giao hàng được xem là 1 chương trình khuyến mãi.
        Có thể không được áp dụng với các chương trình khuyến mãi khác đồng
        thời, 4HProtein sẽ báo cho khách hàng trước khi đơn hàng được giao đi về
        phí giao hàng nếu có phát sinh.
      </p>
      <p>
        Đối với các đơn hàng gửi đi nhà xe. 4HProtein chỉ miễn phí giao hàng tới
        1 địa chỉ của nhà xe. Phí giao hàng được thu bởi nhà xe sẽ không được
        thanh toán bởi 4HProtein.
      </p>
      <p>
        Chính sách vận chuyển chỉ áp dụng trong điều kiện giao nhận bình thường.
        4HProtein có quyền thay đổi hoặc cập nhật khi có các điều kiện phát sinh
        bất khả kháng như chiến tranh, thiên tai, dịch bệnh.
      </p>

      <h3 className={cn("mt-2 font-bold")}>KIỂM HÀNG</h3>
      <p>
        Với các đơn hàng khi mua online, quý khách được kiểm tra hàng trước khi
        nhận, đồng kiểm với đơn vị vận chuyển. Nếu sản phẩm có vấn đề, Quý khách
        có thể liên hệ hotline của 4HProtein để phản ánh, chúng tôi sẽ hỗ trợ
        quý khách nhanh nhất có thể.
      </p>
      <p>
        Hotline:{" "}
        <strong>
          <Link href="tel:0333303802">033 330 3802</Link>
        </strong>
      </p>
    </div>
  );
}

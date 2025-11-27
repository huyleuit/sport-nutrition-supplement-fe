import { Subscription } from "@/components/footer/Subscription";
import { cn } from "@/lib/utils";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/logo.png";

export const Footer = () => {
  return (
    <footer className={cn("leaading-[1.21] w-full bg-white")}>
      <div
        className="w-full py-3"
        style={{
          background:
            "linear-gradient(180deg, rgba(63,133,233,1) 0%, rgba(48,116,225,1) 50%, rgba(37,105,222,1) 100%)",
        }}
      >
        <div
          className={cn(
            "mx-auto flex w-[95%] max-w-[75rem] justify-between xl:w-full",
          )}
        >
          <div
            className={cn("hidden flex-row items-center gap-4 pl-4 lg:flex")}
          >
            <FontAwesomeIcon
              icon={faFacebook}
              color="white"
              width={36}
              height={36}
            />
            <FontAwesomeIcon
              icon={faInstagram}
              color="white"
              width={40}
              height={40}
            />
          </div>
          <div
            className={cn(
              "flex w-full flex-row items-center justify-center gap-4",
              "sm:justify-between sm:gap-0 lg:w-max lg:justify-start lg:gap-12",
            )}
          >
            <div className={cn("flex flex-row items-center gap-4")}>
              <FontAwesomeIcon
                icon={faEnvelope}
                color="white"
                height={40}
                className={cn("shrink-0")}
              />
              <p className={cn("hidden text-[0.875rem] text-white sm:flex")}>
                Bạn muốn nhận khuyến mãi đặc biệt?
                <br />
                Đăng ký ngay.
              </p>
            </div>
            <Subscription />
          </div>
        </div>
      </div>
      <div className={cn("mx-auto w-[95%] max-w-[75rem] py-8", "xl:w-full")}>
        <div className={cn("grid grid-cols-1 gap-8 xs:grid-cols-2")}>
          <div className={cn("space-y-8")}>
            <div className={cn("space-y-1")}>
              <h2 className={cn("text-base font-bold text-app-carbon")}>
                Thông tin cửa hàng
              </h2>
              <Link href="/" title="4HProtein">
                <Image src={logo} alt="logo" className="size-32" />
              </Link>
              <p className={cn("text-[0.875rem] text-app-carbon")}>
                <strong>Địa chỉ:</strong> 35/22 Đ. Số 9, Hiệp Bình Phước, Thủ
                Đức, TP.HCM
              </p>
              <p className={cn("text-[0.875rem] text-app-carbon")}>
                <strong>Số điện thoại:</strong> 033 330 3802
              </p>
              <p className={cn("text-[0.875rem] text-app-carbon")}>
                <strong>Email:</strong>{" "}
                <Link href="mailto:support@4hprotein.store" target="_blank">
                  support@4hprotein.store
                </Link>
              </p>
            </div>
            <div className={cn("space-y-1")}>
              <h2 className={cn("text-base font-bold text-app-carbon")}>
                Tổng đài hỗ trợ
              </h2>
              <p className={cn("text-[0.875rem]")}>
                Hotline:{" "}
                <strong>
                  <Link href="tel:0333303802">033.330.3802</Link>
                </strong>{" "}
                (9h00 - 20h00)
              </p>
            </div>
          </div>
          <div className={cn("space-y-8")}>
            <div className={cn("space-y-1")}>
              <h2 className={cn("text-base font-bold text-app-carbon")}>
                Hỗ trợ khách hàng
              </h2>
              <ul className={cn("space-y-1 text-[0.875rem]")}>
                <li>
                  <Link href="/huong-dan-mua-hang">Hướng dẫn mua hàng</Link>
                </li>
                <li>
                  <Link href="/huong-dan-thanh-toan">Hướng dẫn thanh toán</Link>
                </li>
                <li>
                  <Link href="/chinh-sach-doi-tra-hang-hoan-tien">
                    Hướng dẫn đổi trả hàng, hoàn tiền
                  </Link>
                </li>
              </ul>
            </div>
            <div className={cn("space-y-1")}>
              <h2 className={cn("text-base font-bold text-app-carbon")}>
                Chính sách
              </h2>
              <ul className={cn("space-y-1 text-[0.875rem]")}>
                <li>
                  <Link href="/quy-dinh-su-dung">Quy định sử dụng</Link>
                </li>
                <li>
                  <Link href="/chinh-sach-van-chuyen">
                    Chính sách Vận Chuyển
                  </Link>
                </li>
                <li>
                  <Link href="/chinh-sach-bao-mat">Chính sách Bảo Mật</Link>
                </li>
                <li>
                  <Link href="/chinh-sach-doi-tra-hang-hoan-tien">
                    Chính sách Đổi Trả Hàng
                  </Link>
                </li>
                <li>
                  <Link href="/chinh-sach-bao-ve-thong-tin-ca-nhan-cua-nguoi-tieu-dung">
                    Chính sách bảo vệ thông tin cá nhân của người tiêu dùng
                  </Link>
                </li>
              </ul>
            </div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d823.7710163395219!2d106.71607878361843!3d10.846668895395966!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175287146c555bd%3A0x9e16535d9b4b11fc!2zMzUvMjIgxJAuIFPhu5EgOSwgSGnhu4dwIELDrG5oIFBoxrDhu5tjLCBUaOG7pyDEkOG7qWMsIEjhu5MgQ2jDrSBNaW5oLCBWaWV0bmFt!5e0!3m2!1sen!2s!4v1729355971661!5m2!1sen!2s"
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="4HProtein Location"
              className={cn(
                "mx-auto aspect-[8/5] w-[90%] xs:mx-0 lg:w-[25rem]",
              )}
            ></iframe>
          </div>
        </div>
        <div className={cn("my-8 h-px w-full bg-[#333]")}></div>
        <div className={cn("text-justify text-[0.875rem] text-[#333]")}>
          <p>
            <strong>&copy; 2024, 4HProtein. All rights reserved.</strong>
          </p>
          <p>
            Bản quyền thuộc về <strong>4HProtein</strong> | Copyright by{" "}
            <strong>4HProtein</strong>
          </p>
          <p>
            Những sản phẩm đăng trên website này không phải là thuốc, không có
            tác dụng thay thế thuốc chữa bệnh.
            <br />
            Hình ảnh và Nutrition Facts của sản phẩm chỉ mang tính chất tham
            khảo bởi thành phần, mẫu mã nhà sản xuất có thể thay đổi bất cứ lúc
            nào mà <strong>4HProtein</strong> chưa thể cập nhật ngay lập tức.
          </p>
        </div>
      </div>
    </footer>
  );
};

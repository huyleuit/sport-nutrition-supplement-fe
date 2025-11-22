"use client";
import { Dispatch, SetStateAction } from "react";

// ** Import Icons
import { MethodSelection } from "./MethodSelection";
import cash from "/public/cart/cash.svg";
import internetBanking from "/public/cart/internet-banking.svg";
import momo from "/public/cart/momo.webp";
import vnPay from "/public/cart/vn-pay.webp";

const PAYMENT_METHODS = [
  {
    icon: internetBanking,
    label: "Thanh toán bằng chuyển khoản (QR Code)",
    method: "INTERNET_BANKING",
  },
  {
    icon: vnPay,
    label: "Thanh toán bằng VNPay",
    method: "VN_PAY",
  },
  {
    icon: cash,
    label: "Thanh toán tiền mặt khi nhận hàng",
    method: "COD",
  },
  {
    icon: momo,
    label: "Thanh toán bằng ví MoMo",
    method: "MOMO",
  },
];

type TProps = {
  paymentMethod: string;
  setPaymentMethod: Dispatch<SetStateAction<string>>;
};

export const OrderPaymentMethod = ({
  paymentMethod,
  setPaymentMethod,
}: TProps) => {
  return (
    <MethodSelection
      method={paymentMethod}
      setMethod={setPaymentMethod}
      METHODS={PAYMENT_METHODS}
      title="Phương thức thanh toán"
    />
  );
};

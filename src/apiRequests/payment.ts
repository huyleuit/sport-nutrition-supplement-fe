import http from "@/lib/http";
import { PaymentResType } from "@/types/payment";

const paymentApiRequests = {
  getAllPayments: () => http.get<PaymentResType>("/payments"),
  getUserPayments: () => http.get<PaymentResType>("/payments/user"),
};

export default paymentApiRequests;


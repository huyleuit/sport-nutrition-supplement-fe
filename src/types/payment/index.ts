export type PaymentType = {
  id: number;
  method: string;
  status: string;
  createdDate: string;
};

export type PaymentResType = PaymentType[];


export type CreatePaymentIntentData = {
  orderId: number;
};

export type CreatePaymentIntentResponse = {
  clientSecret: string;
};

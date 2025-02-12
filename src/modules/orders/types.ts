export type CreateOrderData = {
  userId?: number;
  items: {
    productVariantId: number;
    quantity: number;
  }[];
  shippingAddress: {
    addressLine1: string;
    addressLine2?: string;
    country: string;
    postalCode: string;
    city: string;
  };
  contactInfo: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email?: string;
  };
};

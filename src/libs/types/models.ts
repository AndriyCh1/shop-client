import { ProductAttributeKey } from '@modules/products/consts';

export type Product = {
  id: number;
  variantId: number;
  name: string;
  description: string | null;
  shortDescription: string;
  rating: number;
  cumulativeRatingSum: number;
  reviewCount: number;
  salePrice: number;
  comparedPrice: number | null;
  image: string | null;
  createdAt: string;
  updatedAt: string;
};

export type ProductVariant = {
  id: number;
  productId: number;
  name: string;
  description: string | null;
  shortDescription: string;
  salePrice: number;
  comparedPrice: number | null;
  stockQuantity: number;
  sku: string | null;
  displayOrder: number;
  attributes: Record<ProductAttributeKey, string>;
  images: ProductImage[];
  createdAt: string;
  updatedAt: string;
};

export type Category = {
  id: number;
  name: string;
  description: string | null;
  parentId: number | null;
};

export type ProductImage = {
  id: number;
  productId: number;
  productVariantId: number | null;
  image: string;
  createdAt: string;
  updatedAt: string;
};

export type CartItem = {
  id: number;
  quantity: number;
  productVariant: {
    id: number;
    productId: number;
    name: string;
    description: string | null;
    shortDescription: string;
    salePrice: number;
    rating: number;
    attributes: Record<ProductAttributeKey, string>;
    images: ProductImage[];
    stockQuantity: number;
  };
};

export type Cart = {
  id: number;
  cartItems: CartItem[];
};

export type OrderItem = {
  id: number;
  price: number;
  quantity: number;
  total: number;
  productName: string;
  productVariantName: string;
  productVariantSku: string;
  productVariant: {
    id: number;
  };
};

export type Order = {
  id: number;
  orderItems: OrderItem[];
  orderStatus: {
    id: number;
    statusName: string;
    color: string;
    createdAt: string;
    updatedAt: string;
  };
  orderDeliveredCarrierDate: string | null;
  orderDeliveredUserDate: string | null;
  total: number;
  customerFirstName: string;
  customerLastName: string;
  phoneNumber: string;
  email: string;
  addressLine1: string;
  addressLine2: string;
  country: string;
  city: string;
  state: string;
  postalCode: string;
  user: {
    id: number;
  };
  createdAt: string;
  updatedAt: string;
};

import type {
  Product as PrismaProduct,
  Category as PrismaCategory,
} from "@repo/product-db";

// Product from Prisma + frontend variants
export type ProductVariant = {
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  size: string;
};

export type ProductType = PrismaProduct & {
  variants: ProductVariant[];
};

export type ProductTypes = ProductType[];

export type StripeProductType = {
  id: string;
  name: string;
  price: number;
};

export type CategoryType = PrismaCategory;

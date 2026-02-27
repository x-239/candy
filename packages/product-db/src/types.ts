import { Prisma } from "../generated/prisma/index.js";

export type ProductWithVariants = Prisma.ProductGetPayload<{
  include: { variants: true };
}>;

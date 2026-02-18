import { prisma, Prisma } from "@repo/product-db";
import { Request, Response } from "express";

export const createProduct = async (req: Request, res: Response) => {
  const data: Prisma.ProductCreateInput = req.body;

  const product = await prisma.product.create({ data });
  res.status(201).json(product);
};

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data: Prisma.ProductVariantUpdateInput = req.body;

  const updatedProduct = await prisma.productVariant.update({
    where: { id: Number(id) },
    data,
  });

  return res.status(200).json(updatedProduct);
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  const deletedProduct = await prisma.productVariant.delete({
    where: { id: Number(id) },
  });

  return res.status(200).json(deletedProduct);
};

export const getProducts = async (req: Request, res: Response) => {
  const { category, search } = req.query;
  const products = await prisma.productVariant.findMany({
    where: {
      name: { contains: search as string, mode: "insensitive" },
      product: category ? { categorySlug: category as string } : undefined,
    },
  });

  res.status(200).json(products);
};

export const getProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await prisma.productVariant.findUnique({
    where: { id: Number(id) },
  });

  return res.status(200).json(product);
};

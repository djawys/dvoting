import { db } from '@/prisma/db';

export const getAllProducts = async () => {
  const products = await db.product.findMany({
    where: {},
  });
  return products;
};

export const getProductById = async (Id) => {};

export const createProduct = async (userId) => {
  let product = await db.product.create({
    data: {
      userId: userId,
      name: 'Product Name Here',
    },
  });

  return product;
};

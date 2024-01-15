import { PrismaClient, Product } from "@prisma/client";

const prisma = new PrismaClient();

export class ProductService {
  static async find() {
    try {
      const products = await prisma.product.findMany();
      return products;
    } catch (error: any) {
      throw new Error(error);
    } finally {
      await prisma.$disconnect();
    }
  }

  static async findOne(id: number) {
    try {
      const product = await prisma.product.findUnique({
        where: { id },
      });
      return product;
    } catch (error: any) {
      throw new Error(error);
    } finally {
      await prisma.$disconnect();
    }
  }
  static async create(data: Product) {
    try {
      const product = await prisma.product.create({ data });
      return product;
    } catch (error: any) {
      throw new Error(error);
    } finally {
      await prisma.$disconnect();
    }
  }

  static async delete(id: number) {
    try {
      const product = await prisma.product.delete({ where: { id } });
      return product;
    } catch (error: any) {
      throw new Error(error);
    } finally {
      await prisma.$disconnect();
    }
  }

  static async update(id: number, data: Partial<Product>) {
    try {
      const product = await prisma.product.update({
        where: { id },
        data,
      });
      return product;
    } catch (error: any) {
      throw new Error(error);
    } finally {
    }
  }
}

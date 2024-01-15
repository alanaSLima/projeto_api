import { PrismaClient, Order, ProductOnOrder } from "@prisma/client";
import { numberGenerator } from "../utils/numberGenerator";

const prisma = new PrismaClient();

export class OrderService {
  static async find(where: Partial<Order>) {
    try {
      const orders = await prisma.order.findMany({
        where,
      });
      return orders;
    } catch (error: any) {
      throw new Error(error);
    } finally {
      await prisma.$disconnect();
    }
  }

  static async findOne(id: number) {
    try {
      const order = await prisma.order.findUnique({
        where: { id },
        include: { items: { include: { product: true } } },
      });
      return order;
    } catch (error: any) {
      throw new Error(error);
    } finally {
      await prisma.$disconnect();
    }
  }

  static async findOneByUser(userId: number) {
    try {
      const order = await prisma.order.findFirst({
        where: { userId, state: OrderStates.CART },
        include: { items: { include: { product: true } } },
      });
      return order;
    } catch (error: any) {
      throw new Error(error);
    } finally {
      await prisma.$disconnect();
    }
  }

  static async create(userId: number) {
    try {
      const number = numberGenerator();
      const order = await prisma.order.create({
        data: {
          number,
          value: 0,
          userId,
        },
        include: { items: { include: { product: true } } },
      });
      return order;
    } catch (error: any) {
      throw new Error(error);
    } finally {
      await prisma.$disconnect();
    }
  }

  static async update(id: number, data: Partial<Order>) {
    try {
      const order = await prisma.order.update({
        where: { id },
        data,
        include: { items: { include: { product: true } } },
      });
      return order;
    } catch (error: any) {
      throw new Error(error);
    } finally {
      await prisma.$disconnect();
    }
  }

  static async addOrderItem(
    orderId: number,
    productId: number,
    quantity: number
  ) {
    try {
      const order = await prisma.order.update({
        where: { id: orderId },
        data: { items: { create: { productId, quantity } } },
      });
      return order;
    } catch (error: any) {
      throw new Error(error);
    } finally {
      await prisma.$disconnect();
    }
  }
  static async removeOrderItem(orderId: number, productId: number) {
    try {
      const order = await prisma.order.update({
        where: { id: orderId },
        data: {
          items: { delete: { productId_orderId: { orderId, productId } } },
        },
        include: { items: { include: { product: true } } },
      });
      return order;
    } catch (error: any) {
      throw new Error(error);
    } finally {
      await prisma.$disconnect();
    }
  }

  static async updateOrderItemQuantity(
    orderId: number,
    productId: number,
    quantity: number
  ) {
    try {
      const order = await prisma.order.update({
        where: { id: orderId },
        data: {
          items: {
            update: {
              where: { productId_orderId: { productId, orderId } },
              data: { quantity },
            },
          },
        },
        include: { items: { include: { product: true } } },
      });
      return order;
    } catch (error: any) {
      throw new Error(error);
    } finally {
      await prisma.$disconnect();
    }
  }
}

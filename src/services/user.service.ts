import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

export class UserService {
  static async find() {
    try {
      const users = await prisma.user.findMany();
      return users;
    } catch (error: any) {
      throw new Error(error);
    } finally {
      await prisma.$disconnect();
    }
  }

  static async findOne(id: number) {
    try {
      const user = await prisma.user.findUnique({
        where: { id },
        include: { orders: true },
      });
      return user;
    } catch (error: any) {
      throw new Error(error);
    } finally {
      await prisma.$disconnect();
    }
  }
  static async create(data: User) {
    try {
      const user = await prisma.user.create({ data });
      return user;
    } catch (error: any) {
      throw new Error(error);
    } finally {
      await prisma.$disconnect();
    }
  }

  static async delete(id: number) {
    try {
      const user = await prisma.user.delete({ where: { id } });
      return user;
    } catch (error: any) {
      throw new Error(error);
    } finally {
      await prisma.$disconnect();
    }
  }

  static async update(id: number, data: Partial<User>) {
    try {
      const user = await prisma.user.update({
        where: { id },
        data,
      });
      return user;
    } catch (error: any) {
      throw new Error(error);
    } finally {
    }
  }
}

import { Request, Response } from "express";
import { OrderService } from "../services/order.service";

class OrderController {
  async findOrCreate(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const order = await OrderService.findOneByUser(Number(userId));
      if (order) {
        return res.json(order);
      }
      const newOrder = await OrderService.create(Number(userId));
      return res.json(newOrder);
    } catch (error) {
      res.status(400).send(error);
    }
  }
}

import { Request, Response, response } from "express";
import { UserService } from "../services/user.service";

class UserController {
  async get(req: Request, res: Response) {
    try {
      const users = await UserService.find();
      res.json(users);
    } catch (error) {
      res.status(400).send(error);
    }
  }
  async getOne(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const user = await UserService.findOne(Number(id));
      res.json(user);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  async create(req: Request, res: Response) {
    const user = req.body;
    try {
      const newUser = await UserService.create(user);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const user = await UserService.delete(Number(id));
      res.status(200).json({ message: "Usuario Deletado" });
    } catch (error) {
      res.status(400).send(error);
    }
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const user = req.body;
    try {
      const updatedUser = await UserService.update(Number(id), user);
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(400).send(error);
    }
  }
}

export const userController = new UserController();

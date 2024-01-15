import { Request, Response, response } from "express";
import { ProductService } from "../services/product.service";

class ProductController {
  async get(req: Request, res: Response) {
    try {
      const products = await ProductService.find();
      res.json(products);
    } catch (error) {
      res.status(400).send(error);
    }
  }
  async getOne(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const product = await ProductService.findOne(Number(id));
      res.json(product);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  async create(req: Request, res: Response) {
    const product = req.body;
    try {
      const newProduct = await ProductService.create(product);
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const product = await ProductService.delete(Number(id));
      res.status(200).json({ message: "Usuario Deletado" });
    } catch (error) {
      res.status(400).send(error);
    }
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const product = req.body;
    try {
      const updatedProduct = await ProductService.update(Number(id), product);
      res.status(200).json(updatedProduct);
    } catch (error) {
      res.status(400).send(error);
    }
  }
}

export const productController = new ProductController();

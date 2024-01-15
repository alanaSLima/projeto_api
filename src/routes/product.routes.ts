import { Router } from "express";
import { productController } from "../controllers/product.controller";

const productRouter = Router();

productRouter.get("", productController.get);

productRouter.get("/:id", productController.getOne);

productRouter.delete("/:id", productController.delete);

productRouter.post("", productController.create);

productRouter.put("/:id", productController.update);

export default productRouter;

import { Router } from "express";
import { userController } from "../controllers/user.controller";

const userRouter = Router();

userRouter.get("", userController.get);

userRouter.get("/:id", userController.getOne);

userRouter.delete("/:id", userController.delete);

userRouter.post("", userController.create);

userRouter.put("/:id", userController.update);

export default userRouter;

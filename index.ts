import cors from "cors";
import express from "express";
import userRouter from "./src/routes/user.routes";
import productRouter from "./src/routes/product.routes";
import orderRouter from "./src/routes/order.routes";

const app = express();

app.use(express.json());
app.use(cors());

//User Routes
app.use("/users", userRouter);

//Product Routes
app.use("/products", productRouter);

//Order Routes
app.use(orderRouter);

const port = process.env.PORT || 8080;
console.log(port);

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});

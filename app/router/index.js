import { Router } from "express";
import { verifyToken } from "../middleware/auth";

import authRouter from "./auth.router";
import productRouter from "./product.router";

const rootRouter = Router();

rootRouter.use("/auth", authRouter);
rootRouter.use("/products", verifyToken, productRouter);

export default rootRouter;

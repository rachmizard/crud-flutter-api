import { Router } from "express";

import { ProductController } from "../controllers/product.controller";
import { requestValidator } from "../middleware/request-validator";
import { catchAsync } from "../utils/catch-async";

const productRouter = Router();

productRouter.get("/", catchAsync(ProductController.index));
productRouter.get(
	"/:id",
	ProductController.validateShow,
	catchAsync(ProductController.show)
);
productRouter.post(
	"/",
	ProductController.validateCreateOrUpdate,
	requestValidator,
	catchAsync(ProductController.create)
);
productRouter.put(
	"/:id",
	ProductController.validateCreateOrUpdate,
	requestValidator,
	catchAsync(ProductController.update)
);
productRouter.delete(
	"/:id",
	ProductController.validateShow,
	catchAsync(ProductController.delete)
);

export default productRouter;

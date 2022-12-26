import { Router } from "express";

import { verifyToken } from "../middleware/auth";

import { AuthController } from "../controllers/auth.controller";
import { requestValidator } from "../middleware/request-validator";
import { catchAsync } from "../utils/catchAsync";

const controller = new AuthController();

const authRouter = Router();

authRouter.post(
	"/signin",
	controller.signInScheme,
	requestValidator,
	catchAsync(controller.signIn)
);
authRouter.post(
	"/signup",
	controller.signUpScheme,
	requestValidator,
	catchAsync(controller.signUp)
);
authRouter.post(
	"/me",
	verifyToken,
	catchAsync(function (req, res) {
		res.status(200).json({
			user: req.user,
		});
	})
);

export default authRouter;

import { Router } from "express";

import { verifyToken } from "../middleware/auth";

import { AuthController } from "../controllers/auth.controller";
import { requestValidator } from "../middleware/request-validator";

const controller = new AuthController();

const authRouter = Router();

authRouter.post(
	"/signin",
	controller.signInScheme,
	requestValidator,
	controller.signIn
);
authRouter.post(
	"/signup",
	controller.signUpScheme,
	requestValidator,
	controller.signUp
);
authRouter.post("/me", verifyToken, function (req, res) {
	console.log("req", req.user);
	res.status(200).json({
		user: req.user,
	});
});

export default authRouter;

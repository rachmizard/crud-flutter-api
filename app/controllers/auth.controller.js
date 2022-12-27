import { check } from "express-validator";

import { AuthService } from "../services/auth.service";

export class AuthController extends AuthService {
	constructor() {
		super();
	}

	signInScheme = [
		check("email")
			.isEmail()
			.withMessage("Email not valid, for ex: john@mail.com")
			.notEmpty()
			.withMessage("Email cannot be empty")
			.isString()
			.exists(),
		check("password")
			.notEmpty()
			.isString()
			.exists()
			.isLength({
				max: 20,
				min: 6,
			})
			.withMessage("Password min 6, max 20 chars"),
	];

	signUpScheme = [
		...this.signInScheme,
		check("name")
			.notEmpty()
			.withMessage("Name cannot be empty")
			.isString()
			.exists(),
	];

	async signIn(req, res) {
		try {
			const { email, password } = req.body || {};

			const auth = await super.signInWithEmail({
				email,
				password,
			});

			const token = await super.storeMemberToken(auth.token, auth.id);

			res.status(200).json({
				message: "Successful authenticated",
				token: token.auth_key,
			});
		} catch (error) {
			res.status(error.status).json({
				message: error.message,
				status: error.status,
			});
		}
	}

	async signUp(req, res) {
		try {
			const { name, email, password } = req.body || {};

			const auth = await super.signUpWithEmailAndPassword({
				name,
				email,
				password,
			});

			const token = await super.storeMemberToken(auth.token, auth.id);

			res.status(200).json({
				message: "Successful registered",
				token: token.auth_key,
			});
		} catch (error) {
			res.status(error.status).json({
				message: error.message,
				status: error.status,
			});
		}
	}
}

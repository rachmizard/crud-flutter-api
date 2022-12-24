/* eslint-disable no-undef */
import jsonWebToken from "jsonwebtoken";
import { ApiError } from "./error";

export class JsonWebToken {
	jwt;

	constructor(jwt = jsonWebToken) {
		this.jwt = jwt;
	}

	sign(payload = {}) {
		return this.jwt.sign(payload, process.env.TOKEN_KEY, {
			expiresIn: "1h",
		});
	}

	async verify(token) {
		if (!token) {
			throw new ApiError({
				message: "Must provide token!",
				status: 401,
			});
		}

		try {
			return this.jwt.verify(token, process.env.TOKEN_KEY);
		} catch (error) {
			throw new ApiError({
				message: "Invalid Token!",
				status: 401,
			});
		}
	}
}

import { JsonWebToken } from "../utils/json-web-token";

const jsonWebToken = new JsonWebToken();

export const verifyToken = async (req, res, next) => {
	const token =
		req.body.token || req.query.token || req.headers.authorization;

	if (!token) {
		return res.status(403).json({
			message: "A token is required for authentication",
		});
	}

	try {
		const decoded = await jsonWebToken.verify(token);
		req.user = decoded;

		next();
	} catch (error) {
		return res.status(401).json({
			message: error.message,
			...error,
		});
	}
};

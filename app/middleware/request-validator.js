import { validationResult } from "express-validator";

export const requestValidator = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({
			validations: errors.array({
				onlyFirstError: true,
			}),
			message: "ValidationError",
			status: 400,
		});
	}

	return next();
};

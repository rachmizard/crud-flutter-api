export const catchAsync = (fn) => {
	return async (req, res, next) => {
		return await Promise.resolve(fn(req, res, next)).catch((err) => {
			return res.status(err.status || 500).json({
				status: err.status,
				message: err.message,
			});
		});
	};
};

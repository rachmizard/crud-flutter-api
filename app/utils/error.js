export class ApiError extends Error {
	constructor({ name, message, status }) {
		super(message);
		this.name = name || "ApiError";
		this.message = message;
		this.status = status;
	}
}

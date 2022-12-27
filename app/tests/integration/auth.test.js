const request = require("supertest");

const { default: app } = require("../../server");
const { default: Member } = require("@/app/models/member");
const {
	userRegistrationFaker,
	insertMember,
	defaultPassword,
} = require("../fixtures/auth.fixture");
const setupDBTest = require("../utils/setupDBTest");

setupDBTest();

describe("Auth Integration Test", () => {
	describe("POST /api/auth/signup", () => {
		it("should return 200 after successfully registered", async () => {
			const res = await request(app)
				.post("/api/auth/signup")
				.send(userRegistrationFaker);

			expect(res.statusCode).toBe(200);
			expect(res.body).toHaveProperty("token");
			expect(res.body).toHaveProperty("message");

			const registeredUser = await Member.findOne({
				where: {
					email: userRegistrationFaker.email,
				},
			});

			expect(registeredUser.name).toBe(userRegistrationFaker.name);
			expect(registeredUser.email).toBe(userRegistrationFaker.email);
			expect(registeredUser).toHaveProperty("id");
		});
	});

	describe("POST /api/auth/signin", () => {
		it("should return 200 after successfully logged in", async () => {
			const insertedUser = await insertMember({
				email: userRegistrationFaker.email,
				name: userRegistrationFaker.name,
			});

			const res = await request(app).post("/api/auth/signin").send({
				email: insertedUser.email,
				password: defaultPassword,
			});

			expect(res.statusCode).toBe(200);
			expect(res.body).toHaveProperty("token");
			expect(res.body).toHaveProperty("message");
		});

		it("should return 400 due to invalid credentials", async () => {
			const insertedUser = await insertMember({
				email: userRegistrationFaker.email,
				name: userRegistrationFaker.name,
			});

			const wrongPassword = "wrongPW321";

			const res = await request(app).post("/api/auth/signin").send({
				email: insertedUser.email,
				password: wrongPassword,
			});

			expect(res.statusCode).toBe(400);
			expect(res.body.message).toBe(
				"Password not valid, please provide correct password"
			);
		});

		it("should return 400 due to user not found or not registered", async () => {
			const userNotRegisteredCredentials = {
				email: "anjay@mail.com",
				password: "password32232",
			};

			const res = await request(app)
				.post("/api/auth/signin")
				.send(userNotRegisteredCredentials);

			expect(res.statusCode).toBe(400);
			expect(res.body.message).toBe(
				"Email or User not found, please provide correct email"
			);
		});
	});
});

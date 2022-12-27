const request = require("supertest");

const { default: app } = require("../../server");
const { defaultAuthorizedToken } = require("../fixtures/token.fixture");
const setupDBTest = require("../utils/setupDBTest");

const {
	productFaker,
	insertProducts,
	productFakers,
	productFakerTooLongString,
	getProducts,
} = require("../fixtures/product.fixture");

setupDBTest();

beforeEach(async () => {
	await insertProducts(productFakers);
});

describe("Product Integration Test", () => {
	describe("POST /api/products", () => {
		it("should return 200 successfully created product without any error validation", async () => {
			const res = await request(app)
				.post("/api/products")
				.set("Authorization", defaultAuthorizedToken)
				.send(productFaker)
				.expect(200);

			expect(res.body).toHaveProperty("data");
			expect(res.statusCode).toBe(200);
		});

		it("should return 500 due to validation name too long", async () => {
			const res = await request(app)
				.post("/api/products")
				.set("Authorization", defaultAuthorizedToken)
				.send(productFakerTooLongString)
				.expect(500);

			expect(res.statusCode).toEqual(500);
			expect(res.body).toHaveProperty("message");
		});
	});

	describe("GET /api/products", () => {
		it("should return 200 and display the list of products", async () => {
			const res = await request(app)
				.get("/api/products")
				.set("Authorization", defaultAuthorizedToken)
				.expect(200);

			expect(res.body).toHaveProperty("data");
			expect(res.body.data.length).toBeGreaterThan(0);
			expect(res.statusCode).toBe(200);
		});
	});

	describe("GET /api/products/:id", () => {
		it("should return 200 and display detail of products", async () => {
			const products = await getProducts();

			const productId = products[0].id;

			const res = await request(app)
				.get(`/api/products/${productId}`)
				.set("Authorization", defaultAuthorizedToken)
				.expect(200);

			expect(res.body).toHaveProperty("data");
			expect(res.statusCode).toBe(200);
		});

		it("should return 404 due to could not find product by id", async () => {
			const wrongProductId = 839202;

			const res = await request(app)
				.get(`/api/products/${wrongProductId}`)
				.set("Authorization", defaultAuthorizedToken)
				.expect(404);

			expect(res.statusCode).toBe(404);
		});
	});

	describe("PUT /api/products/:id", () => {
		it("should return 200 for updating product", async () => {
			const products = await getProducts();
			const product = products[0];
			const targetProductId = product?.id;

			const updatedProductPayload = {
				name: "Mie Instant Indomie",
				price: product?.price,
				code: product?.code,
			};

			const res = await request(app)
				.put(`/api/products/${targetProductId}`)
				.set("Authorization", defaultAuthorizedToken)
				.send(updatedProductPayload)
				.expect(200);

			expect(res.statusCode).toBe(200);
		});

		it("should return 400 due to missing price and code payload", async () => {
			const createdProduct = await insertProducts(productFakers);

			const product = createdProduct[0];
			const targetProductId = product.id;

			const missingProductPayload = {
				name: "Mie Instant Indomie",
			};

			const res = await request(app)
				.put(`/api/products/${targetProductId}`)
				.set("Authorization", defaultAuthorizedToken)
				.send(missingProductPayload)
				.expect(400);

			expect(res.statusCode).toBe(400);
		});

		it("should return 404 due to missing id", async () => {
			const createdProduct = await insertProducts(productFakers);

			const product = createdProduct[0];
			const missProductID = 7000; // missing product id

			const updatedProductPayload = {
				name: "Mie Instant Indomie",
				price: product.price,
				code: product.code,
			};

			const res = await request(app)
				.put(`/api/products/${missProductID}`)
				.set("Authorization", defaultAuthorizedToken)
				.send(updatedProductPayload)
				.expect(404);

			expect(res.statusCode).toBe(404);
		});
	});

	describe("DELETE /api/products/:id", () => {
		it("should return 200 for deleting product", async () => {
			const products = await getProducts();
			const product = products[0];
			const targetProductId = product.id;

			const res = await request(app)
				.delete(`/api/products/${targetProductId}`)
				.set("Authorization", defaultAuthorizedToken)
				.expect(200);

			expect(res.statusCode).toBe(200);
		});

		it("should return 404 due to missing id", async () => {
			const missProductID = 7000; // missing product id
			const res = await request(app)
				.delete(`/api/products/${missProductID}`)
				.set("Authorization", defaultAuthorizedToken)
				.expect(404);

			expect(res.statusCode).toBe(404);
		});
	});
});

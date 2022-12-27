import { check } from "express-validator";
import { ProductService } from "../services/product.service";

const productService = new ProductService();

export class ProductController {
	static validateShow = [
		check("id")
			.notEmpty()
			.withMessage("Id required")
			.exists("Id should be exists in path params"),
	];

	static validateCreateOrUpdate = [
		check("code")
			.notEmpty()
			.withMessage("Code required")
			.exists("Code should be exists in body param"),
		check("name")
			.notEmpty()
			.withMessage("Name required")
			.exists("Name should be exists in body param"),
		check("price")
			.isInt()
			.withMessage("Price should be integer")
			.notEmpty()
			.withMessage("Price required")
			.exists("Price should be exists in body param"),
	];

	static async index(_, res) {
		const products = await productService.getProducts();

		res.status(200).json({
			code: 200,
			status: true,
			data: products,
		});
	}

	static async show(req, res) {
		const { id } = req.params;

		const product = await productService.getProductById(id);
		res.status(200).json({
			code: 200,
			status: true,
			data: product,
		});
	}

	static async create(req, res) {
		const product = await productService.createProduct(req.body);
		res.status(200).json({
			code: 200,
			status: true,
			data: product,
		});
	}

	static async update(req, res) {
		const { id } = req.params;
		const product = await productService.updateProductById(id, req.body);

		res.status(200).json({
			code: 200,
			status: true,
			data: product,
		});
	}

	static async delete(req, res) {
		const { id } = req.params;

		await productService.deleteProductById(id);

		res.status(200).json({
			code: 200,
			status: true,
			data: {},
		});
	}
}

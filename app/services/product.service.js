import Product from "../models/product";

import { ApiError } from "../utils/error";

export class ProductService {
	async getProducts() {
		try {
			return Product.findAll({
				order: [["createdAt", "DESC"]],
			});
		} catch (error) {
			throw new ApiError({
				message: error.message,
				status: error.status,
				name: "ProductService:getProducts",
			});
		}
	}

	async getProductById(id) {
		try {
			const product = await Product.findByPk(id);

			if (!product) {
				throw new ApiError({
					message: `Product by ID: ${id} was not found`,
					status: 404,
				});
			}

			return product;
		} catch (error) {
			throw new ApiError({
				message: error.message,
				status: error.status,
				name: "ProductService:getProductById",
			});
		}
	}

	async createProduct({ code, name, price }) {
		try {
			return await Product.create({
				code,
				name,
				price,
			});
		} catch (error) {
			throw new ApiError({
				message: error.message,
				status: error.status,
				name: "ProductService:createProduct",
			});
		}
	}

	async updateProductById(id, { code, name, price }) {
		try {
			const product = await Product.findByPk(id);

			if (!product) {
				throw new ApiError({
					message: `Product by ID: ${id} was not found`,
					status: 404,
				});
			}

			return await product.update({
				code,
				name,
				price,
			});
		} catch (error) {
			throw new ApiError({
				message: error.message,
				status: error.status,
				name: "ProductService:updateProductById",
			});
		}
	}

	async deleteProductById(id) {
		try {
			const product = await Product.findByPk(id);

			if (!product) {
				throw new ApiError({
					message: `Product by ID: ${id} was not found`,
					status: 404,
				});
			}

			return await product.destroy();
		} catch (error) {
			throw new ApiError({
				message: error.message,
				status: error.status,
				name: "ProductService:deleteProductById",
			});
		}
	}
}

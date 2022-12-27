import Product from "@/app/models/product";
import { faker } from "@faker-js/faker";

export const productFaker = {
	code: faker.random.alphaNumeric(5),
	name: faker.commerce.productName(),
	price: parseInt(faker.commerce.price(1000)),
};

export const productFakerTooLongString = {
	code: faker.random.alphaNumeric(300),
	name: faker.commerce.productName(),
	price: parseInt(faker.commerce.price(1000)),
};

export const productFakers = [
	{
		code: faker.random.alphaNumeric(5),
		name: faker.commerce.productName(),
		price: parseInt(faker.commerce.price(1000)),
	},
	{
		code: faker.random.alphaNumeric(5),
		name: faker.commerce.productName(),
		price: parseInt(faker.commerce.price(1000)),
	},
	{
		code: faker.random.alphaNumeric(5),
		name: faker.commerce.productName(),
		price: parseInt(faker.commerce.price(1000)),
	},
];

export const insertProducts = async (products = []) => {
	return await Product.bulkCreate(products);
};

export const getProducts = async () => {
	return await Product.findAll({
		order: [["createdAt", "DESC"]],
	});
};

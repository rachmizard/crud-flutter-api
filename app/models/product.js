import { Model, DataTypes } from "sequelize";

import sequelize from "app/utils/database";

class Product extends Model {
	/**
	 * Helper method for defining associations.
	 * This method is not a part of Sequelize lifecycle.
	 * The `models/index` file will call this method automatically.
	 */
	static primaryKeyAttribute = "id";
	static tableName = "Products";

	static associate() {
		// define association here
	}
}
Product.init(
	{
		code: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		price: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: {
					args: [3, 255],
					msg: "Product Name length should be between 3 - 255 character",
				},
			},
		},
	},
	{
		sequelize,
		tableName: "Products",
		modelName: "Product",
		timestamps: true,
		createdAt: true,
		updatedAt: true,
	}
);

export default Product;

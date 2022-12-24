"use strict";

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
	/**
	 * Add altering commands here.
	 *
	 * Example:
	 * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
	 */
	await queryInterface.createTable("Products", {
		id: {
			type: Sequelize.UUID,
			allowNull: false,
			unique: true,
			primaryKey: true,
		},
		code: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		name: {
			type: Sequelize.STRING,
			allowNull: false,
			validate: {
				len: {
					args: [3, 255],
					msg: "Product Name length should be between 3 - 255 character",
				},
			},
		},
		price: {
			type: Sequelize.INTEGER,
			defaultValue: 0,
			allowNull: false,
		},
		createdAt: {
			allowNull: false,
			type: Sequelize.DATE,
		},
		updatedAt: {
			allowNull: false,
			type: Sequelize.DATE,
		},
	});
}
export async function down(queryInterface) {
	await queryInterface.dropTable("Products");
}

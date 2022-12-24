"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert("Products", [
			{
				name: "Mie Indomie Ayam Bawang",
				code: "MIAB-001",
				price: 2000,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: "Mie Indomie Soto Ayam",
				code: "MISA-002",
				price: 2000,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: "Mie Indomie Goreng",
				code: "MIG-003",
				price: 3000,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: "Mie Indomi Goreng Sate Padang",
				code: "MISP-004",
				price: 4000,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},
	async down(queryInterface) {
		await queryInterface.bulkDelete("Products", null, {});
	},
};

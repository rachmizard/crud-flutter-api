"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			{
				tableName: "Members",
				name: "Member",
			},
			[
				{
					name: "John",
					email: "john@mail.com",
					password: "password123",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: "Ricky",
					email: "ricky@mail.com",
					password: "password123",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: "Carl Johnson",
					email: "cj@mail.com",
					password: "password123",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			]
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("Members", null, {});
	},
};

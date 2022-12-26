"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("MemberTokens", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			auth_key: {
				type: Sequelize.TEXT,
				allowNull: false,
			},
			member_id: {
				type: Sequelize.INTEGER,
				references: {
					model: {
						tableName: "Members",
						name: "Member",
					},
					key: "id",
				},
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
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("MemberTokens");
	},
};

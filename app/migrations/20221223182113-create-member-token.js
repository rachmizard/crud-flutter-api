"use strict";
/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
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
}
export async function down(queryInterface) {
	await queryInterface.dropTable("MemberTokens");
}

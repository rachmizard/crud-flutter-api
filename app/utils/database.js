/* eslint-disable no-undef */
import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

import dbConfig from "app/config/config.js";

const databaseConfig = dbConfig[process.env.NODE_ENV || "development"];

const sequelize = new Sequelize({
	database: databaseConfig.database,
	username: databaseConfig.username,
	password: databaseConfig.password,
	dialect: databaseConfig.dialect,
	host: databaseConfig.host,
	port: databaseConfig.port,
	logging: false,
});

export async function initializeDB() {
	try {
		await sequelize.authenticate();
	} catch (error) {
		console.error("Could not connect to DB caused by " + error.message);
	}
}

export default sequelize;

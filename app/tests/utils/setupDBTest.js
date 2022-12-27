const { default: sequelize } = require("../../utils/database");

const setupDBTest = () => {
	beforeAll(async () => {
		await sequelize.sync({
			force: true,
		});
	});

	beforeEach(async () => {
		await sequelize.truncate({
			cascade: true,
		});
	});

	afterAll(async () => {
		await sequelize.close();
	});
};

module.exports = setupDBTest;

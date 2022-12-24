import { Model, DataTypes } from "sequelize";

import sequelize from "app/utils/database";

class MemberToken extends Model {
	/**
	 * Helper method for defining associations.
	 * This method is not a part of Sequelize lifecycle.
	 * The `models/index` file will call this method automatically.
	 */
	static associate(models) {
		// define association here
		this.belongsTo(models.Member, {
			as: "Member",
			foreignKey: "member_id",
		});
	}
}

MemberToken.init(
	{
		member_id: DataTypes.STRING,
		auth_key: DataTypes.STRING,
	},
	{
		sequelize,
		modelName: "MemberToken",
	}
);

export default MemberToken;

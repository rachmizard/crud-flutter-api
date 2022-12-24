import { DataTypes, Model } from "sequelize";

import sequelize from "app/utils/database";

class Member extends Model {
	/**
	 * Helper method for defining associations.
	 * This method is not a part of Sequelize lifecycle.
	 * The `models/index` file will call this method automatically.
	 */
	static associate(models) {
		// define association here

		this.hasMany(models.MemberToken, {
			foreignKey: "member_id",
		});
	}
}
Member.init(
	{
		name: DataTypes.STRING,
		email: DataTypes.STRING,
		password: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notNull: {
					msg: "A password is required",
				},
				notEmpty: {
					msg: "Please provied a password",
				},
			},
		},
	},
	{
		sequelize,
		modelName: "Member",
	}
);

export default Member;

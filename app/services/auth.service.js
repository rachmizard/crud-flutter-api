import Member from "../models/member";
import MemberToken from "../models/membertoken";

import { ApiError } from "../utils/error";
import { comparePassword, hashingPassword } from "../utils/hashing";
import { JsonWebToken } from "../utils/json-web-token";

const jwt = new JsonWebToken();

export class AuthService {
	async signInWithEmail({ email, password }) {
		const member = await Member.findOne({
			where: {
				email,
			},
		});

		if (!member) {
			throw new ApiError({
				message:
					"Email or User not found, please provide correct email",
				status: 400,
			});
		}

		const comparedPassword = comparePassword(member.password, password);

		if (!comparedPassword) {
			throw new ApiError({
				message: "Password not valid, please provide correct password",
				status: 400,
			});
		}

		const token = jwt.sign(member.dataValues);

		return {
			token,
			...member.dataValues,
		};
	}

	async storeMemberToken(token, id) {
		return await MemberToken.create({
			auth_key: token,
			member_id: id,
		});
	}

	async signUpWithEmailAndPassword({ name, email, password }) {
		const member = await Member.create({
			name,
			email,
			password: hashingPassword(password, 4),
		});

		const token = jwt.sign(member.dataValues);

		return {
			token,
			...member.dataValues,
		};
	}
}

import { faker } from "@faker-js/faker";

import Member from "@/app/models/member";
import { hashingPassword } from "@/app/utils/hashing";

export const defaultPassword = "password1";
const password = hashingPassword(defaultPassword, 1);

export const userFaker = {
	email: faker.internet.email(),
	password: faker.internet.password(10, false),
};

export const userRegistrationFaker = {
	name: faker.name.firstName(),
	...userFaker,
};

export const insertMember = async ({ name, email }) => {
	return await Member.create({
		name,
		email,
		password,
	});
};

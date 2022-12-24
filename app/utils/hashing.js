import bcrypt from "bcrypt";

export const hashingPassword = (password, saltRound = 8) => {
	const salt = bcrypt.genSaltSync(saltRound);
	return bcrypt.hashSync(password, salt);
};

export const comparePassword = (hashedPassword, password) => {
	return bcrypt.compareSync(password, hashedPassword);
};

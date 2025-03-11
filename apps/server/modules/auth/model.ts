import { eq } from "drizzle-orm";
import { db } from "../../db";
import { users } from "../../db/schema/user";

export const findByUsername = async (username: string) => {
	return await db.query.users.findFirst({
		where: eq(users.username, username),
	});
};

export const store = async (user: {
	username: string;
	password: string;
	role?: "admin" | "user";
}) => {
	return await db.insert(users).values(user);
};

export const findById = async (id: string) => {
	return await db.query.users.findFirst({
		columns: {
			id: true,
			username: true,
			role: true,
		},
		where: eq(users.id, id),
	});
};

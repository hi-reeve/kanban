import { db } from "../../db"
import { users } from "../../db/schema/user"

export const findAll = async () => {
	return await db.select().from(users)
}
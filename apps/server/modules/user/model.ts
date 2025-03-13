import { db } from '../../db'
import { users } from '../../db/schema/user'

export async function findAll() {
	return await db.select({
		id:users.id,
		username:users.username,
		name:users.name,
		role:users.role,
	}).from(users)
}

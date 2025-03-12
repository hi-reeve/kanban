import { db } from '../../db'
import { users } from '../../db/schema/user'

export async function findAll() {
    return await db.select().from(users)
}

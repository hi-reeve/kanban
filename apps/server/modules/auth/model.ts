import { RegisterPayload } from '@app/utils/schema'
import { eq } from 'drizzle-orm'
import { db } from '../../db'
import { users } from '../../db/schema/user'
export async function findByUsername(username: string) {
    return await db.query.users.findFirst({
        where: eq(users.username, username),
    })
}

export async function store(user : RegisterPayload) {
    return await db.insert(users).values(user)
}

export async function findById(id: string) {
    return await db.query.users.findFirst({
        columns: {
            id: true,
			username: true,
			name: true,
            role: true,
        },
        where: eq(users.id, id),
    })
}

import { createId } from '@paralleldrive/cuid2'
import { relations } from 'drizzle-orm'
import { pgEnum, pgTable, varchar } from 'drizzle-orm/pg-core'
import { userTasks } from './userTask'

export const roleEnum = pgEnum('role', ['admin', 'user'])

export const users = pgTable('users', {
    id: varchar('id', { length: 255 })
        .primaryKey()
        .notNull()
        .$default(() => createId()),
    username: varchar('username', { length: 255 }).unique().notNull(),
    name: varchar('name', { length: 255 }).notNull(),
    password: varchar('password', { length: 255 }).notNull(),
    role: roleEnum().default('user').notNull(),
})

export const usersRelations = relations(users, ({ many }) => ({
    tasks: many(userTasks),
}))

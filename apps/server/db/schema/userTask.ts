import { pgTable, primaryKey, varchar } from "drizzle-orm/pg-core";
import { tasks } from "./task";
import { users } from "./user";
import { relations } from "drizzle-orm";

export const userTasks = pgTable(
	"users_tasks",
	{
		task_id: varchar("task_id", { length: 255 })
			.notNull()
			.references(() => tasks.id),
		user_id: varchar("user_id", { length: 255 })
			.notNull()
			.references(() => users.id),
	},
	t => [
		primaryKey({
			columns: [t.task_id, t.user_id],
		}),
	]
);

export const userTaskRelations = relations(userTasks, ({ one }) => ({
	tasks: one(tasks, {
		fields: [userTasks.task_id],
		references: [tasks.id],
	}),
	users: one(users, {
		fields: [userTasks.user_id],
		references: [users.id],
	}),
}));

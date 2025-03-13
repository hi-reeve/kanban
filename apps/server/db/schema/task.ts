import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";
import { bigint, boolean, integer, pgTable, text, varchar } from "drizzle-orm/pg-core";
import { userTasks } from "./userTask";

export const tasks = pgTable("tasks", {
	id: varchar("id", { length: 255 })
		.primaryKey()
		.notNull()
		.$default(() => createId()),
	title: varchar("title", { length: 255 }).notNull(),
	description: text("description").notNull(),
	priority: integer("priority").notNull(),
	due_date: bigint("due_date", { mode: "number" }).notNull(),
	status: varchar("status", { length: 255 }).notNull(),
	is_done: boolean("is_done").notNull().default(false),
});

export const tasksRelations = relations(tasks, ({ many }) => ({
	assignees: many(userTasks),
}));

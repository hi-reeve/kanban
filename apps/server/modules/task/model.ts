import { and, asc, between, desc, eq, ilike, inArray, sql, SQL } from "drizzle-orm";
import { db } from "../../db";
import { CreateTaskDto, TaskFilter, UpdateTaskDto } from "./schema";
import { tasks } from "../../db/schema/task";
import { userTasks } from "../../db/schema/userTask";
import { SORT_DIRECTION } from "@app/types";
import { users } from "../../db/schema/user";

export const findAll = async (filter: TaskFilter) => {
	const filters: SQL[] = []
	const query = db
		.select({
			id: tasks.id,
			title: tasks.title,
			description: tasks.description,
			priority: tasks.priority,
			due_date: tasks.due_date,
			status: tasks.status,
			is_done: tasks.is_done,
			assignees: sql`array_agg(
				json_build_object(
					'id', users.id,
					'username', users.username
				)
			)`,
		})
		.from(tasks)
		.leftJoin(userTasks, eq(tasks.id, userTasks.task_id))
		.leftJoin(users, eq(users.id, userTasks.user_id))

	if (filter.title)
		filters.push(ilike(tasks.title, `%${filter.title}%`))

	if (filter.priority)
		filters.push(eq(tasks.priority, filter.priority))

	if (filter.due_date) {
		const startDate = filter.due_date[0];
		const endDate = filter.due_date[1];
		filters.push(between(tasks.due_date, startDate, endDate))
	}

	if (filter.assignee) {
		const assignees = Array.isArray(filter.assignee)
			? filter.assignee
			: [filter.assignee]
		
		const sq = await db
			.select({ id: tasks.id })
			.from(tasks)
			.leftJoin(userTasks, eq(tasks.id, userTasks.task_id))
			.where(inArray(userTasks.user_id, assignees))
		
		filters.push(inArray(tasks.id, sq.map(sq => sq.id)))
	}
	
	const sortBy = filter.sort_by ? tasks[filter.sort_by] : tasks.due_date
	const result = await query
		.where(and(...filters))
		.groupBy(
			tasks.id,
		)
		.orderBy(
			filter.sort_direction === SORT_DIRECTION.ASC
				? desc(sortBy)
				: asc(sortBy))

	return result
	
};

export const findOne = async (id: string) => {
	return await db.select().from(tasks).where(eq(tasks.id, id));
};

export const store = async (task: CreateTaskDto) => {
	return await db.transaction(async tx => {
		const [newTask] = await tx.insert(tasks).values(task).returning();

		await tx.insert(userTasks).values(
			task.users.map(assignee => {
				return {
					task_id: newTask.id,
					user_id: assignee,
				};
			})
		);

		return {
			...newTask,
			assignees: task.users,
		};
	});
};

export const destroy = async (id: string) => {
	return await db.delete(tasks).where(eq(tasks.id, id)).returning();
};

export const update = async (id: string, task: UpdateTaskDto) => {
	return await db.update(tasks).set(task).where(eq(tasks.id, id));
};

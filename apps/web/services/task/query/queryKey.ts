import { TaskFilter } from "@app/utils/schema";

export const queryTaskKeys = {
	all: ['tasks'] as const ,
	list: (params: TaskFilter) => [...queryTaskKeys.all, params],
	
}
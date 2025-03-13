import { UserFilter } from "@app/utils/schema";

export const queryUserKeys = {
	all: ['user'] as const ,
	list: (params: UserFilter) => [...queryUserKeys.all, params],
	
}
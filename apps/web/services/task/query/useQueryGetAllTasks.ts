import { $api } from "@/lib/http-client"
import { AppQueryOptions } from "@/types/react-query"
import { ITaskListResponse } from "@/types/task"
import { TaskFilter } from "@app/utils/schema"
import { ApiResponse } from "@app/utils/types"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { queryTaskKeys } from "./queryKey"

export const useQueryGetAllTasks = (queryOptions? : AppQueryOptions<ApiResponse<ITaskListResponse[]>>) => {
	const [params,setParams] = useState<TaskFilter>({})

	return {
		params,
		setParams,
		...useQuery({
			...queryOptions,
			queryKey: queryTaskKeys.list(params),
			queryFn: async () => {
				return (await $api.get<ApiResponse<ITaskListResponse[]>>('/v1/tasks', { params })).data
			},
		})
	}
}
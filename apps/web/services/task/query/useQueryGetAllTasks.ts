import { $api } from "@/lib/http-client"
import { ITaskListResponse } from "@/types/task"
import { TaskFilter } from "@app/utils/schema"
import { ApiResponse } from "@app/utils/types"
import { useSignal } from "@preact/signals-react"
import { useQuery, UseQueryOptions } from "@tanstack/react-query"

export const useQueryGetAllTasks = (queryOptions? : UseQueryOptions<ApiResponse<ITaskListResponse[]>>) => {
	const params = useSignal<TaskFilter>({})

	return {
		params,
		...useQuery({
			...queryOptions,
			queryKey: ['tasks', params],
			queryFn: async () => {
				return (await $api.get<ApiResponse<ITaskListResponse[]>>('/v1/tasks', { params: params.value })).data
			},
		})
	}
}
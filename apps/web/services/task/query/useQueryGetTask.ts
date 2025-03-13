import { $api } from "@/lib/http-client";
import { AppQueryOptions } from "@/types/react-query";
import { ITaskListResponse } from "@/types/task";
import { ApiResponse } from "@app/utils/types";
import { useQuery } from "@tanstack/react-query";
import { queryTaskKeys } from "./queryKey";

export const useQueryGetTask = (id: string, queryOpts?: AppQueryOptions<ApiResponse<ITaskListResponse>>) => {
	return useQuery({
		...queryOpts,
		queryKey: queryTaskKeys.getById(id),
		queryFn: async () => {
			return (await $api.get(`/v1/tasks/${id}`)).data
		}
	})
}
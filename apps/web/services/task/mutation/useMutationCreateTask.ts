import { $api } from "@/lib/http-client"
import { AppMutationOptions } from "@/types/react-query"
import { CreateTaskDto } from "@app/utils/schema"
import { useMutation } from "@tanstack/react-query"

export const useMutationCreateTask = (mutationOpts? : AppMutationOptions<any,CreateTaskDto>) => {
	return useMutation({
		...mutationOpts,
		mutationFn: async (payload : CreateTaskDto) => $api.post(`/v1/tasks`, payload),
	})
}
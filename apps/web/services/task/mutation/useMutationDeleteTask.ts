import { $api } from "@/lib/http-client"
import { AppMutationOptions } from "@/types/react-query"
import { useMutation } from "@tanstack/react-query"

export const useMutationDeleteTask = (mutationOpts? : AppMutationOptions<boolean,string>) => {
	return useMutation({
		...mutationOpts,
		mutationFn: async (id : string) => $api.delete(`/v1/tasks/${id}`),
	})
}
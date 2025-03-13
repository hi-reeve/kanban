import { $api } from "@/lib/http-client"
import { AppMutationOptions } from "@/types/react-query"
import { UpdateTaskDto } from "@app/utils/schema"
import { useMutation } from "@tanstack/react-query"

type Payload = {
	id: string;
	payload: UpdateTaskDto;
}
export const useMutationUpdateTask = (mutationOpts? : AppMutationOptions<any,Payload>) => {
	return useMutation({
		...mutationOpts,
		mutationFn: async ({id,payload}: Payload) => $api.put(`/v1/tasks/${id}`, payload),
	})
}
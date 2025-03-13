import { $api } from "@/lib/http-client"
import { UserFilter, UserResponse } from "@app/utils/schema"
import { ApiResponse } from "@app/utils/types"
import { useQuery, UseQueryOptions } from "@tanstack/react-query"
import { useState } from "react"
import { queryUserKeys } from "./queryKey"

export const useQueryGetAllUser = (queryOptions?: UseQueryOptions<ApiResponse<UserResponse[]>>) => {
	const [params,setParams] = useState<UserFilter>({})
	return useQuery({
		...queryOptions,
		queryKey: queryUserKeys.list(params),
		queryFn: async () => {
			return (await $api.get('/v1/users', { params })).data
		},
	})
}
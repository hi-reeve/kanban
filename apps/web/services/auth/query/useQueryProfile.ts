"use client"
import { $api } from "@/lib/http-client"
import { AppQueryOptions } from "@/types/react-query"
import { UserResponse } from "@app/utils/schema"
import { ApiResponse } from "@app/utils/types"
import { useQuery } from "@tanstack/react-query"
import { useSession } from "next-auth/react"

export const useQueryProfile = (queryOpts? : AppQueryOptions<ApiResponse<UserResponse>>) => {
	const { data } = useSession()
	return useQuery({
		...queryOpts,
		queryKey: ['profile', data?.user],
		queryFn: async () =>  await ((await $api.get('/v1/auth/me'))).data,
	})
}
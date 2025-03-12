import type { AppMutationOptions } from '@/types/react-query'
import type { LoginPayload, LoginResponse } from '../../../../../packages/utils/schema'
import { $api } from '@/lib/http-client'
import { useMutation } from '@tanstack/react-query'

export function useMutationLogin(mutationOptions?: AppMutationOptions<LoginResponse, LoginPayload>) {
    return useMutation({
        ...mutationOptions,
        mutationFn: async (payload: LoginPayload) => $api.post('/v1/auth/login', payload),
    })
}

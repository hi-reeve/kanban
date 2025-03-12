import type { AppMutationOptions } from '@/types/react-query'
import type { RegisterPayload } from '@app/utils/schema'
import { $api } from '@/lib/http-client'
import { useMutation } from '@tanstack/react-query'

export function useMutationRegister(mutationOptions?: AppMutationOptions<boolean, RegisterPayload>) {
    return useMutation({
        ...mutationOptions,
        mutationFn: async (payload: RegisterPayload) => $api.post('/v1/auth/register', payload),
    })
}

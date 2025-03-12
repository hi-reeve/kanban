import type { UseMutationOptions } from '@tanstack/react-query'
import type { AxiosError, AxiosResponse } from 'axios'

export type AppMutationOptions<TResponse, TData, TError = { message: string }> = UseMutationOptions<AxiosResponse<TResponse>, AxiosError<TError>, TData>

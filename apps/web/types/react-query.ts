import type { UseMutationOptions, UseQueryOptions } from '@tanstack/react-query'
import type { AxiosError, AxiosResponse } from 'axios'

export type AppMutationOptions<TResponse, TData, TError = { message: string }> = UseMutationOptions<AxiosResponse<TResponse>, AxiosError<TError>, TData>


export type AppQueryOptions<TResponse> = Omit<UseQueryOptions<TResponse>,'queryKey'>
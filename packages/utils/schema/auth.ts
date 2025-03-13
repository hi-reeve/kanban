import { z } from 'zod'
import { ROLE_ENUM } from '../types'
import { userResponseSchema } from './user'

export const loginSchema = z.object({
    username: z.string(),
    password: z.string(),
})

export type LoginPayload = z.infer<typeof loginSchema>

export const registerSchema = z.object({
    username: z.string(),
    name: z.string(),
    password: z.string(),
    role: z.optional(z.nativeEnum(ROLE_ENUM)),
})

export type RegisterPayload = z.infer<typeof registerSchema>

export const loginResponseSchema = z.object({
    token: z.string(),
    user: userResponseSchema,
})

export type LoginResponse = z.infer<typeof loginResponseSchema>

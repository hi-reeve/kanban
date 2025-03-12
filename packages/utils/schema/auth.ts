import { ROLE_ENUM } from '../types'
import { z } from 'zod'

export const loginSchema = z.object({
    username: z.string(),
    password: z.string(),
})

export type LoginPayload = z.infer<typeof loginSchema>

export const registerSchema = z.object({
    username: z.string(),
    password: z.string(),
    role: z.optional(z.nativeEnum(ROLE_ENUM)),
})

export type RegisterPayload = z.infer<typeof registerSchema>

export const loginResponseSchema = z.object({
    token: z.string(),
})

export type LoginResponse = z.infer<typeof loginResponseSchema>

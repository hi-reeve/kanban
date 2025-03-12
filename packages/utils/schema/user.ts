import { z } from "zod";
import { ROLE_ENUM } from "../types";

export const userResponseSchema = z.object({
	id: z.string(),
	username: z.string(),
	role: z.nativeEnum(ROLE_ENUM),
})

export type UserResponse = z.infer<typeof userResponseSchema>
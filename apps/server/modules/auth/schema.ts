import { z } from "zod";
import { ROLE_ENUM } from "@app/types";
export const loginSchema = z.object({
	username: z.string(),
	password: z.string(),
});

export const registerSchema = z.object({
	username: z.string(),
	password: z.string(),
	role: z.optional(z.nativeEnum(ROLE_ENUM)),
});

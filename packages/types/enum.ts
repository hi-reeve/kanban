
export const ROLE_ENUM = {
	ADMIN: "admin",
	USER: "user",
} as const

export const PRIORITY_ENUM = {
	LOW: "low",
	MEDIUM: "medium",
	HIGH: "high",
} as const

export const STATUS_ENUM = {
	TO_DO: "to_do",
	IN_PROGRESS: "in_progress",
	DONE: "done",
} as const

export type RoleEnum = typeof ROLE_ENUM[keyof typeof ROLE_ENUM]
export type PriorityEnum = typeof PRIORITY_ENUM[keyof typeof PRIORITY_ENUM]
export type StatusEnum = typeof STATUS_ENUM[keyof typeof STATUS_ENUM]


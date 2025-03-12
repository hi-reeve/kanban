import { SORT_DIRECTION } from '../../../../packages/utils/types'
import { z } from 'zod'

export const createTaskSchema = z.object({
    title: z.string(),
    description: z.string(),
    priority: z.number(),
    due_date: z.number(),
    status: z.string(),
    users: z.array(z.string()),
})
export type CreateTaskDto = z.infer<typeof createTaskSchema>

export const updateTaskSchema = z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    priority: z.number().optional(),
    due_date: z.number().optional(),
    status: z.string().optional(),
    users: z.array(z.string()).optional(),
    is_done: z.boolean().optional(),
})
export type UpdateTaskDto = z.infer<typeof updateTaskSchema>

export const idTaskSchema = z.object({
    id: z.string(),
})

export const taskFilterSchema = z.object({
    title: z.string().optional(),
    priority: z.coerce.number().optional(),
    due_date: z.tuple([z.coerce.number(), z.coerce.number()]).optional(),
    assignee: z.array(z.string()).or(z.string()).optional(),
    sort_by: z.string().optional(),
    sort_direction: z.nativeEnum(SORT_DIRECTION).optional(),
})
export type TaskFilter = z.infer<typeof taskFilterSchema>

import { createTaskSchema, idTaskSchema, taskFilterSchema, updateTaskSchema } from '@app/utils/schema'
import express from 'express'
import { authMiddleware } from '../../middleware/auth'
import { validateData } from '../../middleware/validation'
import * as taskController from './controller'

export const router = express.Router()
router.use(authMiddleware)

router.get('/', validateData(taskFilterSchema, 'query'), taskController.getAllTasks)
router.get('/:id', validateData(idTaskSchema, 'params'), taskController.getTask)
router.post('/', validateData(createTaskSchema), taskController.createTask)
router.put('/:id', validateData(idTaskSchema, 'params'), validateData(updateTaskSchema, 'body'), taskController.updateTask)
router.delete('/:id', validateData(idTaskSchema, 'params'), taskController.deleteTask)

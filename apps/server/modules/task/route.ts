import express, { Request, Response } from "express"
import { validateData } from "../../middleware/validation"
import { createTaskSchema, idTaskSchema, taskFilterSchema, updateTaskSchema } from "./schema"
import * as taskController from "./controller"
import { authMiddleware } from "../../middleware/auth"
export const router = express.Router()
router.use(authMiddleware)

router.get("/", validateData(taskFilterSchema, 'query'), taskController.getAllTasks)
router.get("/:id", validateData(idTaskSchema, 'params'), taskController.getTask)
router.post("/", validateData(createTaskSchema,), taskController.createTask)
router.patch("/:id", validateData(idTaskSchema, 'params'), validateData(updateTaskSchema, 'body'), taskController.updateTask)
router.delete("/:id", validateData(idTaskSchema, 'params'), taskController.deleteTask)
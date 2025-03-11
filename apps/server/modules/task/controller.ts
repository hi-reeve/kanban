import { TaskFilter } from "./schema"
import { Request, Response } from 'express'
import * as taskModel from './model'
export const getAllTasks = async (req: Request<{}, {}, {}, TaskFilter>, res: Response) => {
	const filter = req.query

	const task = await taskModel.findAll(filter)
	res.json({
		data: task
	})
}

export const getTask = async (req: Request, res: Response) => {
	const id = req.params.id
	const task = await taskModel.findOne(id)
	res.json({
		data: task
	})
}

export const createTask = async (req: Request, res: Response) => {
	const task = req.body
	const newTask = await taskModel.store(task)
	res.json({
		data: newTask
	})
}

export const updateTask = async (req: Request, res: Response) => {
	const id = req.params.id
	const task = req.body
	const updatedTask = await taskModel.update(id, task)
	res.json({
		data: updatedTask
	})
}

export const deleteTask = async (req: Request, res: Response) => {
	const id = req.params.id
	const deletedTask = await taskModel.destroy(id)
	res.json({
		data: deletedTask
	})
}
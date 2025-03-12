import type { Request, Response } from 'express'
import type { TaskFilter } from './schema'
import * as taskModel from './model'

export async function getAllTasks(req: Request<{}, {}, {}, TaskFilter>, res: Response) {
    const filter = req.query

    const task = await taskModel.findAll(filter)
    res.json({
        data: task,
    })
}

export async function getTask(req: Request, res: Response) {
    const id = req.params.id
    const task = await taskModel.findOne(id)
    res.json({
        data: task,
    })
}

export async function createTask(req: Request, res: Response) {
    const task = req.body
    const newTask = await taskModel.store(task)
    res.json({
        data: newTask,
    })
}

export async function updateTask(req: Request, res: Response) {
    const id = req.params.id
    const task = req.body
    const updatedTask = await taskModel.update(id, task)
    res.json({
        data: updatedTask,
    })
}

export async function deleteTask(req: Request, res: Response) {
    const id = req.params.id
    const deletedTask = await taskModel.destroy(id)
    res.json({
        data: deletedTask,
    })
}

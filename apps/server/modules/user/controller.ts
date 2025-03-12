import type { Request, Response } from 'express'
import * as userModel from './model'

export async function getUsers(_req: Request, res: Response) {
    const users = await userModel.findAll()
    res.json({
        data: users,
    })
}

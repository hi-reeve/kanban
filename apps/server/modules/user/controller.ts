import { Request, Response } from 'express'
import * as userModel from './model'
export const getUsers = async (_req: Request, res: Response) => {
	const users = await userModel.findAll()
	res.json({
		data: users
	})
}
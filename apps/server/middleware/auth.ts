import type { NextFunction, Request, Response } from 'express'
import type { AuthenticatedRequest } from '../types/request'
import jwt from 'jsonwebtoken'
import { ERROR_MESSAGE } from '@app/utils/string'
import { StatusCodes } from 'http-status-codes'

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
	const token = req.headers.authorization?.split(' ')[1]

	if (!token) {
		res.status(StatusCodes.UNAUTHORIZED).json({ message: ERROR_MESSAGE.AUTH.MISSING_TOKEN })
	}

	try {
		const decoded = jwt.verify(token!, process.env.JWT_SECRET!);

		(req as AuthenticatedRequest).token = decoded

		next()
	}
	catch {
		res.status(StatusCodes.FORBIDDEN).json({ message: ERROR_MESSAGE.AUTH.INVALID_TOKEN })
	}
}

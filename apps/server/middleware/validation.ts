import type { NextFunction, Request, Response } from 'express'
import type { z } from 'zod'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'

import { ZodError } from 'zod'
import { ERROR_MESSAGE } from '@app/utils/string'

export type ValidationType = 'body' | 'query' | 'params'
export function validateData(schema: z.ZodObject<any, any>, type: ValidationType = 'body') {
	return (req: Request, res: Response, next: NextFunction) => {
		try {
			schema.parse(req[type])
			next()
		}
		catch (error) {
			if (error instanceof ZodError) {
				const errorMessages = error.errors.map((issue: any) => ({
					message: `${issue.path.join('.')} is ${issue.message}`,
				}))
				res.status(StatusCodes.BAD_REQUEST).json({ error: ERROR_MESSAGE.GENERAL.INVALID_DATA, details: errorMessages })
			}
			else {
				res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: ReasonPhrases.INTERNAL_SERVER_ERROR })
			}
		}
	}
}

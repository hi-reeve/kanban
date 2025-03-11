import { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';

import { StatusCodes } from 'http-status-codes';

export type ValidationType = 'body' | 'query' | 'params';
export function validateData(schema: z.ZodObject<any, any>, type: ValidationType = 'body') {
	return (req: Request, res: Response, next: NextFunction) => {
		try {
			schema.parse(req[type]);
			next();
		} catch (error) {
			if (error instanceof ZodError) {
				const errorMessages = error.errors.map((issue: any) => ({
					message: `${issue.path.join('.')} is ${issue.message}`,
				}))
				res.status(StatusCodes.BAD_REQUEST).json({ error: 'Invalid data', details: errorMessages });
			} else {
				res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
			}
		}
	};
}
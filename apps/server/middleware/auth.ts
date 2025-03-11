import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { AuthenticatedRequest } from '../types/request';


export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
	const token = req.headers['authorization']?.split(' ')[1];


	if (!token) {
		res.status(401).json({ message: "Access token is missing or invalid" });
	}



	try {

		const decoded = jwt.verify(token!, process.env.JWT_SECRET!);

		(req as AuthenticatedRequest).token = decoded;

		next();
	} catch (error) {
		res.status(403).json({ message: "Invalid or expired token" });
	}
};


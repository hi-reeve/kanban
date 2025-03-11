import { Request, Response } from "express";
import * as userModel from "./model";
import argon2 from "argon2";
import jwt, { JwtPayload } from "jsonwebtoken";
import { AuthenticatedRequest } from "../../types/request";

export const login = async (req: Request, res: Response) => {
	const { username, password } = req.body;

	const user = await userModel.findByUsername(username);

	if (!user) {
		res.status(401).json({ message: "Invalid username or password" });
		return;
	}

	const passwordValid = await argon2.verify(user.password, password);

	if (!passwordValid)
		res.status(401).json({ message: "Invalid username or password" });

	const token = jwt.sign(
		{ username: user.username, role: user.role },
		process.env.JWT_SECRET!,
		{
			expiresIn: "2h",
			subject: user!.id,
		}
	);

	res.json({ token });
};

export const register = async (req: Request, res: Response) => {
	const { username, password } = req.body;

	const hashedPassword = await argon2.hash(password);

	const user = await userModel.findByUsername(username);

	if (user) res.status(409).json({ message: "User already exists" });

	await userModel.store({ username, password: hashedPassword });

	res.status(201).json({ message: "User created successfully" });
};

export const me = async (req: Request, res: Response) => {
	const request = req as AuthenticatedRequest;
	if (!request.token || !request.token.sub)
		res.status(403).json({ message: "Not authenticated" });

	const user = await userModel.findById((request.token as JwtPayload).sub!);

	res.json(user);
};

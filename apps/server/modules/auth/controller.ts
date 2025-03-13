import { ERROR_MESSAGE } from '@app/utils/string'
import argon2 from 'argon2'
import type { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import type { JwtPayload } from 'jsonwebtoken'
import jwt from 'jsonwebtoken'
import type { AuthenticatedRequest } from '../../types/request'
import * as userModel from './model'

export async function login(req: Request, res: Response) {
    const { username, password } = req.body

    const user = await userModel.findByUsername(username)

    if (!user) {
        res.status(StatusCodes.UNAUTHORIZED).json({ message: ERROR_MESSAGE.AUTH.INVALID_CREDENTIALS })
        return
    }

    const passwordValid = await argon2.verify(user.password, password)

    if (!passwordValid)
        res.status(StatusCodes.UNAUTHORIZED).json({ message: ERROR_MESSAGE.AUTH.INVALID_CREDENTIALS })

    const token = jwt.sign(
        { username: user.username, role: user.role },
        process.env.JWT_SECRET!,
        {
            expiresIn: '2h',
            subject: user!.id,
        },
    )

    res.json({
        token,
        user: {
            id: user.id,
			username: user.username,
			name: user.name,
            role: user.role,
        },
    })
}

export async function register(req: Request, res: Response) {
    const { username,name, password } = req.body

    const hashedPassword = await argon2.hash(password)

    const user = await userModel.findByUsername(username)

    if (user)
        res.status(StatusCodes.CONFLICT).json({ message: ERROR_MESSAGE.USER.EXISTS })

    await userModel.store({ username, name, password: hashedPassword })

    res.status(StatusCodes.CREATED).json({ message: 'User created successfully' })
}

export async function me(req: Request, res: Response) {
    const request = req as AuthenticatedRequest
    if (!request.token || !request.token.sub)
        res.status(StatusCodes.FORBIDDEN).json({ message: ERROR_MESSAGE.AUTH.NOT_AUTHENTICATED })

    const user = await userModel.findById((request.token as JwtPayload).sub!)

    res.json(user)
}

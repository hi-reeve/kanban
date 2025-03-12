import { loginSchema, registerSchema } from '../../../../packages/utils/schema'

import express from 'express'

import { authMiddleware } from '../../middleware/auth'
import { validateData } from '../../middleware/validation'
import * as authController from './controller'

export const router = express.Router()

router.post('/login', validateData(loginSchema), authController.login)
router.post('/register', validateData(registerSchema), authController.register)
router.get('/me', authMiddleware, authController.me)

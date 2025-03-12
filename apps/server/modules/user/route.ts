import express from 'express'

import * as userController from './controller'

export const router = express.Router()

router.get('/', userController.getUsers)

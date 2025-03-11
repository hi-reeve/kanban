import express from "express"
export const router = express.Router()

import * as userController from "./controller"

router.get("/", userController.getUsers)
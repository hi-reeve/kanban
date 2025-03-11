import express from "express";
import { Application } from "express";

import cors from "cors";
import dotenv from "dotenv";

import { router as authRoute } from './modules/auth/route'
import { router as taskRoute } from './modules/task/route'
import { router as userRoute } from "./modules/user/route";
const app: Application = express();

dotenv.config();

app.use(cors());
app.use(express.json());
app.use(
	express.urlencoded({
		extended: true,
	})
);


const PORT: number = Number(process.env.PORT) || 8000;

app.get("/", (_req, res) => {
	res.json({ message: "Hello World" });
});

const appRouter = express.Router()


appRouter.use("/tasks", taskRoute);
appRouter.use("/auth", authRoute);
appRouter.use("/users", userRoute);

app.use("/api/v1", appRouter)

app.listen(PORT, async () => {
	console.log(`🗄️ Server Fire on http:localhost//${PORT}`);
});
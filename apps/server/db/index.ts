import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { taskSchema, userSchema, userTaskSchema } from './schema'
export const db = drizzle(process.env.DATABASE_URL!, {
	schema: {
		...userSchema,
		...taskSchema,
		...userTaskSchema
	}
});





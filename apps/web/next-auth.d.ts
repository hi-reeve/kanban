import "next-auth";
import "next-auth/jwt";

type UserData = {
	id: string;
	token: string;
	name: string;
	role: string;
}
declare module "next-auth" {
	interface User extends UserData { }
	interface Session {
		user: UserData
	}
}

declare module "next-auth/jwt" {
	interface JWT {
		user : UserData
	}
}
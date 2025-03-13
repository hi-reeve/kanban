"use client"
import { Button } from "@/components/ui/button";
import { ROLE_ENUM } from "@app/utils/types";
import { Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function TaskLayout({
	children,
	modal,
}: Readonly<{
	children: React.ReactNode;
	modal: React.ReactNode;
}>) {

	const {data} = useSession()

	return (
		<>
			<div className="flex items-center justify-between">
				<h1 className="text-2xl md:text-3xl font-bold">Kanban Dashboard</h1>
				{data?.user.role === ROLE_ENUM.ADMIN && <Button asChild>
					<Link href='/dashboard/task/create'>
						<Plus />
						<span>Add New Task</span>
					</Link>
				</Button>}
			</div>
			{modal}
			{children}
		</>
	);
}
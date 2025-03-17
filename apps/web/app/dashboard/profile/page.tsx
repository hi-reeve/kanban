"use client"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from "@/components/ui/card"
import { useQueryProfile } from '@/services/auth/query/useQueryProfile'
const page = () => {
	const { data } = useQueryProfile()
	return (
		<div className="max-w-lg">
			<Card>
				<CardHeader>
					<CardTitle>Profile</CardTitle>
					<CardDescription>My Profile</CardDescription>
				</CardHeader>
				<CardContent>
				<div className="flex flex-col gap-2">
					<p className="font-semibold">Name:</p>
					<p>{data?.data.name}</p>
					<p className="font-semibold">Role:</p>
					<p>{data?.data.role}</p>
				</div>
				</CardContent>
				
			</Card>
		</div>
	)
}

export default page
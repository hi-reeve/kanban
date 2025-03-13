"use client"
import ManageForm from "@/components/kanban/manage-form"
import { Modal } from "@/components/modal"
import { DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useQueryGetTask } from "@/services/task/query/useQueryGetTask"
import { useParams } from "next/navigation"

const page =  () => {
	const { id } =  useParams<{id : string}>()

	const { data } = useQueryGetTask(id)
	return (
		<Modal>
			<DialogHeader>
				<DialogTitle className="font-bold">Edit Task</DialogTitle>
				<DialogDescription className="hidden">
					This is form create
				</DialogDescription>
			</DialogHeader>
			<ManageForm task={data?.data}/>
		</Modal>
	)
}

export default page
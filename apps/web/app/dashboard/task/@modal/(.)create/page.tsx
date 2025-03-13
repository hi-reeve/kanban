import ManageForm from "@/components/kanban/manage-form"
import { Modal } from "@/components/modal"
import { DialogDescription, DialogHeader } from "@/components/ui/dialog"
import { DialogTitle } from "@radix-ui/react-dialog"
export default function Page() {
	return (
		<Modal>
			<DialogHeader>
				<DialogTitle className="font-bold">Create New Task</DialogTitle>
				<DialogDescription className="hidden">
					This is form create
				</DialogDescription>
			</DialogHeader>
			<ManageForm />
		</Modal>
	)
}

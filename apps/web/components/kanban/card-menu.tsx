"use client"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuPortal,
	DropdownMenuSeparator,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { priorityOptions, statusArray } from "@/lib/utils"
import { useMutationDeleteTask } from "@/services/task/mutation/useMutationDeleteTask"
import { useMutationUpdateTask } from "@/services/task/mutation/useMutationUpdateTask"
import { useDialogStore } from "@/stores/dialog"
import { ITaskListResponse } from "@/types/task"
import { ROLE_ENUM } from "@app/utils/types"
import { useQueryClient } from "@tanstack/react-query"
import { Check, EllipsisVerticalIcon } from "lucide-react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Button } from "../ui/button"

type Props = {
	task: ITaskListResponse
}
const CardMenu = ({ task }: Props) => {
	const { data: session } = useSession()
	const router = useRouter()
	const queryClient = useQueryClient()
	const state = useDialogStore(state => state)
	const { mutateAsync: mutateUpdateTaskAsync } = useMutationUpdateTask()
	const { mutateAsync: mutateDeleteTaskAsync } = useMutationDeleteTask()
	const handleUpdateOnClick = async (key: keyof ITaskListResponse, value: any) => {

		let loadingText = 'Updating task'
		let successText = 'Task updated successfully'

		switch (key) {
			case 'is_done':
				loadingText = `Marking task as ${value ? 'done' : 'not done'}`
				successText = `Task marked as ${value ? 'done' : 'not done'}`
				break
			case 'priority':
				loadingText = `Updating task priority`
				successText = `Task priority updated`
				break
			case 'status':
				loadingText = `Updating task status`
				successText = `Task status updated`
				break
			default:
				break;
		}
		toast.promise(
			mutateUpdateTaskAsync({
				id: task.id,
				payload: {
					[key]: value
				}
			}),
			{
				loading: loadingText,
				success: () => {
					queryClient.invalidateQueries()
					return successText
				}
			}
		)


	}

	const handleEditTask = () => {
		router.push(`/dashboard/task/${task.id}/edit`)
	}

	const handleDeleteTask = () => {
		state.open({
			message: <span>
				Are you sure you want to delete task <span className="font-bold">{task.title}</span>?
			</span>,
			onConfirmation: () => {
				toast.promise(mutateDeleteTaskAsync(task.id), {
					loading: 'Deleting task',
					success: () => {
						queryClient.invalidateQueries()
						state.close()
						return 'Task deleted successfully'
					},

				})
			}
		})
	}

	const handleViewTask = () => {
		router.push(`/dashboard/task/${task.id}`)
	}
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>

				<Button size='icon' variant='ghost' className="ml-auto cursor-pointer">
					<EllipsisVerticalIcon />
				</Button>

			</DropdownMenuTrigger>
			<DropdownMenuContent >
				<DropdownMenuLabel>{task.title}</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem onClick={handleViewTask}>
						View Tasks
					</DropdownMenuItem>
					<DropdownMenuItem onClick={handleEditTask}>
						Edit Tasks
					</DropdownMenuItem>
					{session?.user.role === ROLE_ENUM.ADMIN && <DropdownMenuItem onClick={handleDeleteTask}>
						<span className="text-red-500">
							Delete Task
						</span>
					</DropdownMenuItem>}
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem onClick={() => handleUpdateOnClick('is_done', !task.is_done)}>
						Mark as {task.is_done ? 'Undone' : 'Done'}
					</DropdownMenuItem>
					<DropdownMenuSub>
						<DropdownMenuSubTrigger>Status</DropdownMenuSubTrigger>
						<DropdownMenuPortal>
							<DropdownMenuSubContent>
								{statusArray.map(status =>

									<DropdownMenuItem key={status.value} onClick={() => handleUpdateOnClick('status', status.value)}>
										<span>{status.label}</span>
										{task.status === status.value && <Check className="ml-auto" />}
									</DropdownMenuItem>

								)}
							</DropdownMenuSubContent>
						</DropdownMenuPortal>
					</DropdownMenuSub>
					<DropdownMenuSub>
						<DropdownMenuSubTrigger>Priority</DropdownMenuSubTrigger>
						<DropdownMenuPortal>
							<DropdownMenuSubContent>
								{priorityOptions.map(priority =>
									<DropdownMenuItem key={priority.value} onClick={() => handleUpdateOnClick('priority', priority.value)}>
										<span>{priority.label}</span>
										{task.priority === priority.value && <Check className="ml-auto" />}

									</DropdownMenuItem>
								)}
							</DropdownMenuSubContent>
						</DropdownMenuPortal>
					</DropdownMenuSub>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default CardMenu
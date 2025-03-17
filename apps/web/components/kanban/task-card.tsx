import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip"
import { initialGenerator, priorityMapper } from "@/lib/utils"
import { ITaskListResponse } from "@/types/task"
import { ROLE_ENUM } from "@app/utils/types"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { computed } from "@preact/signals-react"
import { cva } from "class-variance-authority"
import { GripVertical } from "lucide-react"
import { useSession } from "next-auth/react"
import { useCallback } from "react"
import { Avatar, AvatarFallback, AvatarGroup, AvatarImage } from "../ui/avatar"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card"
import CardMenu from "./card-menu"
type Props = {
	task: ITaskListResponse
	isOverlay?: boolean
}


const TaskCard = ({ task, isOverlay }: Props) => {
	const { data: session } = useSession()
	const priority = computed(() => priorityMapper(task.priority))
	const {
		setNodeRef,
		listeners,
		transform,
		transition,
		isDragging,

	} = useSortable({
		id: task.id,
		data: {
			type: 'task',
			task
		},
	});

	const style = {
		transition,
		transform: CSS.Translate.toString(transform),
	};

	const variants = cva('', {
		variants: {
			dragging: {
				over: "ring opacity-30 z-10",
				overlay: "ring ring-sidebar",
			},
		},
	});

	const renderCardMenu = useCallback(() => {
		const userIds = task.assignees.map(assignee => assignee.id)
		if ((session?.user.role === ROLE_ENUM.USER && userIds.includes(session?.user.id)) || session?.user.role === ROLE_ENUM.ADMIN) return <CardMenu task={task} />
	}, [session?.user.role, session?.user.id])

	return (
		<Card ref={setNodeRef}
			style={style}
			className={variants({
				dragging: isOverlay ? 'overlay' : isDragging ? 'over' : undefined,
			})}>
			<CardHeader>
				<CardTitle className="flex items-center">
					<Button
						variant={"ghost"}
						{...listeners}
						className="h-auto cursor-grab hover:bg-transparent pl-0! md:block hidden"
					>
						<span className="sr-only">Move task</span>
						<GripVertical />
					</Button>
					<span>{task.title}</span>
					{renderCardMenu()}
				</CardTitle>
				<CardContent className="px-0 mt-4">
					<p className="truncate">{task.description}</p>

				</CardContent>
				<CardFooter className="mt-4 px-0">
					<div className="flex items-center justify-between w-full">
						<AvatarGroup>
							{task.assignees.map(assignee => (
								<TooltipProvider key={assignee.id}>
									<Tooltip>
										<TooltipTrigger>

											<Avatar className="h-8 w-8 rounded-full">
												<AvatarImage alt={assignee.name} />
												<AvatarFallback className="rounded-lg">{initialGenerator(assignee.name)}</AvatarFallback>
											</Avatar>
										</TooltipTrigger>
										<TooltipContent>
											<p>{assignee.name}</p>
										</TooltipContent>
									</Tooltip>
								</TooltipProvider>
							))}
						</AvatarGroup>
						<Badge variant={priority.value.variant} >
							{priority.value.label}
						</Badge>

					</div>
				</CardFooter>
			</CardHeader>
		</Card>
	)
}

export default TaskCard
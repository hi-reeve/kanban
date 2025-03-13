import { initialGenerator, priorityMapper } from "@/lib/utils"
import { ITaskListResponse } from "@/types/task"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { computed } from "@preact/signals-react"
import { cva } from "class-variance-authority"
import { EllipsisVerticalIcon, GripVertical } from "lucide-react"
import { Avatar, AvatarFallback, AvatarGroup, AvatarImage } from "../ui/avatar"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card"
type Props = {
	task: ITaskListResponse
}


const TaskCard = ({ task }: Props) => {
	const priority = computed(() => priorityMapper(task.priority))
	const {
		setNodeRef,
		attributes,
		listeners,
		transform,
		transition,
	} = useSortable({
		id: task.id,
		data: {
			task
		},
		attributes: {
			roleDescription: `Task: ${task.title}`,
		},
	});

	const style = {
		transition,
		transform: CSS.Translate.toString(transform),
	};

	const variants = cva("", {
		variants: {
			dragging: {
				over: "ring opacity-30",
				overlay: "ring ring-primary",
			},
		},
	});

	return (
		<Card ref={setNodeRef}
			style={style}
			className={variants({
				dragging: "overlay",
			})}>
			<CardHeader>
				<CardTitle className="flex items-center">
					<Button
						variant={"ghost"}
						{...attributes}
						{...listeners}
						className="h-auto cursor-grab hover:bg-transparent pl-0!"
					>
						<span className="sr-only">Move task</span>
						<GripVertical />
					</Button>
					<span>{task.title}</span>
					<Button size='icon' variant='ghost' className="ml-auto cursor-pointer">
						<EllipsisVerticalIcon />
					</Button>
				</CardTitle>
				<CardContent className="px-0 mt-4">
					<p className="truncate">{task.description}</p>

				</CardContent>
				<CardFooter className="mt-4 px-0">
					<div className="flex items-center justify-between w-full">
						<AvatarGroup>
							{task.assignees.map(assignee => (
								<Avatar className="h-8 w-8 rounded-full">
									<AvatarImage alt={assignee.name} />
									<AvatarFallback className="rounded-lg">{initialGenerator(assignee.name)}</AvatarFallback>
								</Avatar>
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
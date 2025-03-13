import {
	Card,
	CardContent,
	CardHeader,
	CardTitle
} from "@/components/ui/card"
import { ITaskListResponse } from "@/types/task"
import { StatusEnum } from "@app/utils/types"
import { SortableContext, useSortable } from '@dnd-kit/sortable'
import { CSS } from "@dnd-kit/utilities"
import { computed } from "@preact/signals-react"
import { cva } from "class-variance-authority"
import TaskCard from "./TaskCard"
type StatusOption = {
	label: string
	value: StatusEnum
}
type Props = {

	status: StatusOption,
	tasks: ITaskListResponse[]
}
export const BoardColumn = ({ status, tasks }: Props) => {
	const tasksIds = computed(() => tasks.map(task => task.id))
	const {
		setNodeRef,
		transform,
		transition,
	} = useSortable({
		id: status.value,
		data: {


		},
		attributes: {
			roleDescription: `Status: ${status.label}`,
		},
	});
	const style = {
		transition,
		transform: CSS.Translate.toString(transform),
	};
	const variants = cva(
		"",
		{
		  variants: {
			dragging: {
			  default: "border border-transparent",
			  over: "ring opacity-30",
			  overlay: "ring ring-primary",
			},
		  },
		}
	  );
	
	return (
		<Card ref={setNodeRef}  style={style}
		className={variants({
		  dragging: "overlay"
		})}>
			<CardHeader >
				<CardTitle className="flex items-center">
					<span>{status.label}</span>
				</CardTitle>
			</CardHeader>
			<CardContent>
				<SortableContext items={tasksIds.value}>
					<div className="space-y-4">
					{tasks.map(task => (
						<>
							{task.status === status.value && <TaskCard task={task} />}
						</>
					))}

					</div>
				</SortableContext>
			</CardContent>
		</Card>
	)
}

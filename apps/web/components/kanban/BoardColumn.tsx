import {
	Card,
	CardContent,
	CardHeader,
	CardTitle
} from "@/components/ui/card"
import { ITaskListResponse } from "@/types/task"
import { StatusEnum } from "@app/utils/types"
import { rectSortingStrategy, SortableContext, useSortable } from '@dnd-kit/sortable'
import { CSS } from "@dnd-kit/utilities"
import { cva } from "class-variance-authority"
import { useMemo } from "react"
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
	const tasksIds = useMemo(() => tasks.map(task => task.id), [tasks])
	const {
		setNodeRef,
		transform,
		transition,
	} = useSortable({
		id: status.value,
		data: {
			type: 'column',
			id: status.value
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
					overlay: "ring ring-sidebar",
				},
			},
		}
	);
	return (
		<Card ref={setNodeRef} style={style}
			className={variants({
				dragging: "overlay"
			})}>
			<CardHeader >
				<CardTitle className="flex items-center">
					<span>{status.label}</span>
				</CardTitle>
			</CardHeader>
			<CardContent>
				<SortableContext items={tasksIds} id={status.value} strategy={rectSortingStrategy}>
					<div className="space-y-4">
						{tasks.map(task => (
							<TaskCard key={task.id} task={task} />
						))}

					</div>
				</SortableContext>
			</CardContent>
		</Card>
	)
}

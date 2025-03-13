"use client"
import { BoardColumn } from "@/components/kanban/BoardColumn"
import { useQueryGetAllTasks } from "@/services/task/query/useQueryGetAllTasks"
import { ITaskListResponse } from "@/types/task"
import { STATUS_ENUM } from "@app/utils/types"
import { DndContext, DragEndEvent, DragStartEvent, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove } from "@dnd-kit/sortable"
import { useEffect, useState } from "react"
import { titleCase } from "scule"

const statusArray = Object.values(STATUS_ENUM).map((value) => ({
	label: titleCase(value).toUpperCase(),
	value
}))

export type StatusColumns = typeof statusArray[number]
export default function Page() {
	const { params, data } = useQueryGetAllTasks({
		staleTime: 0
	})
	const [columns, setColumns] = useState<StatusColumns[]>(statusArray)

	const [activeColumn, setActiveColumn] = useState<StatusColumns | null>(null)
	const [activeTask, setActiveTask] = useState<ITaskListResponse | null>(null)
	const [tasks, setTasks] = useState<ITaskListResponse[]>([])

	useEffect(() => {
		if (data?.data) {
			setTasks(data.data)
		}
	},[data?.data])

	const sensors = useSensors(
		useSensor(MouseSensor),
		useSensor(TouchSensor),
	);
	return (
		<div className="grid grid-cols-3 w-full gap-8 h-full">

			<DndContext sensors={sensors} onDragStart={onDragStart} onDragEnd={onDragEnd}>

				{columns.map(status => (
					<BoardColumn key={status.value} status={status} tasks={tasks} />
				))}

			</DndContext>
		</div>
	)

	function onDragStart(event: DragStartEvent) {
		const data = event.active.data.current as ITaskListResponse;
		setActiveTask(data)

	}
	function onDragEnd(event: DragEndEvent) {
		setActiveTask(null)
		const { active, over } = event;
		if (!over) return;

		const activeId = active.id;
		const overId = over.id;

		if (activeId === overId) return

		const overData = over.data.current;

		if (overData?.type === 'task') {
			setTasks((oldTasks) => {
				const activeTaskIndex = oldTasks.findIndex((task) => task.id === activeId);
				const overTaskIndex = oldTasks.findIndex((task) => task.id === overId);
				return arrayMove(oldTasks, activeTaskIndex, overTaskIndex)
			})
		}


		


	}

}

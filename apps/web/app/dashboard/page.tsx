"use client"
import { BoardColumn } from "@/components/kanban/BoardColumn"
import { useMutationUpdateTask } from "@/services/task/mutation/useMutationUpdateTask"
import { queryTaskKeys } from "@/services/task/query/queryKey"
import { useQueryGetAllTasks } from "@/services/task/query/useQueryGetAllTasks"
import { ITaskListResponse } from "@/types/task"
import { STATUS_ENUM } from "@app/utils/types"
import { DndContext, DragEndEvent, DragOverEvent, DragStartEvent, MouseSensor, pointerWithin, TouchSensor, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { useQueryClient } from "@tanstack/react-query"
import { useEffect, useMemo, useState } from "react"
import { titleCase } from "scule"
import { toast } from "sonner"

const statusArray = Object.values(STATUS_ENUM).map((value) => ({
	label: titleCase(value).toUpperCase(),
	value
}))

export type StatusColumns = typeof statusArray[number]
export default function Page() {
	const { params, data } = useQueryGetAllTasks({
		staleTime: 0
	})
	const queryClient = useQueryClient()
	const { mutate: mutateUpdateTask } = useMutationUpdateTask({
		onSuccess: () => {
			toast.success('Task updated successfully')
			queryClient.invalidateQueries({
				queryKey: queryTaskKeys.list(params)
			})
		}
	})
	const [columns, setColumns] = useState<StatusColumns[]>(statusArray)
	const columnsId = useMemo(() => columns.map((column) => column.value), [columns])

	const [activeColumn, setActiveColumn] = useState<StatusColumns | null>(null)
	const [activeTask, setActiveTask] = useState<ITaskListResponse | null>(null)
	const [tasks, setTasks] = useState<ITaskListResponse[]>([])

	useEffect(() => {
		if (data?.data) {
			setTasks(data.data)
		}
	}, [data?.data])

	const sensors = useSensors(
		useSensor(MouseSensor),
		useSensor(TouchSensor),
	);
	return (
		<div className="grid grid-cols-3 w-full gap-8 h-full">

			<DndContext
				sensors={sensors}
				collisionDetection={pointerWithin}
				onDragEnd={onDragEnd}
				onDragStart={onDragStart}
				onDragOver={onDragOver}>
				<SortableContext items={columnsId} strategy={verticalListSortingStrategy}>
					{columns.map(status => (
						<BoardColumn key={status.value} status={status} tasks={tasks.filter(task => task.status === status.value)} />
					))}
				</SortableContext>

			</DndContext>
		</div>
	)

	function onDragStart(event: DragStartEvent) {
		const data = event.active.data.current as ITaskListResponse;
		setActiveTask(data)

	}

	function onDragEnd(event: DragEndEvent) {

		const { active, over } = event
		if (!over) return


		const activeData = active.data.current;
		const overData = over.data.current;


		const isActiveATask = activeData?.type === "task";
		
		if (!isActiveATask ) return


		const columnTarget = overData?.sortable?.containerId
		const isChangeColumn = activeData?.status !== overData?.sortable?.containerId
		

		if (isChangeColumn && columnTarget) {
			mutateUpdateTask({
				id: activeData.task.id,
				payload: {
					status: columnTarget
				}
			})
			
		}
		
	}

	function onDragOver(event: DragOverEvent) {
		const { active, over } = event
		if (!over) return

		const activeId = active.id;
		const overId = over.id;

		if (activeId === overId) return;

		const activeData = active.data.current;
		const overData = over.data.current;

		const isActiveATask = activeData?.type === "task";
		const isOverATask = overData?.type === "task";

		if (!isActiveATask) return

		if (isActiveATask && isOverATask) {
			setTasks((oldTask) => {
				const activeIndex = oldTask.findIndex((t) => t.id === activeId);
				const overIndex = oldTask.findIndex((t) => t.id === overId);
				const activeTask = oldTask[activeIndex];
				const overTask = oldTask[overIndex];
				if (
					activeTask &&
					overTask &&
					activeTask.status !== overTask.status
				) {
					activeTask.status = overTask.status;
					return arrayMove(tasks, activeIndex, overIndex - 1);
				}

				return arrayMove(tasks, activeIndex, overIndex);
			});
		}

		const isOverAColumn = overData?.type === "column";
		// Im dropping a Task over a column
		if (isActiveATask && isOverAColumn) {
			setTasks((tasks) => {
				const activeIndex = tasks.findIndex((t) => t.id === activeId);
				const activeTask = tasks[activeIndex];
				if (activeTask) {
					const newStatus = overId as StatusColumns["value"];
					activeTask.status = newStatus;
					return arrayMove(tasks, activeIndex, activeIndex);
				}
				return tasks;
			});
		}
	}

}

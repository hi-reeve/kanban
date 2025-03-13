"use client"
import { BoardColumn } from "@/components/kanban/board-column"
import TaskCard from "@/components/kanban/task-card"
import { statusArray } from "@/lib/utils"
import { useMutationUpdateTask } from "@/services/task/mutation/useMutationUpdateTask"
import { queryTaskKeys } from "@/services/task/query/queryKey"
import { useQueryGetAllTasks } from "@/services/task/query/useQueryGetAllTasks"
import { ITaskListResponse } from "@/types/task"
import { STATUS_ENUM } from "@app/utils/types"
import { DndContext, DragEndEvent, DragOverEvent, DragOverlay, DragStartEvent, MouseSensor, pointerWithin, TouchSensor, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { useQueryClient } from "@tanstack/react-query"
import { useEffect, useMemo, useState } from "react"
import { createPortal } from "react-dom"
import { toast } from "sonner"

const statusMap = Object.values(STATUS_ENUM)

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
	const [activeColumn, setActiveColumn] = useState<StatusColumns | null>(null)
	const [activeTask, setActiveTask] = useState<ITaskListResponse | null>(null)
	const [columns] = useState<StatusColumns[]>(statusArray)
	const columnsId = useMemo(() => columns.map((column) => column.value), [columns])

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
		<div className="grid grid-cols-1 md:grid-cols-3 w-full gap-8 h-full">
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

				{/* overlay card */}
				{typeof window !== 'undefined' && "document" in window &&
					createPortal(
						<DragOverlay>
							{activeColumn && (
								<BoardColumn
									isOverlay
									status={activeColumn}
									tasks={tasks.filter(
										(task) => task.status === activeColumn.value
									)}
								/>
							)}
							{activeTask && <TaskCard task={activeTask} isOverlay />}
						</DragOverlay>,
						document.body
					)}
			</DndContext>
		</div>
		
	)
	function onDragStart(event: DragStartEvent) {

		const data = event.active.data.current;
		if (data?.type === "column") {
			setActiveColumn(data.column);
			return;
		}

		if (data?.type === "task") {
			setActiveTask(data.task);
			return;
		}
	}

	function onDragEnd(event: DragEndEvent) {
		const { active, over } = event
		if (!over) return


		const activeData = active.data.current;
		const overData = over.data.current;


		const isActiveATask = activeData?.type === "task";
		const isColumn = overData?.type === "column";

		if (!isActiveATask) return

		if (isColumn) {
			mutateUpdateTask({
				id: activeData.task.id,
				payload: {
					status: overData.id
				}
			})
		}

		const columnTarget = overData?.sortable?.containerId
		const isChangeColumn = activeData?.status !== overData?.sortable?.containerId


		if (!statusMap.includes(columnTarget)) return

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

		if (!isActiveATask) return

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

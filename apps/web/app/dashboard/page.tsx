"use client"
import { BoardColumn } from "@/components/kanban/BoardColumn"
import { useQueryGetAllTasks } from "@/services/task/query/useQueryGetAllTasks"
import { STATUS_ENUM } from "@app/utils/types"
import { DndContext, pointerWithin } from '@dnd-kit/core'
import { titleCase } from "scule"

const statusArray = Object.values(STATUS_ENUM).map((value) => ({
	label: titleCase(value).toUpperCase(),
	value
}))
export default function Page() {
	const { params, data } = useQueryGetAllTasks()
	return (
		<div className="grid grid-cols-3 w-full gap-8 h-full">
			<DndContext collisionDetection={pointerWithin}>
			
				{statusArray.map(status => (
					<BoardColumn key={status.value}  status={status} tasks={data?.data ?? []} />
				))}
			</DndContext>
		</div>
	)
}

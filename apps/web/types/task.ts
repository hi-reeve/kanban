export type ITaskListResponse = {
	id: string
	title: string
	description : string
	priority: number
	due_date: number
	status: string
	is_done: boolean
	assignees: ITaskAssigneeResponse[]
}

export type ITaskAssigneeResponse = {
	id: string
	name: string
}
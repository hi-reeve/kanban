"use client"
import { Modal } from '@/components/modal'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { priorityMapper, statusArray } from '@/lib/utils'
import { useQueryGetTask } from '@/services/task/query/useQueryGetTask'
import { epochSecondToMillisecond } from '@app/utils/date'
import { format } from 'date-fns'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useMemo } from 'react'

const page = () => {
  const { id } = useParams<{id : string}>()
	const { data } = useQueryGetTask(id)

	const priority = useMemo(() => {
		return priorityMapper(data?.data.priority ?? 0)
	}, [data?.data.priority])
	const status = useMemo(() => {
		return statusArray.find((item) => item.value === data?.data.status)

	}, [data?.data.status])

	const dueDate = useMemo(() => {
		if (!data?.data.due_date) return '-'
		const date = epochSecondToMillisecond(data.data.due_date)
		return  format(date, "dd/MM/yyyy")
	}, [data?.data.due_date])
	return (
		<Modal>
			<DialogHeader>
				<DialogTitle className="font-bold">{data?.data.title }</DialogTitle>
				<DialogDescription className="hidden">
					This is form create
				</DialogDescription>
			</DialogHeader>

			<div className='space-y-1'>
				<p className='font-bold'>Description</p>
				<p>{data?.data.description}</p>
			</div>
			<div className='space-y-1'>
				<p className='font-bold'>Status</p>
				<p>{status?.label}</p>
			</div>
			<div className='space-y-1'>
				<p className='font-bold'>Priority</p>
				<Badge variant={priority.variant}>{priority.label}</Badge>
			</div>
			<div className='space-y-1'>
				<p className='font-bold'>Due Date</p>
				<p>{dueDate}</p>
			</div>

			<Button asChild>
				<Link href={`/dashboard/task/${id}/edit`}>Edit</Link>
			</Button>
			
		</Modal>
	)
}

export default page
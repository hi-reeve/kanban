import { cn, initialGenerator, priorityOptions } from '@/lib/utils'
import { useQueryGetAllUser } from '@/services/user/query/useQueryGetAllUser'
import { TaskFilter } from '@app/utils/schema'
import { useDebounce } from '@uidotdev/usehooks'
import { endOfDay, format, startOfDay } from 'date-fns'
import { CalendarIcon, CircleX, Search } from 'lucide-react'
import React, { Dispatch, useEffect, useState } from 'react'

import { millisecondToEpochSecond } from '@app/utils/date'
import { DateRange } from 'react-day-picker'
import { Avatar, AvatarFallback, AvatarGroup, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import { Calendar } from '../ui/calendar'
import { Input } from '../ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip'
const BoardFilter = ({ params, setParams }: {
	params: TaskFilter,
	setParams: Dispatch<TaskFilter>
}) => {
	const [priority, setPriority] = useState<string | undefined>(undefined)
	const [searchQuery, setSearchQuery] = useState('')
	const debouncedSearchQuery = useDebounce(searchQuery, 500)
	const { data: userList } = useQueryGetAllUser()
	const [date, setDate] = useState<DateRange | undefined>()
	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(e.target.value)
	}

	useEffect(() => {
		if (debouncedSearchQuery || debouncedSearchQuery === '') {
			setParams({
				...params,
				title: debouncedSearchQuery
			})
		}
	}, [debouncedSearchQuery])

	const handleFilterByAssignee = (assignee: string) => {
		if (params.assignee === assignee) {
			setParams({
				...params,
				assignee: ''
			})
			return
		}
		setParams({
			...params,
			assignee
		})
	}

	const handlePriorityFilter = (priority: string) => {
		setPriority(priority)
	}

	const handleClearPriorityFilter = () => {
		setPriority(undefined)
	}

	useEffect(() => {
		setParams({
			...params,
			priority: priority ? +priority : undefined
		})
	}, [priority])

	const handleSelectDate = (date: DateRange | undefined) => {
		setDate(date)
	}

	useEffect(() => {
		let start_date: number | undefined = undefined
		let end_date: number | undefined = undefined

		if (date && date.from && date.to) {
			start_date = millisecondToEpochSecond(startOfDay(date.from).getTime())
			end_date = millisecondToEpochSecond(endOfDay(date.to).getTime())

		}
		setParams({
			...params,
			start_date,
			end_date,

		})
	}, [date])
	return (
		<div className='flex max-w-max gap-4 items-center'>
			<div className='relative min-w-xs'>
				<Search className='absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4' />
				<Input placeholder='Search task title' className='pl-7' onChange={handleSearch} />
			</div>

			<AvatarGroup>
				{userList?.data.map(user => (
					<TooltipProvider key={user.id}>
						<Tooltip>
							<TooltipTrigger onClick={() => handleFilterByAssignee(user.id)}>
								<Avatar className={`h-8 w-8 rounded-full ${params.assignee === user.id ? 'ring-sidebar-foreground ring-2' : ''}`}>
									<AvatarImage alt={user.name} />
									<AvatarFallback className="rounded-lg">{initialGenerator(user.name)}</AvatarFallback>
								</Avatar>

							</TooltipTrigger>
							<TooltipContent>
								<p>{user.name}</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				))}
			</AvatarGroup>
			<Select onValueChange={handlePriorityFilter} value={priority}>
				<SelectTrigger className="w-full min-w-48" onReset={handleClearPriorityFilter}>

					<SelectValue placeholder="Select Priority" />
				</SelectTrigger>

				<SelectContent>
					{priorityOptions.map(priority =>
						<SelectItem key={priority.value} value={priority.value.toString()} >
							{priority.label}
						</SelectItem>)}
				</SelectContent>
			</Select>
			<div className='relative'>

			<Popover>
				<PopoverTrigger asChild>
					<Button
						id="date"
						variant={"outline"}
						className={cn(
							"w-[280px] justify-start text-left font-normal",
							!date && "text-muted-foreground"
						)}
					>
						<CalendarIcon />
						{date?.from ? (
							date.to ? (
								<>
									{format(date.from, "LLL dd, y")} -{" "}
									{format(date.to, "LLL dd, y")}
								</>
							) : (
								format(date.from, "LLL dd, y")
							)
						) : (
							<span>Pick a date</span>
						)}
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-auto p-0" align="start">
					<Calendar
						initialFocus
						mode="range"
						defaultMonth={date?.from}
						selected={date}
						onSelect={(date) => handleSelectDate(date)}
						numberOfMonths={2}
					/>
				</PopoverContent>
					{date && <Button variant='ghost' size='icon' className='cursor-pointer absolute right-0 hover:bg-transparent top-1/2 -translate-y-1/2' onClick={() => handleSelectDate(undefined)}>
						<CircleX className='size-4 opacity-50 ' />
					</Button>}
			</Popover>
			</div>

		</div>
	)
}

export default BoardFilter
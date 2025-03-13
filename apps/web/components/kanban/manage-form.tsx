"use client"
import { cn, priorityOptions, statusArray } from "@/lib/utils"
import { useMutationCreateTask } from "@/services/task/mutation/useMutationCreateTask"
import { useQueryGetAllUser } from "@/services/user/query/useQueryGetAllUser"
import { ITaskListResponse } from "@/types/task"
import { CreateTaskDto, createTaskSchema } from "@app/utils/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQueryClient } from "@tanstack/react-query"
import { format } from "date-fns"
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { Button } from "../ui/button"
import { Calendar } from "../ui/calendar"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/command"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Textarea } from "../ui/textarea"


const ManageForm = ({task} : {task? : ITaskListResponse}) => {
	const queryClient = useQueryClient()
	const router = useRouter()
	const { data: userList } = useQueryGetAllUser()
	const { mutate: createTask,isPending : loadingCreate } = useMutationCreateTask({
		onSuccess: () => {
			toast.success('Task created successfully')
			queryClient.invalidateQueries()
			router.back()
		}
	})
	const form = useForm<CreateTaskDto>({
		resolver: zodResolver(createTaskSchema.extend({
			due_date: z.date(),
		}).transform(data => {
			return {
				...data,
				
				due_date: data.due_date.getTime()
			}
		})),
		defaultValues: {
			priority: priorityOptions[0].value,
			status: statusArray[0].value,
			users: []
		}
	})

	useEffect(() => {

		if (task) {
			
			form.setValue('title', task.title)
			form.setValue('description', task.description)
			form.setValue('priority', task.priority)
			form.setValue('status', task.status)
			form.setValue('due_date', task.due_date)
			// form.setValue('users', task.assignees.map(user => user.id))
			
		}
	},[task])
	const onSubmit = async (data: CreateTaskDto) => {
		createTask(data)
	}
	return (
		<div>
			<Form {...form}>
				<form className="flex flex-col gap-6" onSubmit={form.handleSubmit(onSubmit)}>
					<div className="flex flex-col gap-6">
						<FormField
							control={form.control}
							name="title"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Title</FormLabel>
									<FormControl>
										<Input
											type="text"
											placeholder="Task name"
											{...field}
											value={field.value ?? ''}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Description</FormLabel>
									<FormControl>
										<Textarea

											placeholder="Task Description"
											{...field}
											value={field.value ?? ''}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="status"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Status</FormLabel>
									<Select onValueChange={field.onChange} defaultValue={field.value}>
										<FormControl>
											<SelectTrigger className="w-full">
												<SelectValue placeholder="Select Task Status" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{statusArray.map(status => <SelectItem key={status.value} value={status.value} >
												{status.label}
											</SelectItem>)}
										</SelectContent>
									</Select>

									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="priority"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Priority</FormLabel>
									<Select onValueChange={field.onChange} defaultValue={field.value?.toString()}>
										<FormControl>
											<SelectTrigger className="w-full">
												<SelectValue placeholder="Select Task Priority" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{priorityOptions.map(priority => <SelectItem key={priority.value} value={priority.value?.toString()} >
												{priority.label}
											</SelectItem>)}
										</SelectContent>
									</Select>

									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="due_date"
							render={({ field }) => (
								<FormItem >
									<FormLabel>Due Date</FormLabel>
									<Popover>
										<PopoverTrigger asChild>
											<FormControl>
												<Button
													variant={"outline"}
													className={cn(
														"w-full pl-3 text-left font-normal",
														!field.value && "text-muted-foreground"
													)}
												>
													{field.value ? (
														format(field.value, "PPP")
													) : (
														<span>Pick task due date</span>
													)}
													<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
												</Button>
											</FormControl>
										</PopoverTrigger>
										<PopoverContent className="w-auto p-0" align="start">
											<Calendar
												mode="single"
												selected={new Date(field.value)}
												onSelect={field.onChange}
												initialFocus
											/>
										</PopoverContent>
									</Popover>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="users"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Assignees</FormLabel>
									<Popover >
										<PopoverTrigger asChild>
											<FormControl>
												<Button
													variant="outline"
													role="combobox"
													className={cn(
														"w-full justify-between truncate max-w-full",
														!field.value && "text-muted-foreground"
													)}
												>

													<span className="truncate">
														{
															field.value && field.value.length > 0
																? userList?.data.map(user => field.value.includes(user.id) ? user.name : '').filter(Boolean).join(', ')
																: "Select Assignees"
														}
													</span>
													<ChevronsUpDown className="opacity-50" />
												</Button>
											</FormControl>
										</PopoverTrigger>
										<PopoverContent className=" p-0">
											<Command>
												<CommandInput
													placeholder="Search user"
													className="h-9"
												/>
												<CommandList>
													<CommandEmpty>No user found.</CommandEmpty>
													<CommandGroup>
														{userList?.data.map((user) => (
															<CommandItem
																value={user.id}
																key={user.id}
																onSelect={() => {
																	if (field.value?.includes(user.id)) {
																		field.onChange(
																			field.value.filter(
																				(id) => id !== user.id
																			)
																		)
																	}
																	else {
																		form.setValue("users", [...field.value, user.id])
																	}
																}}
															>
																{user.name}
																<Check
																	className={cn(
																		"ml-auto",
																		field.value?.includes(user.id)
																			? "opacity-100"
																			: "opacity-0"
																	)}
																/>
															</CommandItem>
														))}
													</CommandGroup>
												</CommandList>
											</Command>
										</PopoverContent>
									</Popover>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type="submit" className="w-full" disabled={loadingCreate}>
							Create Task
						</Button>
					</div>
				</form>
			</Form>
		</div>
	)
}

export default ManageForm
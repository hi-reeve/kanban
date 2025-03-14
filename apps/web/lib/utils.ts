import { BadgeVariants } from "@/components/ui/badge"
import { STATUS_ENUM } from "@app/utils/types"
import { clsx, type ClassValue } from "clsx"
import { titleCase, upperFirst } from "scule"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export const priorityMapper = (priority: number) : { label: string, variant: BadgeVariants['variant'] } => {
	switch (priority) {
		case 1:
			return {
				label: "Low",
				variant : 'default'
			}
		case 2:
			return {
				label: "Medium",
				variant : 'secondary'
			}
		case 3:
			return {
				label: "High",
				variant : 'destructive'
			}
		default:
			return {
				label: "Low",
				variant : 'default'
			}
	}
}

export const priorityOptions = [
	{
		label: "Low",
		value: 1
	},
	{
		label: "Medium",
		value: 2
	},
	{
		label: "High",
		value: 3
	}
]


export const statusArray = Object.values(STATUS_ENUM).map((value) => ({
	label: upperFirst(titleCase(value)),
	value
}))


export const initialGenerator = (name?: string) => name
	?.split(' ')
	.map(chunk => chunk.charAt(0).toLocaleUpperCase())
	.slice(0, 2)
	.join('')

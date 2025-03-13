"use client"

import { type LucideIcon } from "lucide-react"

import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem
} from "@/components/ui/sidebar"
import { redirect } from "next/navigation"

export function NavMain({
	items,
}: {
	items: {
		title: string
		url: string
		icon?: LucideIcon
	}[]
	}) {
	
	return (
		<SidebarGroup>
			<SidebarGroupLabel>Kanban</SidebarGroupLabel>
			<SidebarMenu>
				{items.map((item) => (
						<SidebarMenuItem key={item.title}>
							<SidebarMenuButton tooltip={item.title} onClick={() => redirect(item.url)}>
								{item.icon && <item.icon />}
								<span>{item.title}</span>
							</SidebarMenuButton>
						
					</SidebarMenuItem>
				))}
			</SidebarMenu>
		</SidebarGroup>
	)
}

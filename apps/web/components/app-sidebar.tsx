"use client"

import {
	KanbanSquare,
	LayoutDashboard
} from "lucide-react"
import * as React from "react"

import { NavMain } from "@/components/nav-main"

import { NavSwitcher } from "@/components/nav-switcher"
import { NavUser } from "@/components/nav-user"
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
	navMain: [
		{
			title: "Dashboard",
			url: "/dashboard",
			icon: LayoutDashboard,
			
		},
		{
			title: "Task",
			url: "/dashboard/task",
			icon: KanbanSquare,
			
		},
	],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader>
				<NavSwitcher  />
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={data.navMain} />
				
			</SidebarContent>
			<SidebarFooter>
				<NavUser  />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	)
}

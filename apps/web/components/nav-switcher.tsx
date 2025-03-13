"use client"

import { Kanban } from "lucide-react"

import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem
} from "@/components/ui/sidebar"
import { useRouter } from "next/navigation"

export function NavSwitcher({

}) {

	const router = useRouter()
	const handleBrandClick = () => {
		router.push('/')
	}
	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<SidebarMenuButton
					size="lg"
					className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
					onClick={handleBrandClick}
				>
					<div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
						<Kanban />
					</div>
					<div className="grid flex-1 text-left text-sm leading-tight">
						<span className="truncate font-semibold">
							KANBAN
						</span>
						<span className="truncate text-xs">My Kanban</span>
					</div>
				</SidebarMenuButton>

			</SidebarMenuItem>
		</SidebarMenu>
	)
}

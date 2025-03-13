"use client"
import { AppSidebar } from "@/components/app-sidebar"
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar"
import { $api } from "@/lib/http-client"
import { computed, effect } from '@preact/signals-react'
import { useSession } from "next-auth/react"
import { usePathname } from "next/navigation"
import React from 'react'
import { upperFirst } from 'scule'
const layout = ({ children }: { children: React.ReactNode }) => {
	const {data : session} = useSession()
	const pathname = usePathname()

	const renderBreadcrumbLinks = computed(() => {
		const segments = pathname.split("/").filter((segment) => segment !== "")
		let url = ''
		return segments.map((segment, index) => {
			url += `/${segment}`
			const segmentName = upperFirst(segment)
			return <React.Fragment key={`${index}-item`} >
				<BreadcrumbItem className="hidden md:block">
					{index === segments.length - 1
						? <BreadcrumbPage>{segmentName}</BreadcrumbPage>
						: <BreadcrumbLink href={url}>{segmentName}</BreadcrumbLink>
					}
				</BreadcrumbItem>
				{index < segments.length - 1 && <BreadcrumbSeparator className="hidden md:block" />}
			</React.Fragment>
		})
	})

	effect(() => {
		if (session?.user.token) {
			$api.interceptors.request.use(
				(config) => {
					config.headers.Authorization = `Bearer ${session.user.token}`
					return config
			})
		}
	})
	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
					<div className="flex items-center gap-2 px-4">
						<SidebarTrigger className="-ml-1" />
						<Breadcrumb>
							<BreadcrumbList>
								{renderBreadcrumbLinks}
							</BreadcrumbList>
						</Breadcrumb>
					</div>
				</header>
				<div className="flex flex-1 flex-col gap-4 p-4 pt-0">
						{children}
					
				</div>
			</SidebarInset>
		</SidebarProvider>
	)
}

export default layout
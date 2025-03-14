"use client"

import {
	Dialog,
	DialogContent,
	DialogOverlay,
} from "@/components/ui/dialog"
import { useRouter } from "next/navigation"

export function Modal({
    children,
}: {
    children: React.ReactNode
}) {
    const router = useRouter()


    const handleOpenChange = () => {
        
		router.back()
    }

    return (
        <Dialog defaultOpen={true} open={true} onOpenChange={handleOpenChange}>
            <DialogOverlay className="bg-black/30">
                <DialogContent className="overflow-y-auto max-h-[90vh]">
                    {children}
                </DialogContent>
            </DialogOverlay>
        </Dialog>
    )
}
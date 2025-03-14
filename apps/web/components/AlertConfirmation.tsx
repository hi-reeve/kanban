import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useDialogStore } from "@/stores/dialog"
import React from "react"


export function AlertConfirmation() {

	const open = useDialogStore((state) => state.isOpen)
	const state = useDialogStore((state) => state)

	const close = useDialogStore((state) => state.close)
	const handleClose = () => {
		
		close()
	}
    return (
        <AlertDialog open={open} >
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{state.title}</AlertDialogTitle>
					<AlertDialogDescription asChild>
						
                        {React.isValidElement(state.message) ? state.message : <p>{state.message}</p>}
						
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={handleClose} >{state.btnNegativeText}</AlertDialogCancel>
                    <AlertDialogAction
						onClick={state.onConfirmation}
					>
						{state.btnPositiveText}
					</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
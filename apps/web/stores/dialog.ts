import React from 'react'
import { create } from 'zustand'


type Payload = {
	message: React.ReactNode,
	onConfirmation: () => void
	title?: string
	btnPositiveText?: string
	btnNegativeText?: string
}
type State = {
	message: React.ReactNode
	onConfirmation: () => void
	isOpen?: boolean
	title?: string
	btnPositiveText?: string
	btnNegativeText?: string
	open: (payload : Payload) => void
	close : () => void
}
const defaultValues : Payload = {
	title: 'Are you sure?',
	message: '',
	btnPositiveText: 'Continue',
	btnNegativeText: 'Cancel',
	onConfirmation: () => { },
}

export const useDialogStore = create<State>((set) => ({
	...defaultValues,
	isOpen: false,
	open: (payload : Payload) =>
		set({ ...defaultValues, ...payload, isOpen: true}),
	close: () => set({...defaultValues, isOpen : false}),
}))
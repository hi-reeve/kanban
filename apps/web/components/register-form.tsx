"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import type { RegisterPayload } from '@app/utils/schema'
import { ERROR_MESSAGE } from '@app/utils/string'

import { cn } from '@/lib/utils'
import { useMutationRegister } from '@/services/auth/mutation/useMutationRegister'
import { registerSchema } from '@app/utils/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { GalleryVerticalEnd } from 'lucide-react'
import Link from 'next/link'

import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form'

import { redirect, useRouter } from 'next/navigation'

const registerFeSchema = registerSchema.extend({
	confirm_password : z.string()
})
export function RegisterForm({
    className,
    ...props
}: React.ComponentProps<'div'>) {
	const router = useRouter()
    const form = useForm<z.infer<typeof registerFeSchema>>({
		resolver: zodResolver(registerFeSchema.superRefine(({confirm_password,password},ctx) => {
			if (confirm_password !== password) 
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: "Passwords don't match",
					path: ["confirm_password"],
				})
		})),
    })

	const { mutate } = useMutationRegister({
		onSuccess: () => {
			toast.success('Register successfully')
			redirect('/dashboard')
		},
		onError(error) {
			if (error.response?.data.message === ERROR_MESSAGE.USER.EXISTS) {
				toast.error('User already exists')
				form.resetField('password')
				form.resetField('confirm_password')
				form.setError('username', { message: 'User already exists' })
			}
		},
	})
    const onSubmit = (data: RegisterPayload) => {
        mutate(data)
    }
    return (
        <div className={cn('flex flex-col gap-6', className)} {...props}>
            <Form {...form}>

                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col items-center gap-2">
                            <a
                                href="#"
                                className="flex flex-col items-center gap-2 font-medium"
                            >
                                <div className="flex size-8 items-center justify-center rounded-md">
                                    <GalleryVerticalEnd className="size-6" />
                                </div>
                                <span className="sr-only">Kanban.</span>
                            </a>
                            <h1 className="text-xl font-bold">Register to Kanban.</h1>
                            <div className="text-center text-sm">
                                Already have an account?
                                {' '}
                                <Link href="/" className="underline underline-offset-4">
                                    Login
                                </Link>
                            </div>
                        </div>
                        <div className="flex flex-col gap-6">
						<FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            placeholder="john_doe"
											{...field}
											value={field.value ?? ""}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="Password"
											{...field}
											value={field.value ?? ""}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
							/>
							  <FormField
                            control={form.control}
                            name="confirm_password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="Confirm Password"
											{...field}
											value={field.value ?? ""}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                            <Button type="submit" className="w-full">
                                Register
                            </Button>
                        </div>
                    </div>
                </form>
            </Form>
            <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
                By clicking continue, you agree to our
                {' '}
                <a href="#">Terms of Service</a>
                {' '}
                and
                {' '}
                <a href="#">Privacy Policy</a>
                .
            </div>
        </div>
    )
}

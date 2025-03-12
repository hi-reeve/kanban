'use client'
import type { LoginPayload } from '../../../packages/utils/schema'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { useMutationLogin } from '@/services/auth/mutation/useMutationLogin'
import { zodResolver } from '@hookform/resolvers/zod'
import { GalleryVerticalEnd } from 'lucide-react'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { loginSchema } from '../../../packages/utils/schema'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
export function LoginForm({
    className,
    ...props
}: React.ComponentProps<'div'>) {
	const router = useRouter()
    const form = useForm<LoginPayload>({
        resolver: zodResolver(loginSchema),
    })

    const { mutate } = useMutationLogin({
        onSuccess: () => {

        },
        onError(error) {
            toast.error(error.response?.data.message)
        },
    })

    const onSubmit =async  (data: LoginPayload) => {
		
		const res = await signIn('credentials', {
			...data,
			redirect : false
		})

		if (res?.ok) {
			toast.success('Login successful')
			router.push('/dashboard')
		}
    }
    return (
        <div className={cn('flex flex-col gap-6', className)} {...props}>
            <Form {...form}>
                <form className="flex flex-col gap-6" onSubmit={form.handleSubmit(onSubmit)}>
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
                        <h1 className="text-xl font-bold">Welcome to Kanban.</h1>
                        <div className="text-center text-sm">
                            Don&apos;t have an account?
                            {' '}
                            <Link href="/register" className="underline underline-offset-4">
                                Sign up
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
                                            placeholder="********"
											{...field}
											value={field.value ?? ""}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full">
                            Login
                        </Button>
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

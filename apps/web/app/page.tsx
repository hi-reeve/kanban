import { LoginForm } from '@/components/login-form'

import { getSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

export default async function Home() {
	
	const session = await getSession()
	if (session) redirect('/dashboard')
	
    return (
        <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
            <div className="w-full max-w-sm">
                <LoginForm />
            </div>
        </div>
    )
}

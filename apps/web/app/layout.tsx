import { Toaster } from '@/components/ui/sonner'
import type { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { Geist, Geist_Mono } from 'next/font/google'
import { authOptions } from './api/auth/[...nextauth]/route'
import './globals.css'
import Providers from './providers'

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
})

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
})

export const metadata: Metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
}

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const session = await getServerSession(authOptions)
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <Toaster position="top-center" />
                <Providers session={session}>
                    {children}
                </Providers>
            </body>
        </html>
    )
}

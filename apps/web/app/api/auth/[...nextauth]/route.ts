import type { LoginPayload, LoginResponse } from '@app/utils/schema'
import { ERROR_MESSAGE } from '@app/utils/string'
import type { AxiosResponse } from 'axios'
import axios, { AxiosError, isAxiosError } from 'axios'
import type { NextAuthOptions } from 'next-auth'
import NextAuth, { getServerSession } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                username: {},
                password: {},
            },
            async authorize(credentials) {
                try {
                    const res = await axios.post<LoginPayload, AxiosResponse<LoginResponse>>(
                        `${process.env.NEXT_PUBLIC_API_URL}/v1/auth/login`,
                        credentials,
                    )
                    if (res.data) {
                        return {
                            id: res.data.user.id,
                            name: res.data.user.username,
                            role: res.data.user.role,
                            token: res.data.token,
                        }
                    }

                    throw new AxiosError(ERROR_MESSAGE.AUTH.INVALID_CREDENTIALS)
                }
                catch (error) {
                    if (isAxiosError(error)) {
                        console.log(error.response?.data)
                    }
                    console.log('error', error)
                    return null
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.user = {
                    id: user.id,
                    name: user.name!,
                    role: user.role,
                    token: user.token,
                }
            }
            return token
        },
        async session({ session, token }) {
            session.user = token.user
            return session
        },

    },
    pages: {
        signIn: '/',
        error: '/',
    },
    session: {
        strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET,

}
export const getServerAuthSession = () => getServerSession(authOptions) // (6)
const handler = NextAuth(authOptions)
export {
	handler as GET,
	handler as POST
}


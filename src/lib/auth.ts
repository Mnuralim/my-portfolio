import User from '@/model/user'
import { compare } from 'bcrypt'
import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { IUser } from '../../types'

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'Email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error('Email and password required')
        }
        const existingUser: IUser | null = await User.findOne({ email: credentials.email })
        if (!existingUser) {
          throw new Error('Email not found')
        }
        const passwordMatch = await compare(credentials.password, existingUser.password)
        if (!passwordMatch) {
          throw new Error('Incorrect password')
        }
        return {
          id: `${existingUser._id}`,
          email: existingUser.email,
          name: existingUser.name,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token }) {
      return token
    },
    async session({ session }) {
      return session
    },
  },
  pages: {
    signIn: '/admin/login',
  },
}

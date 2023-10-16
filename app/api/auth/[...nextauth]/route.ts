import NextAuth from 'next-auth/next'
import { NextAuthOptions } from 'next-auth'
import CredentialProvider from 'next-auth/providers/credentials'

const authOptions: NextAuthOptions = {
  providers: [
    CredentialProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials, req) {
				const response = await fetch('http://localhost:3333/signIn', {
					method: 'POST',
					headers: {
						'Content-type': 'application/json'
					},
					body: JSON.stringify({
						email: credentials?.email,
						password: credentials?.password
					})
				})

				const user = await response.json()
        //console.log(user)
				
				if (user && response.ok) {
					return user
				}

				return null

			},
        
        
        
        
      /*  
        
        const user = {
          id: '1',
          email: 'user@email.com',
          password: '123',
          name: 'User Hardcoded',
          role: 'admin'
        }

        const isValidEmail = user.email === credentials?.email
        const isValidPassword = user.password === credentials?.password

        if (!isValidEmail || !isValidPassword) {
          return null
        }

        return user
      }

      */

    })
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      const customUser = user as unknown as any

      if (user) {        
        return {
          ...token,
          id: user.id,
          role: 'admin'   //customUser.role
        }
      }

      return token
    },
    session: async ({ session, token }) => {
      return {
        ...session,
        user: {
          name: token.name,
          email: token.email,
          role: token.role,
          id: token.id
        }
      }
    }
  },
  pages: {
    signIn: '/auth/login'
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
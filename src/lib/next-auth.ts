import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions = {
   providers: [
      GoogleProvider({
         clientId: process.env.G_CLIENT_ID!,
         clientSecret: process.env.G_CLIENT_SECRET!
      }),
      CredentialsProvider({
         credentials: {},
         async authorize(
            credentials: Record<string, string> | undefined
         ): Promise<any> {
            if (
               credentials?.email === process.env.ADMIN_EMAIL &&
               credentials?.password === process.env.ADMIN_PASSWORD
            )
               return {
                  email: process.env.ADMIN_EMAIL,
                  name: 'Admin'
               }

            throw new Error('Invalid credentials')
         }
      })
   ],

   callbacks: {
      async signIn(data: any) {
         return Boolean(data.user.name)
      },
      async jwt(data: any) {
         if (data.user) return data.user
         else return data.token
      },
      async session(data: any) {
         return data.token
      }
   }
}

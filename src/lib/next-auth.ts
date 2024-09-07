import GoogleProvider from 'next-auth/providers/google'

export const authOptions = {
   providers: [
      GoogleProvider({
         clientId: process.env.G_CLIENT_ID!,
         clientSecret: process.env.G_CLIENT_SECRET!
      })
   ]
}

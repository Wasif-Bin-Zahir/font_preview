import GoogleProvider from 'next-auth/providers/google'

export const authOptions = {
   providers: [
      GoogleProvider({
         clientId:
            '783330238509-ne1nhdsvi8gnqj7krfouqjku16u67cc9.apps.googleusercontent.com',
         clientSecret: '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'
      })
   ],
   pages: {
      signIn: '/admin/login'
   }
}

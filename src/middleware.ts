import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
   function middleware(req) {
      const { pathname } = req.nextUrl
      const { token } = req.nextauth
      console.log('token', token)

      if (!token && pathname.startsWith('/admin/dashboard')) {
         return NextResponse.redirect(new URL('/', req.url))
      }
   },
   {
      callbacks: {
         authorized: () => true
      }
   }
)

export const config = { matcher: ['/admin/:path*'] }

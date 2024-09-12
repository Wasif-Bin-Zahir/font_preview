import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
   function middleware(req) {
      const { pathname } = req.nextUrl
      const { token } = req.nextauth

      if (!token && pathname.startsWith('/admin/dashboard')) {
         return NextResponse.redirect(new URL('/', req.url))
      } else if (token && pathname.startsWith('/admin/login')) {
         return NextResponse.redirect(new URL('/admin/dashboard', req.url))
      }
   },
   {
      callbacks: {
         authorized: () => true
      }
   }
)

export const config = { matcher: ['/admin/:path*'] }

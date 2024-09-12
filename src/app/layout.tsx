import Footer from '@/components/Footer'
import Navbar from '@/components/header'
import SessionProvider from '@/components/session-provider'
import { getServerSession } from 'next-auth'
import { Toaster } from 'react-hot-toast'
import './globals.css'
import { Montserrat } from 'next/font/google'
import { Metadata } from 'next'

const montserrat = Montserrat({
   display: 'swap',
   weight: ['500', '700'],
   subsets: ['latin']
})

export const metadata: Metadata = {
   title: 'Black Friday Fonts'
}

export default async function RootLayout({
   children
}: {
   children: React.ReactNode
}) {
   const session = await getServerSession()

   return (
      <html lang="en" className={montserrat.className}>
         <body>
            <Toaster />

            <SessionProvider session={session}>
               <Navbar />
               <main className='bg-gray-100 p-3'>{children}</main>
               <Footer />
            </SessionProvider>
         </body>
      </html>
   )
}

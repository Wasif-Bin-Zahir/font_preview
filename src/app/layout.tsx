import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import SessionProvider from '@/components/SessionProvider'
import { getServerSession } from 'next-auth'
import { Toaster } from 'react-hot-toast'
import './globals.css'

export default async function RootLayout({
   children
}: {
   children: React.ReactNode
}) {
   const session = await getServerSession()

   return (
      <html lang="en">
         <body>
            <Toaster />

            <SessionProvider session={session}>
               <Navbar />
               <main className="p-7">{children}</main>
               <Footer />
            </SessionProvider>
         </body>
      </html>
   )
}

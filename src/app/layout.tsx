import Footer from "@/components/Footer"
import "./globals.css"
import Navbar from "@/components/Navbar"
import { getServerSession } from "next-auth"
import SessionProvider from '@/components/SessionProvider'

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession()
  return (
    <html lang="en">
      <body>
        <SessionProvider session={session}>
          <Navbar />
          {children}
          <Footer />
        </SessionProvider>
      </body>
    </html>
  )
}

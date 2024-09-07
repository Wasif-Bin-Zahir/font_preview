'use client'

import { signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export default function Navbar() {
   const { data: session } = useSession()
   const path = usePathname()
   const [loading, setLoading] = useState(false)

   return (
      <>
         <header className="bg-dark py-3">
            <div className="relative mx-auto aspect-square w-16">
               <a href="/">
                  <Image
                     src="/images/logo.png"
                     alt="Logo"
                     quality={100}
                     priority
                     fill
                  />
               </a>
            </div>
         </header>

         <nav className="bg-ash text-dark px-3 py-3">
            <div className="mx-auto flex max-w-screen-2xl items-stretch justify-between font-semibold">
               <a href="/submit-font">Submit a font</a>

               <div>
                  {path === '/admin/dashboard' ? (
                     <button
                        className="transition duration-300 ease-in-out hover:text-red-500"
                        onClick={() => {
                           setLoading(true)
                           signOut({
                              callbackUrl: '/'
                           }).then(() => setLoading(false))
                        }}
                     >
                        {loading ? 'Logging out...' : 'Logout'}
                     </button>
                  ) : session?.user?.image ? (
                     <Link href="/admin/dashboard" className="cursor-pointer">
                        Dashboard
                     </Link>
                  ) : (
                     <button onClick={() => signIn('google')}>Login</button>
                  )}
               </div>
            </div>
         </nav>
      </>
   )
}

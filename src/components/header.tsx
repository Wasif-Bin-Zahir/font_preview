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

         <nav className="bg-ash px-3 py-3 text-dark">
            <div className="mx-auto flex max-w-screen-lg items-stretch justify-end font-semibold">
               <a className="mr-3" href="/submit-font">
                  Submit a font
               </a>
               |
               <a className="ml-3" href="/contact-us">
                  Contact us
               </a>
            </div>
         </nav>
      </>
   )
}

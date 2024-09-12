'use client'

import { signOut } from 'next-auth/react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

export default function Navbar() {
   const pathname = usePathname()

   return (
      <div className="sticky left-0 right-0 top-0 z-50">
         <header className="bg-dark py-3">
            <div className="mx-auto w-full max-w-screen-lg">
               <div className="relative ml-3 aspect-square w-16">
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
            </div>
         </header>

         <nav className="bg-gray-200 px-3 py-3 text-dark shadow">
            <div className="mx-auto flex max-w-screen-lg items-stretch justify-end font-semibold">
               {pathname.startsWith('/admin') ? (
                  <>
                     <a className="mr-3" href="/admin/dashboard">
                        Dashboard
                     </a>
                     |
                     {/* <a className="mx-3" href="/admin/contacts">
                        Contacts
                     </a> */}
                     |
                     <button
                        className="ml-3"
                        onClick={() =>
                           signOut({
                              callbackUrl: '/'
                           })
                        }
                     >
                        Logout
                     </button>
                  </>
               ) : (
                  <>
                     <a className="mr-3" href="/submit-font">
                        Submit a font
                     </a>
                     |
                     <a className="ml-3" href="/contact-us">
                        Contact us
                     </a>
                  </>
               )}
            </div>
         </nav>
      </div>
   )
}

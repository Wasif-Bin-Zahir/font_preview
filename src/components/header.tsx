'use client'

import Image from 'next/image'

export default function Navbar() {
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

         <nav className="bg-gray-200 shadow px-3 py-3 text-dark">
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
      </div>
   )
}

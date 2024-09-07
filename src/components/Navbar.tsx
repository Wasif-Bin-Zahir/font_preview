// src/components/layout/Navbar.tsx
'use client'

import { signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'

const Navbar = () => {
   const { data: session } = useSession()

   return (
      <nav>
         <div>
            <div className="navbar bg-neutral px-[100px]">
               <div className="flex-1">
                  <a href="/">
                     <Image
                        src="/images/logo.png"
                        alt="Logo"
                        width={128} // Adjust to your image's width
                        height={64} // Adjust to your image's height
                        priority // Optionally add priority to preload the image
                     />
                  </a>
               </div>
               <div className="flex-none gap-2">
                  {session?.user?.image ? (
                     <div className="dropdown dropdown-end">
                        <div
                           tabIndex={0}
                           role="button"
                           className="btn btn-ghost btn-circle avatar"
                        >
                           <div className="w-10 rounded-full">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                 alt="Tailwind CSS Navbar component"
                                 src={session?.user?.image!}
                              />
                           </div>
                        </div>
                        <ul
                           tabIndex={0}
                           className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                        >
                           <Link
                              href="/admin/dashboard"
                              className="cursor-pointer"
                           >
                              <li className="cursor-pointer">Dashboard</li>
                           </Link>
                           <li
                              className="cursor-pointer"
                              onClick={() =>
                                 signOut({
                                    redirect: false
                                 })
                              }
                           >
                              Logout
                           </li>
                        </ul>
                     </div>
                  ) : (
                     <button
                        onClick={() => signIn('google')}
                        className="relative after:content-['|'] after:ml-5 text-white last:after:content-none"
                     >
                        Admin Login
                     </button>
                  )}
               </div>
            </div>

            {/* Top Navigation Bar */}
            <nav className="bg-gray-300 p-3 px-[75px]">
               <div className="flex justify-between items-center px-[30px]">
                  <div className="flex space-x-5">
                     <a
                        href="/"
                        className="relative after:content-['|'] after:ml-5 after:text-gray-500 last:after:content-none"
                     >
                        Home
                     </a>
                     <a
                        href="/submit-font"
                        className="relative after:content-['|'] after:ml-5 after:text-gray-500 last:after:content-none"
                     >
                        Submit a font
                     </a>
                  </div>
                  <div className="flex space-x-5 "></div>
               </div>
            </nav>
         </div>
      </nav>
   )
}

export default Navbar

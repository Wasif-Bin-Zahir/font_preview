import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
   return (
      <footer className="bg-dark py-7 text-white">
         <div className="mx-auto flex max-w-screen-2xl flex-col items-center justify-center gap-3">
            <a href="/">
               <Image
                  src="/images/logo.png"
                  alt="Logo"
                  width={128} // Adjust to your image's width
                  height={64} // Adjust to your image's height
                  priority
               />
            </a>
            <p>© All rights reserved {new Date().getFullYear()} </p>
            <small>
               Developed by{' '}
               <Link href="https://cloud-16.com" target="_blank">
                  Cloud16
               </Link>
            </small>
         </div>
      </footer>
   )
}

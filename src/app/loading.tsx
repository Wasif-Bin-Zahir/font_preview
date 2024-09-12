import Image from 'next/image'

export default function loading() {
   return (
      <div className="fixed inset-0 flex items-center justify-center bg-white">
         <div className="relative aspect-square w-40 rounded-full bg-dark">
            <Image
               src="/images/logo.png"
               alt="logo"
               className="scale-50"
               fill
            />
            <div className="aspect-square w-40 animate-spin rounded-full border-b-4 border-t-8 border-gray-300"></div>
         </div>
      </div>
   )
}

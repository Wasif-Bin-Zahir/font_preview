'use client'

import { useState } from 'react'
import { toggleApproval } from './action'
import { Loader } from 'lucide-react'

export default function Status({
   id,
   status
}: {
   id: string
   status: boolean
}) {
   const [loading, setLoading] = useState(false)

   return (
      <button
         onClick={async () => {
            setLoading(true)
            await toggleApproval(id, !status)
            setLoading(false)
         }}
         className={`w-24 items-center justify-center rounded-md px-3 py-1 font-semibold text-white transition-all duration-300 ease-out ${loading ? 'bg-amber-500' : status ? 'bg-red-500' : 'bg-green-500'}`}
      >
         {loading ? (
            <Loader className="mx-auto animate-spin" />
         ) : status ? (
            'Hide'
         ) : (
            'Publish'
         )}
      </button>
   )
}

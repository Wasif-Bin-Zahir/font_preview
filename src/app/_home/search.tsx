'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Search() {
   const [query, setQuery] = useState('')
   const { replace } = useRouter()

   useEffect(() => {
      if (query) {
         replace('/?q=' + query)
      } else {
         replace('/')
      }
   }, [query, replace])

   return (
      <input
         onChange={(e) => setQuery(e.target.value)}
         type="text"
         placeholder="Search Font Here"
         className="w-full rounded-xl border-0 bg-white py-3 text-center italic"
      />
   )
}

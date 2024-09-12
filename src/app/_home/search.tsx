'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Search() {
   const [query, setQuery] = useState('')
   const [debouncedQuery, setDebouncedQuery] = useState('')
   const { replace } = useRouter()

   useEffect(() => {
      const handler = setTimeout(() => {
         setDebouncedQuery(query)
      }, 700)

      return () => {
         clearTimeout(handler)
      }
   }, [query])

   useEffect(() => {
      if (debouncedQuery) {
         replace('/?q=' + debouncedQuery)
      } else {
         replace('/')
      }
   }, [debouncedQuery, replace])

   return (
      <input
         onChange={(e) => setQuery(e.target.value)}
         type="text"
         placeholder="Search Font Here"
         className="w-full rounded-xl border bg-white py-3 text-center italic"
      />
   )
}

'use client'

import { Loader } from 'lucide-react'
import { revalidatePath } from 'next/cache'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { reload } from './action'

let popup = false

export default function Delete({
   id,
   name,
   designer
}: {
   id: string
   name: string
   designer: string
}) {
   const [loading, setLoading] = useState(false)

   const deleteFont = async () => {
      const res = await fetch(`/api/delete/${id}`, {
         method: 'DELETE'
      })

      return await res.json()
   }

   const askConfirmation = () => {
      toast((t) => {
         popup = t.visible

         return (
            <div>
               <span>
                  Do you want to delete <b>{name}</b> by <b>{designer}</b>?
               </span>
               <div className="mt-3 flex justify-center gap-3">
                  <button
                     className="rounded border bg-gray-100 p-1"
                     onClick={() => toast.dismiss(t.id)}
                  >
                     Cancel
                  </button>

                  <button
                     className="rounded bg-red-500 p-1 text-white"
                     onClick={async () => {
                        toast.dismiss(t.id)

                        toast.promise(
                           deleteFont(),
                           {
                              loading: 'Deleting...',
                              success: (res: any) => {
                                 if (res.success) {
                                    reload('/admin/dashboard')
                                    return `${name} by ${designer} is deleted`
                                 }

                                 throw new Error('Failed to delete')
                              },
                              error: 'Failed to delete'
                           },
                           {
                              duration: 1000
                           }
                        )
                     }}
                  >
                     Confirm
                  </button>
               </div>
            </div>
         )
      })
   }

   return (
      <button
         onClick={async () => {
            if (popup === true) return
            askConfirmation()
            // setLoading(true)
            // await deleteFont(id)
            // setLoading(false)
         }}
         className={`w-24 items-center justify-center rounded-md px-3 py-1 font-semibold text-white transition-all duration-300 ease-out ${loading ? 'bg-amber-500' : 'bg-red-500'}`}
      >
         {loading ? <Loader className="mx-auto animate-spin" /> : 'Delete'}
      </button>
   )
}

'use client'

import toggleApproval from './action'

export default function Status({
   id,
   status
}: {
   id: string
   status: boolean
}) {
   // const approveFont = async (id: string) => {
   //     // Send approval request to the server
   //     await fetch(`/api/fonts/${id}/approve`, { method: 'POST' })
   //     // setPendingFonts(pendingFonts.filter((font) => font._id !== id))
   //  }

   return (
      <button onClick={() => toggleApproval(id, !status)}>
         {status ? 'Hide' : 'Publish'}
      </button>
   )
}

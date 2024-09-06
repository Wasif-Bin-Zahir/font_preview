import Font from '@/models/Font'
import Status from './status'

interface FontData {
   _id: string
   fontName: string
   designerName: string
   status: string
}

export default async function AdminFontApprovalPage() {
   const data = await Font.find()

   const rejectFont = async (id: string) => {
      // Send rejection request to the server
      await fetch(`/api/fonts/${id}/reject`, { method: 'POST' })
      // setPendingFonts(pendingFonts.filter((font) => font._id !== id))
   }

   return (
      <div className="font-sans bg-gray-100 min-h-screen flex flex-col">
         <div className="container mx-auto px-5 py-10">
            <h1 className="text-3xl font-bold text-center mb-10">
               Admin - Approve Fonts
            </h1>

            {/* Pending Fonts Section */}
            <div className="bg-white shadow-lg rounded-lg p-6">
               <h2 className="text-2xl font-semibold text-gray-700 mb-6">
                  Pending Fonts
               </h2>
               <div className="overflow-x-auto">
                  <table className="min-w-full bg-white">
                     <thead>
                        <tr>
                           <th className="py-3 px-5 bg-gray-200 text-left text-lg font-bold text-gray-700">
                              Designer Name
                           </th>
                           <th className="py-3 px-5 bg-gray-200 text-center text-lg font-bold text-gray-700">
                              Font Name
                           </th>
                           <th className="py-3 px-5 bg-gray-200 text-right text-lg font-bold text-gray-700">
                              Actions
                           </th>
                        </tr>
                     </thead>
                     <tbody>
                        {data.map((font: any) => (
                           <tr
                              key={font._id}
                              className="border-b border-gray-200"
                           >
                              <td className="py-3 px-5">{font.designer}</td>
                              <td className="py-3 px-5 text-center mr-2">
                                 {font.name}
                              </td>
                              <td className="py-3 px-5 text-right">
                                 <Status id={font._id} status={font.status} />
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </div>
         </div>
      </div>
   )
}

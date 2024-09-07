import Font from '@/models/Font'
import Status from './status'
import connectDB from '@/lib/mongodb'

interface FontData {
   _id: string
   fontName: string
   designerName: string
   status: string
}

export default async function AdminFontApprovalPage() {
   await connectDB()
   const data = await Font.find()

   return (
      <div className="flex min-h-screen flex-col bg-gray-100 font-sans">
         <div className="container mx-auto px-5 py-10">
            <h1 className="mb-10 text-center text-3xl font-bold">Fonts</h1>

            <div className="rounded bg-white p-3">
               <div className="overflow-x-auto">
                  <table className="min-w-full bg-white">
                     <thead>
                        <tr>
                           <th className="bg-gray-200 px-5 py-3 text-left text-lg font-bold text-gray-700">
                              Designer
                           </th>
                           <th className="bg-gray-200 px-5 py-3 text-center text-lg font-bold text-gray-700">
                              Font
                           </th>
                           <th className="bg-gray-200 px-5 py-3 text-right text-lg font-bold text-gray-700">
                              Action
                           </th>
                        </tr>
                     </thead>
                     <tbody>
                        {data.map((font: any) => (
                           <tr
                              key={font._id}
                              className="border-b border-gray-200"
                           >
                              <td className="px-5 py-3">{font.designer}</td>
                              <td className="mr-2 px-5 py-3 text-center">
                                 {font.name}
                              </td>
                              <td className="px-5 py-3 text-right">
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

import Font from '@/models/Font'
import Status from './status'
import connectDB from '@/lib/mongodb'
import Table from './table'

export default async function AdminFontApprovalPage() {
   await connectDB()
   const data = await Font.find()

   return (
      <div className="flex min-h-screen flex-col bg-gray-100 font-sans">
         <div className="container mx-auto px-5 py-10">
            <h1 className="mb-10 text-center text-3xl font-bold">Fonts</h1>

            <Table fonts={data} />
         </div>
      </div>
   )
}

import connectDB from '@/lib/mongodb'
import Font from '@/models/Font'
import Table from './table'

export default async function AdminFontApprovalPage({
   searchParams
}: {
   searchParams: { q?: string; page?: string }
}) {
   await connectDB()
   const options = {
      page: parseInt(searchParams.page as string) || 1,
      limit: 25,
      select: 'name designer preview download donation status'
   }

   // @ts-ignore
   const fonts = await Font.paginate({}, options)

   return (
      <div className="flex min-h-screen flex-col bg-gray-100 font-sans">
         <div className="container mx-auto px-5 py-10 max-w-screen-lg">
            <h1 className="mb-10 text-center text-3xl font-bold">Fonts</h1>

            <Table fonts={fonts} />
         </div>
      </div>
   )
}

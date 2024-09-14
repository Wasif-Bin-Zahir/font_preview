import connectDB from '@/lib/mongodb'
import Font from '@/models/Font'
import Search from './_home/search'
import ShowCase from './_home/show-case'

export const dynamic = 'force-dynamic'

export default async function Home({
   searchParams
}: {
   searchParams: { q?: string; page?: string }
}) {
   const query: any = { status: true }

   if (searchParams.q) {
      query.$or = [
         { name: { $regex: searchParams.q, $options: 'i' } },
         { font: { $regex: searchParams.q, $options: 'i' } }
      ]
   }
   await connectDB()

   const options = {
      page: parseInt(searchParams.page as string) || 1,
      limit: 25,
      select: 'name designer preview download donation'
   }

   // @ts-ignore
   const fonts = await Font.paginate(query, options)

   return (
      <div className="mx-auto min-h-dvh max-w-screen-lg">
         {/* <div className="mx-auto my-3 w-full max-w-screen-2xl border-b border-t border-dashed border-white py-3">
            <Search />
         </div> */}

         <ShowCase fonts={fonts} />
      </div>
   )
}

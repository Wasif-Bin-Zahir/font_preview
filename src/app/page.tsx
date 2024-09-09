import connectDB from '@/lib/mongodb'
import Font from '@/models/Font'
import ShowCase, { type FontType } from './_home/show-case'
import Search from './_home/search'

export const dynamic = 'force-dynamic'

export default async function Home({
   searchParams
}: {
   searchParams: { q?: string }
}) {
   const query: any = { status: true }

   if (searchParams.q) {
      query.$or = [
         { name: { $regex: searchParams.q, $options: 'i' } },
         { font: { $regex: searchParams.q, $options: 'i' } }
      ]
   }
   await connectDB()
   const fonts: FontType[] = await Font.find(query).select(
      'name designer preview download donation'
   )

   return (
      <div className="mx-auto min-h-dvh max-w-screen-lg">
         <div className="mx-auto my-3 w-full max-w-screen-2xl border-b border-t border-dashed py-3">
            <Search />
         </div>

         <ShowCase fonts={fonts} />
      </div>
   )
}

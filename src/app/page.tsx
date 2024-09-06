import FontStats from '@/components/font-stats'
import connectDB from '@/lib/mongodb'
import Font from '@/models/Font'
import ShowCase, { type FontType } from './_home/show-case'

export const dynamic = 'force-dynamic'

export default async function Home() {
   await connectDB()
   const fonts: FontType[] = await Font.find({ status: true })
      .select('name designer preview download donation')
      .lean()

   return (
      <div className="mx-auto">
         <div className="flex justify-center items-center p-3">
            <input
               type="text"
               placeholder="Search Font Here"
               className="bg-white border-2 border-gray-300"
            />
         </div>

         <hr />

         <ShowCase fonts={fonts} />
         <FontStats />
      </div>
   )
}

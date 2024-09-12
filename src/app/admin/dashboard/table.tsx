'use client'

import { FontData } from '@/types'
import Image from 'next/image'
import { useEffect } from 'react'
import Status from './status'
import Delete from './delete'
import ReactPaginate from 'react-paginate'
import { useRouter, useSearchParams } from 'next/navigation'
import slugify from 'slugify'
import { getValidFontName, loadFont } from '@/utils'

export default function Table({ fonts }: { fonts: FontData }) {
   const searchParams = useSearchParams()
   const search = searchParams.get('q')

   const { push } = useRouter()

   useEffect(() => {
      const fontFaces = fonts.docs.map((font) => loadFont(font))

      return () => {
         fontFaces.forEach((fontFace) => document.fonts.delete(fontFace))
      }
   }, [fonts])

   if (fonts.docs.length === 0) {
      return (
         <div className="item-center my-7 flex flex-col items-center justify-center">
            <Image
               className="max-w-72"
               src="/images/empty.svg"
               alt="No fonts found"
               width={500}
               height={50}
            />

            <p className="my-7 text-center text-xl text-dark">
               No Result Found
            </p>
         </div>
      )
   }

   return (
      <div className="space-y-6">
         {fonts.docs.map((font, index) => (
            <div
               key={index}
               className="grid grid-cols-4 gap-3 space-x-6 rounded-xl border bg-gray-50 px-7 py-3 drop-shadow-sm"
            >
               <div className="col-span-4 max-w-7xl lg:col-span-3">
                  <p className="my-1 text-sm text-gray-300">
                     <span className="font-semibold">{font.name} </span>
                     by
                     <span className=""> {font.designer}</span>
                  </p>

                  <p
                     className="text-5xl text-gray-700"
                     style={{
                        fontFamily: getValidFontName(font._id)
                     }}
                  >
                     The quick brown fox jumps over the lazy dog
                  </p>
               </div>

               <div className="col-span-4 flex items-center justify-end gap-7 lg:col-span-1">
                  <div className="text-right"></div>

                  <Status id={font._id} status={font.status} />
                  <Delete
                     id={font._id}
                     name={font.name}
                     designer={font.designer}
                  />
               </div>
            </div>
         ))}

         <ReactPaginate
            containerClassName="flex justify-center items-center gap-3"
            pageLinkClassName="hover:cursor-pointer rounded-full border-2 bg-dark flex justify-center items-center w-12 h-12 text-sm font-bold text-white transition duration-300 hover:bg-opacity-70"
            breakClassName="  p-2 text-sm font-bold"
            previousLinkClassName={`${fonts.prevPage === null ? 'opacity-10' : ''}  disabled:bg-gray-100 flex justify-center items-center w-12 h-12 rounded-full border-2 bg-dark p-2 text-sm font-bold text-white transition duration-300 hover:bg-opacity-70`}
            nextLinkClassName={`${fonts.prevPage === null ? 'opacity-10' : ''} flex justify-center items-center w-12 h-12 rounded-full border-2 bg-dark p-2 text-sm font-bold text-white transition duration-300 hover:bg-opacity-70`}
            activeLinkClassName="bg-white border-dark !text-dark"
            marginPagesDisplayed={1}
            onPageChange={(e) => {
               const params = {
                  q: search || '',
                  page: String(e.selected + 1)
               }

               const queryString = new URLSearchParams(params).toString()

               push(`?${queryString}`)
            }}
            pageRangeDisplayed={2}
            previousLabel="<<"
            nextLabel=">>"
            pageCount={fonts.totalPages}
            prevRel={fonts.prevPage}
            nextRel={fonts.nextPage}
         />
      </div>
   )
}

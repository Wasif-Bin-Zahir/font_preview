'use client'

import { loadFont } from '@/app/_home/show-case/view'
import { FontData } from '@/types'
import Image from 'next/image'
import { useEffect } from 'react'
import Status from './status'
import Delete from './delete'

export default function Table({ fonts }: { fonts: FontData }) {
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
               className="grid grid-cols-4 space-x-6 rounded-xl border bg-gray-50 px-7 py-3 drop-shadow-sm"
            >
               <div className="col-span-4 max-w-7xl lg:col-span-3">
                  <p className="text-sm text-gray-300">
                     <span className="font-semibold">{font.name} </span>
                     by
                     <span className=""> {font.designer}</span>
                  </p>

                  <p
                     className="text-3xl text-gray-800"
                     style={{
                        fontFamily: font.name
                     }}
                  >
                     The quick brown fox jumps over the lazy dog
                  </p>
               </div>

               <div className="col-span-4 flex items-center justify-end gap-7 lg:col-span-1">
                  <div className="text-right"></div>

                  <Status id={font._id} status={font.status} />
                  <Delete id={font._id} name={font.name} designer={font.designer} />
               </div>
            </div>
         ))}
      </div>
   )
}

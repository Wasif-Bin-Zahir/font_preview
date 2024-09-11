'use client'

import Image from 'next/image'
import React, { useEffect } from 'react'
import Status from './status'
import { loadFont } from '@/app/_home/show-case/view'
import { FontType } from '@/app/_home/show-case'

export default function Table({ fonts }: { fonts: FontType[] }) {
   useEffect(() => {
      const fontFaces = fonts.map((font) => loadFont(font))

      return () => {
         fontFaces.forEach((fontFace) => document.fonts.delete(fontFace))
      }
   }, [fonts])

   if (fonts.length === 0) {
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
         {fonts.map((font, index) => (
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
                     className={`text-gray-800`}
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
               </div>
            </div>
         ))}
      </div>
   )
}

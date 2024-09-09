'use client'

import { useState } from 'react'
import Controller from './controller'
import View from './view'

export type FontType = {
   name: string
   designer: string
   preview: string
   download: string
   donation: string
}

export type TextTransform = 'uppercase' | 'lowercase' | 'capitalize' | 'none'

export default function ShowCase({ fonts }: { fonts: FontType[] }) {
   const [previewText, setPreviewText] = useState('Type here to preview font')
   const [fontSize, setFontSize] = useState(24)
   const [letterSpacing, setLetterSpacing] = useState(0)
   const [textTransform, setTextTransform] = useState<TextTransform>('none')

   return (
      <div className="mx-auto my-16 max-w-screen-2xl">
         <div className="grid grid-cols-1 gap-7 lg:grid-cols-3">
            <input
               type="text"
               className="border-ash w-full border-0 border-b-2 border-dashed bg-transparent text-lg"
               placeholder="Type here to preview font"
               onChange={(e) => {
                  if (e.target.value.length === 0)
                     setPreviewText('Type here to preview font')
                  else setPreviewText(e.target.value)
               }}
            />

            <Controller
               letterSpacing={letterSpacing}
               fontSize={fontSize}
               textTransform={textTransform}
               setTextTransform={setTextTransform}
               setFontSize={setFontSize}
               setLetterSpacing={setLetterSpacing}
            />
         </div>

         <hr className="h-7" />

         <View
            fonts={fonts}
            fontSize={fontSize}
            letterSpacing={letterSpacing}
            textTransform={textTransform}
            previewText={previewText}
         />
      </div>
   )
}

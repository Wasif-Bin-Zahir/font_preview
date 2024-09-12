'use client'

import { useState } from 'react'
import Controller from './controller'
import View from './view'
import { FontData } from '@/types'

export type TextTransform = 'uppercase' | 'lowercase' | 'capitalize' | 'none'
const defaultText = 'The quick brown fox jumps over the lazy dog'

export default function ShowCase({ fonts }: { fonts: FontData }) {
   const [previewText, setPreviewText] = useState(defaultText)
   const [fontSize, setFontSize] = useState(40)
   const [letterSpacing, setLetterSpacing] = useState(0)
   const [textTransform, setTextTransform] =
      useState<TextTransform>('capitalize')

   return (
      <div className="mx-auto my-7 max-w-screen-2xl">
         <div className="grid grid-cols-1 gap-7 lg:grid-cols-3">
            <input
               type="text"
               className="w-full border-0 border-b-2 border-dashed border-ash bg-transparent text-lg"
               placeholder="Type here to preview font"
               onChange={(e) => {
                  if (e.target.value.length === 0) setPreviewText(defaultText)
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

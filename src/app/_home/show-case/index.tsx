'use client'

import { useState } from 'react'
import Controller from './controller'
import PreviewInput from './preview-input'
import View from './view'

export type FontType = {
   name: string
   designer: string
   preview: string
   download: string
}

export type TextTransform = 'uppercase' | 'lowercase' | 'capitalize' | 'none'

export default function ShowCase({ fonts }: { fonts: FontType[] }) {
   const [previewText, setPreviewText] = useState('Type here to preview font')
   const [fontSize, setFontSize] = useState(24)
   const [letterSpacing, setLetterSpacing] = useState(0)
   const [textTransform, setTextTransform] = useState<TextTransform>('none')

   return (
      <>
         <PreviewInput
            previewText={previewText}
            setPreviewText={setPreviewText}
         />

         <Controller
            letterSpacing={letterSpacing}
            fontSize={fontSize}
            setTextTransform={setTextTransform}
            setFontSize={setFontSize}
            setLetterSpacing={setLetterSpacing}
         />

         <View
            fonts={fonts}
            fontSize={fontSize}
            letterSpacing={letterSpacing}
            textTransform={textTransform}
            previewText={previewText}
         />
      </>
   )
}

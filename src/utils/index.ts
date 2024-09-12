import { Font } from '@/types'

export function getValidFontName(id: string) {
   return id
      .replace(/\d/g, (match) => String.fromCharCode(96 + Number(match)))
      .replace(/[^a-zA-Z]/g, '')
}

export const loadFont = (font: Font) => {
   const url = `${process.env.NEXT_PUBLIC_FILE}${font.preview}`
   const fontFace = new FontFace(
      getValidFontName(font._id),
      `url(${encodeURI(url)})`
   )

   fontFace.load().then(() => {
      document.fonts.add(fontFace)
   })

   return fontFace
}

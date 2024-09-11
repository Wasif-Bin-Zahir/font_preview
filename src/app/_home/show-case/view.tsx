import { useEffect, useState } from 'react'
import Modal from 'react-modal'
import { FontType, TextTransform } from '.'
import ModalContent from '@/components/Modal'
import Image from 'next/image'
import { Download } from 'lucide-react'

type Props = {
   fonts: FontType[]
   fontSize: number
   letterSpacing: number
   textTransform: TextTransform
   previewText: string
}

export const loadFont = (font: FontType) => {
   const url = `${process.env.NEXT_PUBLIC_FILE}${font.preview}`
   const fontFace = new FontFace(font.name, `url(${url})`)

   fontFace.load().then(() => {
      document.fonts.add(fontFace)
   })

   return fontFace
}

export default function View({
   fonts,
   fontSize,
   letterSpacing,
   textTransform,
   previewText
}: Props) {
   const [modal, setModal] = useState(false)
   const [downloadLink, setDownloadLink] = useState('')
   const [donationLink, setDonationLink] = useState<string | null>(null)

   const handleDownloadModal = (
      downloadLink: string,
      donationLink?: string
   ) => {
      setModal(true)
      setDownloadLink(downloadLink)
      donationLink && setDonationLink(donationLink)
   }

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
         <Modal isOpen={modal}>
            <ModalContent
               donationLink={donationLink}
               downloadLink={downloadLink}
               onClose={() => {
                  setModal(false)
                  setDonationLink(null)
               }}
            />
         </Modal>

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
                        fontFamily: font.name,
                        fontSize: `${fontSize}px`,
                        letterSpacing: `${letterSpacing}px`,
                        textTransform:
                           textTransform === 'none' ? 'none' : textTransform
                     }}
                  >
                     {previewText}
                  </p>
               </div>

               <div className="col-span-4 flex items-center justify-end gap-7 lg:col-span-1">
                  <div className="text-right"></div>

                  <button
                     title="Download"
                     onClick={() =>
                        handleDownloadModal(font.download, font.donation)
                     }
                     className="rounded-full border-2 bg-dark p-2 text-sm font-bold text-white transition duration-300 hover:bg-opacity-70"
                  >
                     <Download />
                  </button>
               </div>
            </div>
         ))}
      </div>
   )
}

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

   const loadFont = (font: FontType) => {
      const url = `${process.env.NEXT_PUBLIC_FILE}${font.preview}`
      const fontFace = new FontFace(font.name, `url(${url})`)

      fontFace.load().then(() => {
         document.fonts.add(fontFace)
      })

      return fontFace
   }

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

            <p className="text-dark my-7 text-center text-xl">
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
               className="flex flex-col items-center space-x-6 rounded-xl bg-gray-50 px-7 py-3 lg:flex-row"
            >
               <div className="max-w-7xl grow">
                  <p
                     className={`text-gray-800 font-[${font.name}]`}
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

               <div className="flex items-center justify-between gap-7">
                  <div className="text-right">
                     <h3 className="text-lg font-semibold">{font.name}</h3>

                     <p className="italic text-gray-700"> by {font.designer}</p>
                  </div>

                  {/* <a href={`${font.download}`}> */}
                  <button
                     onClick={() =>
                        handleDownloadModal(font.download, font.donation)
                     }
                     className="bg-primary hover:bg-secondary rounded-full border-2 p-3 text-sm font-bold text-white transition duration-300 hover:text-white"
                  >
                     <Download />
                  </button>
                  {/* </a> */}
               </div>
            </div>
         ))}
      </div>
   )
}

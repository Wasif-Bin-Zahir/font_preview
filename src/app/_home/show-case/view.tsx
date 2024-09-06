import { useEffect, useState } from 'react'
import Modal from 'react-modal'
import { FontType, TextTransform } from '.'
import ModalContent from '@/components/Modal'

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
      const fontFace = new FontFace(font.name, `url(${font.preview})`)

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
               className="flex items-center space-x-6 border-b border-gray-300 pb-4 mx-24"
            >
               <div className="flex-1">
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

               <div className="flex-1 flex items-center justify-between">
                  <div className="flex-1">
                     <h3 className="text-lg font-semibold text-gray-900">
                        {font.name}
                     </h3>
                     <p className="text-gray-700">{font.designer}</p>
                  </div>

                  {/* <a href={`${font.download}`}> */}
                  <button
                     onClick={() =>
                        handleDownloadModal(font.download, font.donation)
                     }
                     className="px-3 py-1.5 font-bold text-gray-500 rounded-lg  border border-orange-500 shadow-md hover:bg-orange-400 hover:text-white transition duration-300 text-sm"
                  >
                     Font Download
                  </button>
                  {/* </a> */}
               </div>
            </div>
         ))}
      </div>
   )
}

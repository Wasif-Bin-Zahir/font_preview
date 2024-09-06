// Modal.tsx
import Link from 'next/link'
import React from 'react'

type ModalProps = {
   onClose: () => void
   donationLink: string | null
   downloadLink: string
}

const ModalContent: React.FC<ModalProps> = ({
   donationLink,
   onClose,
   downloadLink
}) => {
   return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
    <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg w-96">
      {donationLink && (
        <>
          <h2 className="text-2xl font-bold mb-4">Support the Designer</h2>
          <p className="mb-4 text-gray-300">
            If you like this font, consider donating to the designer:
          </p>
          <Link
            href={donationLink}
            className="text-blue-400 hover:text-blue-300 underline mb-6 block text-lg"
            target="_blank"
            rel="noopener noreferrer"
          >
            Donate here
          </Link>
        </>
      )}
  
      <div className="flex justify-center gap-4 mt-4">
        <button
          className="bg-gray-600 hover:bg-gray-700 text-white font-semibold px-4 py-2 rounded-md"
          onClick={onClose}
        >
          Cancel
        </button>
        <Link href={downloadLink} download>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-md">
            Continue Download
          </button>
        </Link>
      </div>
    </div>
  </div>
  
   )
}

export default ModalContent

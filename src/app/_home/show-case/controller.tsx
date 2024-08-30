import { Dispatch, SetStateAction } from 'react'
import { TextTransform } from '.'

type Props = {
   letterSpacing: number
   fontSize: number

   setLetterSpacing: Dispatch<SetStateAction<number>>
   setFontSize: Dispatch<SetStateAction<number>>
   setTextTransform: Dispatch<SetStateAction<TextTransform>>
}

export default function Controller({
   letterSpacing,
   fontSize,
   setTextTransform,
   setFontSize,
   setLetterSpacing
}: Props) {
   return (
      <div
         style={{
            margin: '20px 100px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
         }}
      >
         <div className="flex justify-center space-x-4 ">
            <button
               onClick={() => setTextTransform('uppercase')}
               className="px-3 py-1 text-lg font-semibold border border-orange-500 rounded-md hover:bg-orange-500 transition duration-300"
            >
               AA
            </button>
            <button
               onClick={() => setTextTransform('capitalize')}
               className="px-3 py-1 text-lg font-semibold border border-orange-500 rounded-md hover:bg-orange-500 transition duration-300"
            >
               Aa
            </button>
            <button
               onClick={() => setTextTransform('lowercase')}
               className="px-3 py-1 text-lg font-semibold border border-orange-500 rounded-md hover:bg-orange-500 transition duration-300"
            >
               aa
            </button>
         </div>

         <div className="flex items-center space-x-6 p-4 rounded-lg ">
            <div className="flex items-center space-x-2">
               <label className="text-gray-700 font-medium">
                  Letter Spacing
               </label>

               <input
                  type="range"
                  min="0"
                  max="100"
                  value={letterSpacing}
                  onChange={(e) => setLetterSpacing(Number(e.target.value))}
                  className="w-48 h-0 leading-none p-0 bg-gray-300 rounded-lg appearance-none cursor-pointer
             "
               />
            </div>

            <div className="flex items-center space-x-2">
               <label className="text-gray-700 font-medium">Font Size</label>
               <input
                  type="range"
                  min="12"
                  max="48"
                  value={fontSize}
                  onChange={(e) => setFontSize(Number(e.target.value))}
                  className="w-48 h-0 bg-gray-300 p-0 rounded-lg appearance-none cursor-pointer"
               />
               {/* <span className="text-gray-700">{fontSize}px</span> */}
            </div>
         </div>
      </div>
   )
}

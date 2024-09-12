import { Dispatch, SetStateAction } from 'react'
import { TextTransform } from '.'
import { MoveDiagonal, MoveHorizontal } from 'lucide-react'

type Props = {
   letterSpacing: number
   fontSize: number
   textTransform: TextTransform
   setLetterSpacing: Dispatch<SetStateAction<number>>
   setFontSize: Dispatch<SetStateAction<number>>
   setTextTransform: Dispatch<SetStateAction<TextTransform>>
}

export default function Controller({
   letterSpacing,
   fontSize,
   textTransform,
   setTextTransform,
   setFontSize,
   setLetterSpacing
}: Props) {
   return (
      <div className="col-span-2 flex flex-wrap gap-3 p-3">
         {/* font size */}
         <div className="mx-auto mb-3 flex flex-col gap-3">
            <label className="flex items-end gap-1 text-sm font-bold">
               a
               <MoveDiagonal />
               <span className="text-xl">a</span>
            </label>

            <input
               type="range"
               min="12"
               max="128"
               value={fontSize}
               onChange={(e) => setFontSize(Number(e.target.value))}
               className="h-0 w-48 cursor-pointer appearance-none rounded-lg bg-gray-300 p-0"
            />
         </div>

         {/* letter spacing */}
         <div className="mx-auto mb-3 flex flex-col gap-3">
            <label className="flex items-center gap-3 text-xl font-bold">
               a
               <MoveHorizontal /> a
            </label>

            <input
               type="range"
               min="0"
               max="70"
               value={letterSpacing}
               onChange={(e) => setLetterSpacing(Number(e.target.value))}
               className="h-0 w-48 cursor-pointer appearance-none rounded-lg bg-gray-300 p-0 leading-none"
            />
         </div>

         {/* capitalization */}
         <div className="mx-auto flex justify-center gap-3">
            <button
               onClick={() => setTextTransform('uppercase')}
               className={`border-b-4 px-3 text-lg font-semibold transition duration-300 hover:border-dark ${textTransform === 'uppercase' ? 'border-dark text-dark' : 'border-transparent text-dark'}`}
            >
               AA
            </button>

            <button
               onClick={() => setTextTransform('capitalize')}
               className={`border-b-4 px-3 text-lg font-semibold transition duration-300 hover:border-dark ${textTransform === 'capitalize' ? 'border-dark text-dark' : 'border-transparent text-dark'}`}
            >
               Aa
            </button>
            <button
               onClick={() => setTextTransform('lowercase')}
               className={`border-b-4 px-3 text-lg font-semibold transition duration-300 hover:border-dark ${textTransform === 'lowercase' ? 'border-dark text-dark' : 'border-transparent text-dark'}`}
            >
               aa
            </button>
         </div>
      </div>
   )
}

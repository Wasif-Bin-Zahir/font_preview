import { Dispatch, SetStateAction } from 'react'

type Props = {
   previewText: string
   setPreviewText: Dispatch<SetStateAction<string>>
}

export default function previewInput({ previewText, setPreviewText }: Props) {
   return (
      <div className="mx-[200px] mt-4">
         <input
            type="text"
            placeholder="Type here to preview font"
            onChange={(e) => {
               if (e.target.value.length === 0)
                  setPreviewText('Type here to preview font')
               else setPreviewText(e.target.value)
            }}
            style={{
               width: '100%',
               padding: '10px',
               fontSize: '18px',
               marginBottom: '20px'
            }}
         />
      </div>
   )
}

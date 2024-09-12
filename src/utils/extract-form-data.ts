import { NextRequest } from 'next/server'

export default async function extractFormData(req: NextRequest) {
   const formData = await req.formData()
   const extractedFormData: { [key: string]: string } = {}
   const files: File[] = []

   formData.forEach((value: FormDataEntryValue, key: string) => {
      if (value instanceof File) {
         files.push(value)
         return
      }

      extractedFormData[key] = value
   })

   return { extractedFormData, files }
}

import connectDB from '@/lib/mongodb'
import Font from '@/models/Font'
import { NextRequest, NextResponse } from 'next/server'
import extractFormData from './extract-form-data'
import fileUpload from './file-upload'

export async function POST(req: NextRequest) {
   try {
      await connectDB()

      const { extractedFormData, files } = await extractFormData(req)
      const { name, designer, web, donation } = extractedFormData
      const { filePaths, preview, download } = await fileUpload(name, files)

      await new Font({
         name,
         designer,
         web,
         donation,
         files: filePaths,
         preview,
         download
      }).save()

      return NextResponse.json({
         success: true,
         message: 'Your font is submitted for approval'
      })
   } catch (error) {
      console.error('Error while uploading:', error)

      return NextResponse.json({
         success: false,
         message: 'Something went wrong'
      })
   }
}

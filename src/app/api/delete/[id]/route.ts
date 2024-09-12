import connectDB from '@/lib/mongodb'
import Font from '@/models/Font'
import fs from 'fs'
import { NextRequest, NextResponse } from 'next/server'
import path from 'path'

export async function DELETE(
   req: NextRequest,
   { params }: { params: { id: string } }
) {
   try {
      await connectDB()

      const font = await Font.findOne({ _id: params.id })

      if (!font) {
         return NextResponse.json({
            success: false,
            message: 'Font not found'
         })
      }

      await Font.deleteOne({ _id: params.id })

      const PREVIEW_DIR = path.join(process.cwd(), 'public', font.preview)
      fs.unlink(PREVIEW_DIR, (err) => {
         if (err) throw console.error('Error while deleting preview:', err)
      })

      const DOWNLOAD_DIR = path.join(process.cwd(), 'public', font.download)
      fs.unlink(DOWNLOAD_DIR, (err) => {
         if (err) throw console.error('Error while deleting zip:', err)
      })

      return NextResponse.json({
         success: true
      })
   } catch (error) {
      console.error('Error while deleting:', error)

      return NextResponse.json({
         success: false,
         message: 'Something went wrong'
      })
   }
}

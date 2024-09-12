import fs from 'fs'
import { nanoid } from 'nanoid'
import path from 'path'
import slugify from 'slugify'
import { zip } from 'zip-a-folder'

export default async function fileUpload(name: string, files: File[]) {
   const folderID = nanoid() // Generate a random folder ID

   const UPLOAD_DIR = path.join(process.cwd(), `public/uploads/${folderID}`)
   const PREVIEW_DIR = path.join(process.cwd(), `public/previews/${folderID}`)
   const ZIP_DIR = path.join(process.cwd(), `public/compressed/${folderID}`)

   let preview: string = ''

   if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true })
   if (!fs.existsSync(PREVIEW_DIR))
      fs.mkdirSync(PREVIEW_DIR, { recursive: true })
   if (!fs.existsSync(ZIP_DIR)) fs.mkdirSync(ZIP_DIR, { recursive: true })

   const filePaths: string[] = await Promise.all(
      files.map(async (file: any) => {
         const buffer = Buffer.from(await file.arrayBuffer()) // Convert File to Buffer
         const uploadPath = path.join(UPLOAD_DIR, file.name)

         fs.writeFileSync(uploadPath, buffer) // Write file to disk

         if (
            preview === '' &&
            (file.type.includes('font') ||
               file.type.includes('application/octet-stream'))
         ) {
            fs.writeFileSync(path.join(PREVIEW_DIR, file.name), buffer)
            preview = `/previews/${folderID}/${file.name}`
         }

         return `/uploads/${folderID}/${file.name}`
      })
   )

   // store the zip
   const download = `/compressed/${folderID}/${slugify(name)}.zip`
   await zip(UPLOAD_DIR, path.join(process.cwd(), `public${download}`))

   // delete uploaded files
   fs.rm(UPLOAD_DIR, { recursive: true, force: true }, (err) => {
      if (err) throw console.error('Error while deleting uploaded files:', err)
   })

   return { filePaths, preview, download }
}

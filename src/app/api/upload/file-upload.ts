import fs from 'fs'
import { nanoid } from 'nanoid'
import path from 'path'
import slugify from 'slugify'
import { zip } from 'zip-a-folder'

export default async function fileUpload(name: string, files: File[]) {
   const folderID = nanoid()
   const UPLOAD_DIR = path.join(process.cwd(), `public/files/${folderID}`)
   const fonts: string[] = []

   if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true }) // Create directory if it doesn't exist

   const filePaths: string[] = await Promise.all(
      files.map(async (file: any) => {
         const buffer = Buffer.from(await file.arrayBuffer()) // Convert File to Buffer
         const filePath = path.join(UPLOAD_DIR, file.name)
         fs.writeFileSync(filePath, buffer) // Write file to disk

         const relativePath = `/files/${folderID}/${file.name}`

         if (
            file.type.includes('font') ||
            file.type.includes('application/octet-stream')
         )
            fonts.push(relativePath)

         return relativePath
      })
   )

   fs.mkdirSync(path.join(process.cwd(), `public/fonts/${folderID}`), {
      recursive: true
   })
   const download = `/fonts/${folderID}/${slugify(name)}.zip`

   await zip(UPLOAD_DIR, path.join(process.cwd(), `public${download}`))

   return { filePaths, preview: fonts[0], download }
}

import fs from 'fs'
import path from 'path'
import { nanoid } from 'nanoid'
import { zip } from 'zip-a-folder'

export default async function fileUpload(files: any) {
   const folderID = nanoid()
   const UPLOAD_DIR = `./public/files/${folderID}`
   const fonts: string[] = []

   if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true }) // Create directory if it doesn't exist

   const filePaths: string[] = await Promise.all(
      files.map(async (file: any) => {
         const buffer = Buffer.from(await file.arrayBuffer()) // Convert File to Buffer
         const filePath = path.join(UPLOAD_DIR, file.name)
         fs.writeFileSync(filePath, buffer) // Write file to disk

         const relativePath = `/files/${folderID}/${file.name}`
         console.log(
            'File uploaded:',
            relativePath,
            file.type,
            file.type.includes('font')
         )

         if (
            file.type.includes('font') ||
            file.type.includes('application/octet-stream')
         )
            fonts.push(relativePath)

         return relativePath
      })
   )

   await zip(UPLOAD_DIR, `./public/fonts/${folderID}.zip`)

   return { filePaths, preview: fonts[0], download: folderID }
}

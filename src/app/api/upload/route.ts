import connectDB from "@/lib/mongodb"
import Font from "@/models/Font"
import AdmZip from "adm-zip"
import fs from "fs"
import { NextResponse } from "next/server"
import path from "path"

export const config = {
  api: {
    bodyParser: false,
  },
}

const UPLOAD_DIR = "./files"

export async function POST(req: any) {
  try {
    await connectDB()

    const formData = await req.formData() //extract data from form
    const fontName = formData.get("fontName")
    const designerName = formData.get("designerName")
    const designerWebsite = formData.get("designerWebsite")
    const donationLink = formData.get("donationLink")
    const hasPermission = formData.get("hasPermission") === "true"
    const file = formData.get("file")   //file retreive

    let filePaths: string[] = []

    if (file && file.type === "application/x-zip-compressed") {
      const buffer = Buffer.from(await file.arrayBuffer())

      if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR)

      const zipFilePath = path.join(UPLOAD_DIR, file.name)
      fs.writeFileSync(zipFilePath, buffer)

      const extractedDir = path.join(
        process.cwd(),
        `/files/${Math.floor(1000000 + Math.random() * 9000000)}`,
      )
      try {
        const zip = new AdmZip(zipFilePath)
        zip.extractAllTo(extractedDir)
      } catch (e) {
        console.log("Unzip error:", e)
      }

      const files = fs.readdirSync(extractedDir)

      files.forEach((fontFile) => {
        const filePath = path.join(extractedDir, fontFile)
        filePaths.push(filePath)
      })

      // Optionally remove the original zip file
      // fs.unlink(zipFilePath, () => {});
    } else {
      throw new Error("Only .zip files are allowed")
    }

    const newPendingFont = await new Font({
      hasPermission,
      fontName,
      designerName,
      designerWebsite,
      donationLink,
      files: filePaths,
    }).save()

    return NextResponse.json({
      status: "success",
      message: "Font submitted for approval",
      data: newPendingFont,
    })
  } catch (error: any) {
    console.error("Error uploading file:", error)

    return NextResponse.json({ status: "error", message: error.message })
  }
}

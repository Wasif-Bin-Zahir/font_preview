import fs from "fs"
import { NextRequest, NextResponse } from "next/server"
import path from "path"

import cloudinary from "cloudinary"

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// Disable Next.js body parser to handle form-data
export const config = {
  api: {
    bodyParser: false,
  },
}

const UPLOAD_DIR = "./files"

export async function POST(req: any) {
  try {
    const formData = await req.formData()
    const file = formData.get("file")
    const name = formData.get("name")
    const email = formData.get("email")

    if (file) {
      const buffer = Buffer.from(await file.arrayBuffer())

      // Ensure the directory exists
      if (!fs.existsSync(UPLOAD_DIR)) {
        fs.mkdirSync(UPLOAD_DIR, { recursive: true })
      }

      // Construct the full file path, including the file name
      const filePath = path.join(UPLOAD_DIR, file.name)

      // Write the file to the specified directory
      fs.writeFileSync(filePath, buffer)

      const result = await cloudinary.v2.uploader.upload(filePath, {
        resource_type: "raw",
      })

      fs.unlink(filePath, () => {})

      console.log(result)
    }

    return NextResponse.json({ status: "success", data: file.size })
    // return NextResponse.json({ success: true, url: result.secure_url })
  } catch (error) {
    console.error("Error uploading file:", error)

    return NextResponse.json(
      // { success: false, error: error.message },
      { status: 500 },
    )
  }
}

// export async function POST(req: IncomingMessage) {
// const form = new IncomingForm({
//   multiples: true, // To handle multiple files if needed
// });

// return new Promise<NextResponse>((resolve, reject) => {
//   form.parse(req, async (err: Error | null, fields: formidable.Fields, files: formidable.Files) => {
//     if (err) {
//       console.error('Form parse error:', err);
//       return resolve(NextResponse.json({ msg: ["Error parsing form data"] }));
//     }

//     const { hasPermission, fontName, designerName, designerWebsite, donationLink } = fields as any;
//     const file = files.file ? (Array.isArray(files.file) ? files.file[0] : files.file) : undefined;

//     console.log('Form fields:', fields);
//     console.log('Uploaded file:', file);

//     try {
//       await connectDB();

//       // Handle file storage and create file path
//       const filePath = file ? file.filepath : null;

//       // Save form data and file info to MongoDB
//       await FontSubmission.create({
//         hasPermission: hasPermission ? hasPermission.includes('on') : false, // Convert checkbox value to boolean
//         fontName: fontName ? fontName[0] : '',
//         designerName: designerName ? designerName[0] : '',
//         designerWebsite: designerWebsite ? designerWebsite[0] : '', // Optional chaining
//         donationLink: donationLink ? donationLink[0] : '', // Optional chaining
//         file: filePath, // Save file path or file metadata
//       });

//       return resolve(NextResponse.json({
//         msg: ["Form submitted successfully"],
//         success: true,
//       }));
//     } catch (error) {
//       if (error instanceof mongoose.Error.ValidationError) {
//         const errorList: string[] = [];
//         for (const e in error.errors) {
//           errorList.push(error.errors[e].message);
//         }
//         console.log('Validation errors:', errorList);
//         return resolve(NextResponse.json({ msg: errorList }));
//       } else {
//         console.error('Server error:', error);
//         return resolve(NextResponse.json({ msg: ["Unable to submit form."] }));
//       }
//     }
//   });
// });
// }

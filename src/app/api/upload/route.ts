import { NextRequest, NextResponse } from 'next/server';
import cloudinary from 'cloudinary';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

// Configure Cloudinary with your credentials
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const UPLOAD_DIR = './files'

export async function POST(req: any) {
  
  try {
    const formData = await req.formData();
        const file = formData.get('file')
      
        

        if (file) {
          const buffer = Buffer.from(await file.arrayBuffer());
      
          // Ensure the directory exists
          if (!fs.existsSync(UPLOAD_DIR)) {
              fs.mkdirSync(UPLOAD_DIR, { recursive: true });
          }
      
          // Construct the full file path, including the file name
          const filePath = path.join(UPLOAD_DIR, file.name);
      
          // Write the file to the specified directory
          fs.writeFileSync(filePath, buffer)

          const result = await cloudinary.v2.uploader.upload(filePath, {
            resource_type: 'raw',
             });

             fs.unlink(filePath, ()=>{})

             console.log(result)
      }

     
        
        return NextResponse.json({status:"success",data:file.size})

    // const file = files.file;
    // const filePath = file.filepath;

    // Upload font file to Cloudinary
//     const result = await cloudinary.v2.uploader.upload(filePath, {
//       resource_type: 'raw',
//     });
// console.log(39);
    // // // Delete local file after upload
    // // (err) => {
    // //   if (err) {
    // //     console.error('Error deleting the file:', err);
    // //   } else {
    // //     console.log('File deleted successfully:', filePath);
    // //   }
    // // });

    return NextResponse.json({ success: true, url: result.secure_url });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

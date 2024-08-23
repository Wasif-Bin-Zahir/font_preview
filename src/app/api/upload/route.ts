import connectDB from "@/app/lib/mongodb";
import FontSubmission from "@/app/models/form";
import { NextResponse } from "next/server";
import formidable, { IncomingForm } from "formidable";
import fs from "fs";
import path from "path";
import mongoose from "mongoose";
import { IncomingMessage } from "http";

// Disable Next.js body parser to handle form-data
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: IncomingMessage) {
  const form = new IncomingForm({
    multiples: true, // To handle multiple files if needed
  });

  return new Promise<NextResponse>((resolve, reject) => {
    form.parse(req, async (err: Error | null, fields: formidable.Fields, files: formidable.Files) => {
      if (err) {
        console.error('Form parse error:', err);
        return resolve(NextResponse.json({ msg: ["Error parsing form data"] }));
      }

      const { hasPermission, fontName, designerName, designerWebsite, donationLink } = fields as any;
      const file = files.file ? (Array.isArray(files.file) ? files.file[0] : files.file) : undefined;

      console.log('Form fields:', fields);
      console.log('Uploaded file:', file);

      try {
        await connectDB();

        // Handle file storage and create file path
        const filePath = file ? file.filepath : null;

        // Save form data and file info to MongoDB
        await FontSubmission.create({
          hasPermission: hasPermission ? hasPermission.includes('on') : false, // Convert checkbox value to boolean
          fontName: fontName ? fontName[0] : '',
          designerName: designerName ? designerName[0] : '',
          designerWebsite: designerWebsite ? designerWebsite[0] : '', // Optional chaining
          donationLink: donationLink ? donationLink[0] : '', // Optional chaining
          file: filePath, // Save file path or file metadata
        });

        return resolve(NextResponse.json({
          msg: ["Form submitted successfully"],
          success: true,
        }));
      } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
          const errorList: string[] = [];
          for (const e in error.errors) {
            errorList.push(error.errors[e].message);
          }
          console.log('Validation errors:', errorList);
          return resolve(NextResponse.json({ msg: errorList }));
        } else {
          console.error('Server error:', error);
          return resolve(NextResponse.json({ msg: ["Unable to submit form."] }));
        }
      }
    });
  });
}

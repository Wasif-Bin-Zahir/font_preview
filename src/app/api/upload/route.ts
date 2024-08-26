import fs from "fs";
import { NextResponse } from "next/server";
import path from "path";
import cloudinary from "cloudinary";
import connectDB from "@/lib/mongodb";
import Font from "@/models/Form";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Disable Next.js body parser to handle form-data
export const config = {
  api: {
    bodyParser: false,
  },
};

const UPLOAD_DIR = "./files";

export async function POST(req: any) {
  try {
    await connectDB(); // Ensure the database is connected

    const formData = await req.formData();
    const fontName = formData.get("fontName");
    const designerName = formData.get("designerName");
    const designerWebsite = formData.get("designerWebsite");
    const donationLink = formData.get("donationLink");
    const hasPermission = formData.get("hasPermission") === "true";
    const file = formData.get("file");

    let filePath = null;
    if (file) {
      const buffer = Buffer.from(await file.arrayBuffer());

      if (!fs.existsSync(UPLOAD_DIR)) {
        fs.mkdirSync(UPLOAD_DIR, { recursive: true });
      }

      filePath = path.join(UPLOAD_DIR, file.name);
      fs.writeFileSync(filePath, buffer);

      const result = await cloudinary.v2.uploader.upload(filePath, {
        resource_type: "raw",
      });

      fs.unlink(filePath, () => {});
      filePath = result.secure_url; // Store Cloudinary URL in database
    }

    // Save the form data to the MongoDB database
    const newFont = await new Font({
      hasPermission,
      fontName,
      designerName,
      designerWebsite,
      donationLink,
      file: filePath, // Store file URL
    }).save();

    return NextResponse.json({ status: "success", message: "Form data saved successfully" });
  } catch (error) {
    console.error("Error uploading file:", error);

    // Type guard to check if the error is an instance of Error
    if (error instanceof Error) {
      return NextResponse.json({ status: "error", message: error.message });
    } else {
      // Handle cases where the error might not be an instance of Error
      return NextResponse.json({ status: "error", message: "An unknown error occurred." });
    }
  }
}

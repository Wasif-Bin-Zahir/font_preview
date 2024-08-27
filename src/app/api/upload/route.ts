import fs from "fs";
import { NextResponse } from "next/server";
import path from "path";
import connectDB from "@/lib/mongodb";
import Font from "@/models/Form";
import AdmZip from "adm-zip";

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

    let filePaths: string[] = []; // Array to store the local file paths

    if (file && file.type === "application/x-zip-compressed") {
      const buffer = Buffer.from(await file.arrayBuffer());

      if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR);

      const zipFilePath = path.join(UPLOAD_DIR, file.name);
      fs.writeFileSync(zipFilePath, buffer);

      const extractedDir = path.join(
        process.cwd(),
        `/files/${Math.floor(1000000 + Math.random() * 9000000)}`
      );
      try {
        const zip = new AdmZip(zipFilePath);
        zip.extractAllTo(extractedDir);
      } catch (e) {
        console.log("Unzip error:", e);
      }

      const files = fs.readdirSync(extractedDir);

      files.forEach((fontFile) => {
        const filePath = path.join(extractedDir, fontFile);
        filePaths.push(filePath); // Save the local file path
      });

      console.log(filePaths);

      // Optionally, remove the original zip file after extraction
      // fs.unlink(zipFilePath, () => {});
    } else {
      throw new Error("Only .zip files are allowed");
    }

    // Save the form data and file paths to the MongoDB database
    const newFont = await new Font({
      hasPermission,
      fontName,
      designerName,
      designerWebsite,
      donationLink,
      files: filePaths, // Store file paths as an array
    }).save();

    return NextResponse.json({
      status: "success",
      message: "Form data saved successfully",
      data: newFont, // Return the saved data
    });
  } catch (error) {
    console.error("Error uploading file:", error);

    if (error instanceof Error) {
      return NextResponse.json({ status: "error", message: error.message });
    } else {
      return NextResponse.json({
        status: "error",
        message: "An unknown error occurred.",
      });
    }
  }
}

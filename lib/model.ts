// lib/models.ts
import mongoose, { Schema, Document } from 'mongoose';

interface FontDocument extends Document {
  fontName: string;
  designer: string;
  designerWebsite: string;
  donationLink: string;
  isDesignYours: boolean;
}

interface AdminDocument extends Document {
  email: string;
  password: string;
}

const fontSchema = new Schema<FontDocument>({
  fontName: { type: String, required: true },
  designer: { type: String, required: true },
  designerWebsite: { type: String, required: true },
  donationLink: { type: String, required: true },
  isDesignYours: { type: Boolean, required: true },
});

const adminSchema = new Schema<AdminDocument>({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const Font = mongoose.models.Font || mongoose.model<FontDocument>('Font', fontSchema);
const Admin = mongoose.models.Admin || mongoose.model<AdminDocument>('Admin', adminSchema);

export { Font, Admin };

import mongoose, { Schema, model, models } from "mongoose";

const PendingFontSchema = new Schema({
  fontName: {
    type: String,
    required: true,
  },
  designerName: {
    type: String,
    required: true,
  },
  designerWebsite: {
    type: String,
    required: false,
  },
  donationLink: {
    type: String,
    required: false,
  },
  hasPermission: {
    type: Boolean,
    required: true,
  },
  files: {
    type: [String], // Array of file paths
    required: true,
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
});

export default models.PendingFont || model("PendingFont", PendingFontSchema);

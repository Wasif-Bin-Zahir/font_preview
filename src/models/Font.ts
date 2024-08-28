import { Schema, model, models } from 'mongoose'
import { boolean } from 'zod'

const FontSchema = new Schema(
   {
      fontName: {
         type: String,
         required: true
      },
      designerName: {
         type: String,
         required: true
      },
      designerWebsite: {
         type: String,
         required: false
      },
      donationLink: {
         type: String,
         required: false
      },
      files: {
         type: [String],
         required: true
      },
      status: {
         type: Boolean,
         default: false
      },
      approvedAt: {
         type: Date,
         default: Date.now
      }
   },
   {
      timestamps: true,
      versionKey: false
   }
)

export default models.Font || model('Font', FontSchema)

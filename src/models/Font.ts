import { Schema, model, models } from 'mongoose'

const FontSchema = new Schema(
   {
      name: {
         type: String,
         required: true
      },
      preview: {
         type: String,
         required: true
      },
      designer: {
         type: String,
         required: true
      },
      web: {
         type: String,
         required: false
      },
      donation: {
         type: String,
         required: false
      },
      files: {
         type: [String],
         required: true
      },
      download: {
         type: String,
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

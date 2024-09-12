import { Schema, model, models, PaginateModel } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

interface Doc extends Document {
   name: string
   preview: string
   designer: string
   web: string
   donation: string
   files: string[]
   download: string
   status: boolean
   approvedAt: Date
}

const FontSchema = new Schema<Doc>(
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

FontSchema.plugin(mongoosePaginate)
export default models.Font || model<Doc, PaginateModel<Doc>>('Font', FontSchema)

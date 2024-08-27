// schemas/fontSubmissionSchema.ts
import { z } from "zod"

export const fontSubmissionSchema = z.object({
  fontName: z.string().min(1,{ message: "Font Name is required" }),
  designerName: z.string().min(1,{ message: "Designer Name is required" }),
  designerWebsite: z.string().optional(),
  donationLink: z.string().optional(),
  hasPermission: z
    .string({ invalid_type_error: "Choose one" })
    .refine((val) => val === "true", {
      message: "You must have permission",
    })
    .transform((val) => val === "true"),
})

export type FontSubmissionForm = z.infer<typeof fontSubmissionSchema>



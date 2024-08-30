import { z } from 'zod'

export const fontSubmissionSchema = z.object({
   name: z.string().min(1, { message: 'Font name is required' }),
   designer: z.string().min(1, { message: 'Designer name is required' }),
   web: z.string().optional(),
   donation: z.string().optional(),
   oath: z.boolean({
      required_error: 'Please confirm this statement'
   }),
   files: z.any()
})

export type FontSubmissionForm = z.infer<typeof fontSubmissionSchema>

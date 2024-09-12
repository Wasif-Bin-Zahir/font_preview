import { z } from 'zod'

export const fontSubmissionSchema = z.object({
   name: z.string().min(1, { message: 'Font name is required' }),
   designer: z.string().min(1, { message: 'Designer name is required' }),
   web: z.string().url('Invalid URL').optional(),
   donation: z.string().url('Invalid URL').optional(),
   oath: z.boolean().refine((value) => value === true, {
      message: 'Please confirm this statement'
   }),
   files: z.custom<FileList>(
      (files) => files.length > 0,
      'Font file is required'
   )
})

export type FontSubmissionForm = z.infer<typeof fontSubmissionSchema>

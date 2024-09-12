import { z } from 'zod'

export const contactSubmissionSchema = z.object({
   name: z.string().min(1, { message: 'Font name is required' }),
   designer: z.string().min(1, { message: 'Designer name is required' }),
   web: z
      .string()
      .refine(
         (value) => value === '' || z.string().url().safeParse(value).success,
         {
            message: 'Invalid URL (e.g: https://example.com)'
         }
      )
      .optional(),
   donation: z
      .string()
      .refine(
         (value) => value === '' || z.string().url().safeParse(value).success,
         {
            message: 'Invalid URL (e.g: https://example.com)'
         }
      )
      .optional(),
   oath: z.boolean().refine((value) => value === true, {
      message: 'Please confirm this statement'
   }),
   files: z.custom<FileList>(
      (files) => files.length > 0,
      'Font file is required'
   )
})

export type ContactSchema = z.infer<typeof contactSubmissionSchema>

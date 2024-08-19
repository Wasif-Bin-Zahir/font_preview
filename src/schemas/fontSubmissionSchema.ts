// schemas/fontSubmissionSchema.ts
import { z } from 'zod';

export const fontSubmissionSchema = z.object({
  fontName: z.string().nonempty({ message: 'Font Name is required' }),
  designerName: z.string().nonempty({ message: 'Designer Name is required' }),
  designerWebsite: z.string().optional(),
  donationLink: z.string().optional(),
  hasPermission: z.boolean().refine(val => val === true, {
    message: 'You must have permission to submit this font',
  }),
});

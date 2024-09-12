'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { fontSubmissionSchema, type FontSubmissionSchema } from './validation'
import { Loader2 } from 'lucide-react'

export default function SubmitFontPage() {
   const {
      register,
      handleSubmit,
      reset,
      formState: { errors, isSubmitting }
   } = useForm<FontSubmissionSchema>({
      resolver: zodResolver(fontSubmissionSchema)
   })

   const onSubmit = async (data: FontSubmissionSchema) => {
      const formData = new FormData()
      console.log(data)

      Object.entries(data).forEach(([key, value]) => {
         if (value instanceof FileList) {
            Array.from(value).forEach((file) => {
               formData.append(key, file)
            })
         } else {
            formData.append(key, value as string)
         }
      })

      try {
         const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/upload`, {
            method: 'POST',
            body: formData
         })
         const result = await res.json()

         if (result.success) {
            reset()
            toast.success('Your font is submitted for approval')
         } else {
            toast.error('Something went wrong')
         }
      } catch (error) {
         console.error('Error while uploading:', error)
         toast.error('Something went wrong')
      }
   }

   return (
      <div className="mx-auto my-7 max-w-lg">
         <h1 className="my-7 text-center text-3xl font-bold">Submit Font</h1>

         <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-3"
         >
            <div>
               <label>
                  Font Name
                  <span className="mx-1 text-red-500">*</span>
               </label>

               <input
                  type="text"
                  disabled={isSubmitting}
                  {...register('name')}
               />
               {errors.name && (
                  <span className="mt-1 text-red-500">
                     {errors.name.message}
                  </span>
               )}
            </div>

            <div>
               <label>
                  Designer Name<span className="mx-1 text-red-500">*</span>
               </label>
               <input
                  type="text"
                  disabled={isSubmitting}
                  {...register('designer')}
               />
               {errors.designer && (
                  <span className="mt-1 text-red-500">
                     {errors.designer.message}
                  </span>
               )}
            </div>

            <div>
               <label>Your website</label>
               <input
                  type="text"
                  disabled={isSubmitting}
                  {...register('web')}
               />
               {errors.web && (
                  <span className="mt-1 text-red-500">
                     {errors.web.message}
                  </span>
               )}
            </div>

            <div>
               <label> Donation Link</label>
               <input
                  type="text"
                  disabled={isSubmitting}
                  {...register('donation')}
               />
               {errors.donation && (
                  <span className="mt-1 text-red-500">
                     {errors.donation.message}
                  </span>
               )}
            </div>

            <div>
               <label>Font Files</label>

               <input
                  type="file"
                  className="w-full"
                  disabled={isSubmitting}
                  {...register('files')}
                  multiple
               />
               {errors.files && (
                  <span className="mt-1 text-red-500">
                     {errors.files.message}
                  </span>
               )}
            </div>

            <div>
               <div className="my-3 flex items-center">
                  <input
                     className="mr-3 h-7 w-7 cursor-pointer"
                     type="checkbox"
                     id="oath"
                     disabled={isSubmitting}
                     {...register('oath')}
                  />

                  <label
                     htmlFor="oath"
                     className="cursor-pointer text-lg font-medium"
                  >
                     This work is solely mine, and I retain all rights to it.
                  </label>
               </div>

               {errors.oath && (
                  <span className="mt-1 text-red-500">
                     {errors.oath.message}
                  </span>
               )}
            </div>

            <button
               type="submit"
               disabled={isSubmitting}
               className="cursor-pointer rounded border-none bg-[#e4675f] px-5 py-2 text-white"
            >
               {isSubmitting ? (
                  <>
                     Submitting...
                     <Loader2 className="ml-2 inline animate-spin" size={20} />
                  </>
               ) : (
                  'Submit'
               )}
            </button>
         </form>
      </div>
   )
}

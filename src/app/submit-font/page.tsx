'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { fontSubmissionSchema, type FontSubmissionForm } from './validation'
import toast from 'react-hot-toast'
import { useState } from 'react'

export default function SubmitFontPage() {
   const [agree, setAgree] = useState(false)

   const {
      register,
      handleSubmit,
      reset,
      formState: { errors, isSubmitting }
   } = useForm<FontSubmissionForm>({
      resolver: zodResolver(fontSubmissionSchema)
   })

   const onSubmit = async (data: FontSubmissionForm) => {
      const formData = new FormData()

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
      <div className="mx-auto max-w-lg my-7">
         <h1 className="text-3xl my-7 font-bold  text-center">Submit Font</h1>

         <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-3"
         >
            <div>
               <label>
                  Font Name
                  <span className="text-red-500 mx-1">*</span>
               </label>

               <input
                  type="text"
                  disabled={isSubmitting}
                  {...register('name')}
               />
               {errors.name && (
                  <span className="text-red-500 mt-1">
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
                  <span className="text-red-500 mt-1">
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
            </div>

            <div>
               <label> Donation Link</label>
               <input
                  type="text"
                  disabled={isSubmitting}
                  {...register('donation')}
               />
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
            </div>

            <div>
               <div className="flex items-center my-3">
                  <input
                     className="mr-3 w-7 h-7 cursor-pointer"
                     type="checkbox"
                     id="oath"
                     disabled={isSubmitting}
                     {...register('oath')}
                  />

                  <label
                     htmlFor="oath"
                     className="font-medium cursor-pointer text-lg"
                  >
                     This work is solely mine, and I retain all rights to it.
                  </label>
               </div>

               {errors.oath && (
                  <span className="text-red-500 mt-1">
                     {errors.oath.message}
                  </span>
               )}
            </div>

            <button
               type="submit"
               disabled={isSubmitting}
               className="px-5 py-2 bg-[#e4675f] text-white border-none cursor-pointer rounded"
            >
               {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
         </form>
      </div>
   )
}

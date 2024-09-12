'use client'

import toast from 'react-hot-toast'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ContactSchema, contactSubmissionSchema } from './validation'

export default function ContactUsPage() {
   const {
      register,
      handleSubmit,
      reset,
      formState: { errors, isSubmitting }
   } = useForm<ContactSchema>({
      resolver: zodResolver(contactSubmissionSchema)
   })

   const onSubmit = async (body: ContactSchema) => {
      try {
         const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/upload`, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
         })
         const result = await res.json()

         if (result.success) {
            reset()
            toast.success('')
         } else {
            toast.error('Something went wrong')
         }
      } catch (error) {
         console.error('Error while contacting:', error)
         toast.error('Something went wrong')
      }
   }

   return (
      <div className="mx-auto max-w-sm rounded-xl bg-gray-50 px-3 py-7">
         <h1 className="text-center text-3xl font-bold">Contact Us</h1>

         <form className="flex flex-col gap-5 p-3">
            <div>
               <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-gray-700"
               >
                  Full Name
               </label>

               <input
                  id="name"
                  type="text"
                  className="w-full rounded-md border border-gray-300 p-3 focus:border-transparent focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter your full name"
               />
            </div>

            <div>
               <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-700"
               >
                  Email Address
               </label>
               <input
                  id="email"
                  type="email"
                  className="w-full rounded-md border border-gray-300 p-3 focus:border-transparent focus:ring-2 focus:ring-indigo-500"
                  placeholder="example@example.com"
               />
            </div>

            <div>
               <label
                  htmlFor="subject"
                  className="mb-2 block text-sm font-medium text-gray-700"
               >
                  Subject
               </label>

               <input
                  id="subject"
                  type="text"
                  className="w-full rounded-md border border-gray-300 p-3 focus:border-transparent focus:ring-2 focus:ring-indigo-500"
                  placeholder="Subject"
               />
            </div>

            <div>
               <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium text-gray-700"
               >
                  Message
               </label>

               <textarea
                  id="message"
                  className="w-full rounded-md border border-gray-300 p-3 focus:border-transparent focus:ring-2 focus:ring-indigo-500"
                  rows={3}
                  placeholder="Write your message"
               ></textarea>
            </div>

            <button
               type="submit"
               className="w-full rounded-md bg-dark py-3 font-semibold text-white"
            >
               Send Message
            </button>
         </form>
      </div>
   )
}

'use client'

import Navbar from '@/components/header'
import Footer from '@/components/Footer'

export default function ContactUsPage() {
   return (
      <div className="flex min-h-screen flex-col bg-gray-100 font-sans">
         <div className="container mx-auto flex-grow px-5 py-10">
            <h1 className="mb-10 text-center text-3xl font-bold">Contact Us</h1>
            <div className="mx-auto flex max-w-4xl flex-col rounded-lg bg-white p-8 shadow-lg md:flex-row">
               {/* Contact Information Section */}
               <div className="flex w-full flex-col justify-center rounded-lg bg-orange-100 p-6 md:w-1/2">
                  <h2 className="mb-6 text-2xl font-semibold">Get in Touch</h2>
                  <p className="mb-4 text-gray-700">
                     We would love to hear from you. Please reach out to us
                     using any of the following methods.
                  </p>
                  <div className="mb-4">
                     <h3 className="text-lg font-medium">Mobile:</h3>
                     <p className="text-gray-600">+1 234 567 890</p>
                  </div>
                  <div className="mb-4">
                     <h3 className="text-lg font-medium">Email:</h3>
                     <p className="text-gray-600">contact@yourcompany.com</p>
                  </div>
                  <div className="mb-4">
                     <h3 className="text-lg font-medium">Office Address:</h3>
                     <p className="text-gray-600">
                        123 Main Street, Suite 400, Your City, Your Country
                     </p>
                  </div>
               </div>
               {/* Form Section */}
               <div className="w-full p-6 md:w-1/2">
                  <form className="flex flex-col gap-6">
                     <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                           Full Name
                        </label>
                        <input
                           type="text"
                           className="w-full rounded-md border border-gray-300 p-3 focus:border-transparent focus:ring-2 focus:ring-indigo-500"
                           placeholder="Enter your full name"
                        />
                     </div>
                     <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                           Email Address
                        </label>
                        <input
                           type="email"
                           className="w-full rounded-md border border-gray-300 p-3 focus:border-transparent focus:ring-2 focus:ring-indigo-500"
                           placeholder="Enter your email address"
                        />
                     </div>
                     <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                           Subject
                        </label>
                        <input
                           type="text"
                           className="w-full rounded-md border border-gray-300 p-3 focus:border-transparent focus:ring-2 focus:ring-indigo-500"
                           placeholder="Subject of your message"
                        />
                     </div>
                     <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                           Message
                        </label>
                        <textarea
                           className="w-full rounded-md border border-gray-300 p-3 focus:border-transparent focus:ring-2 focus:ring-indigo-500"
                           rows={5}
                           placeholder="Write your message"
                        ></textarea>
                     </div>
                     <button
                        type="submit"
                        className="w-full rounded-md bg-orange-500 py-3 font-semibold text-white hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                     >
                        Send Message
                     </button>
                  </form>
               </div>
            </div>
         </div>
      </div>
   )
}

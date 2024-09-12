'use client'

export default function ContactUsPage() {
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

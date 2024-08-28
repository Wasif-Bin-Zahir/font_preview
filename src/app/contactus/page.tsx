'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ContactUsPage() {
  return (
    <div className="font-sans bg-gray-100 min-h-screen flex flex-col">
      <div className="flex-grow container mx-auto px-5 py-10">
        <h1 className="text-3xl font-bold text-center mb-10">Contact Us</h1>
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-4xl mx-auto flex flex-col md:flex-row">
          {/* Contact Information Section */}
          <div className="w-full md:w-1/2 p-6 flex flex-col justify-center bg-orange-100 rounded-lg">
            <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
            <p className="text-gray-700 mb-4">
              We would love to hear from you. Please reach out to us using any of the following methods.
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
              <p className="text-gray-600">123 Main Street, Suite 400, Your City, Your Country</p>
            </div>
          </div>
          {/* Form Section */}
          <div className="w-full md:w-1/2 p-6">
            <form className="flex flex-col gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Enter your email address"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Subject of your message"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  rows={5}
                  placeholder="Write your message"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-orange-500 text-white font-semibold rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
         
    </div>
  );
}

"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { fontSubmissionSchema, type FontSubmissionForm } from "./validation"

export default function SubmitFontPage() {
  const [file, setFile] = useState<File | null>(null)
  const [error, setError] = useState<string[]>([])
  const [success, setSuccess] = useState(false)

  const ref = useRef<HTMLInputElement>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FontSubmissionForm>({
    resolver: zodResolver(fontSubmissionSchema),
  })

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "light")
  }, [])

  const onSubmit = async (data: FontSubmissionForm) => {
    try {
      if (file && file.type !== "application/x-zip-compressed") {
        console.log("File type is not allowed:", file.type)
        setError(["Only .zip files are allowed"])
        return
      }

      const formData = new FormData()

      // Append file to FormData if it exists
      if (file) {
        console.log("Appending file to FormData:", file)
        formData.append("file", file)
      }

      // Append boolean directly
      formData.append("hasPermission", String(data.hasPermission))

      // Append other form fields to FormData
      for (const [key, value] of Object.entries(data)) {
        if (key !== "hasPermission" && value !== undefined) {
          console.log(`Field: ${key}, Value: ${value}`)
          formData.append(key, String(value))
        }
      }

      const res = await fetch("http://localhost:3000/api/upload", {
        method: "POST",
        body: formData,
      })

      const result = await res.json()
      console.log("Response from server:", result)

      if (!res.ok) {
        console.log(
          "Server responded with an error:",
          result.message || "Error uploading file",
        )
        setError([result.message || "Error uploading file"])
        setSuccess(false)
        return
      }

      // Cloudinary upload code (commented out)
      /*
      if (file) {
        const cloudinaryFormData = new FormData()
        cloudinaryFormData.append("file", file)
        cloudinaryFormData.append("upload_preset", "your_upload_preset")

        const cloudinaryRes = await fetch(
          `https://api.cloudinary.com/v1_1/your_cloud_name/upload`,
          {
            method: "POST",
            body: cloudinaryFormData,
          },
        )

        const cloudinaryResult = await cloudinaryRes.json()

        if (!cloudinaryRes.ok) {
          console.log(
            "Cloudinary responded with an error:",
            cloudinaryResult.error?.message || "Error uploading to Cloudinary"
          )
          setError([
            cloudinaryResult.error?.message || "Error uploading to Cloudinary",
          ])
          setSuccess(false)
          return
        }

        console.log("File uploaded to Cloudinary successfully")
      }
      */

      console.log("File uploaded successfully")
      setSuccess(true)
      setError([])
      if (ref.current) {
        ref.current.value = ""
      }
    } catch (err) {
      const errorMessage = (err as Error).message || "Error uploading file"
      console.log("Caught an error:", errorMessage)
      setError([errorMessage])
      setSuccess(false)
    }
  }

  return (
    <div className="font-sans m-0 bg-[#dfdfdf]">
      <nav className="bg-[#e4675f] p-3 text-white px-[20px]">
        <div className="flex items-center px-[80px]">
          <span className="mr-2">→</span>
          <span>Click to search</span>
        </div>
      </nav>

      <div className="mx-auto max-w-lg mb-[40px]">
        <h1 className="text-3xl my-4 font-bold text-center">Submit Font</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <p>Are you the designer and author of the font?</p>
          <div>
            <label className="flex items-center">
              <input
                type="radio"
                value="true"
                {...register("hasPermission", {
                  required: "Permission is required.",
                })}
                className="mr-2"
              />
              Yes, this is my own work and I hold the right to it.
            </label>
            <label className="flex items-center mt-2">
              <input
                type="radio"
                value="false"
                {...register("hasPermission")}
                className="mr-2"
              />
              No, I found this font somewhere else.
            </label>
            {errors.hasPermission && (
              <p className="text-red-500 mt-1">
                {errors.hasPermission.message}
              </p>
            )}
          </div>

          <div>
            <label className="block">
              Font Name * :
              <input
                type="text"
                {...register("fontName")}
                className="w-full p-2 mt-1 border border-gray-300 rounded"
              />
              {errors.fontName && (
                <p className="text-red-500 mt-1">{errors.fontName.message}</p>
              )}
            </label>
          </div>

          <div>
            <label className="block">
              Name of the Designer * :
              <input
                type="text"
                {...register("designerName")}
                className="w-full p-2 mt-1 border border-gray-300 rounded"
              />
              {errors.designerName && (
                <p className="text-red-500 mt-1">
                  {errors.designerName.message}
                </p>
              )}
            </label>
          </div>

          <div>
            <label className="block">
              Website of the Designer :
              <input
                type="text"
                {...register("designerWebsite")}
                className="w-full p-2 mt-1 border border-gray-300 rounded"
              />
            </label>
          </div>

          <div>
            <label className="block">
              Donation Link :
              <input
                type="text"
                {...register("donationLink")}
                className="w-full p-2 mt-1 border border-gray-300 rounded"
              />
            </label>
          </div>

          <div>
            <label className="block">
              Font Upload (file .zip only):
              <input
                type="file"
                accept=".zip"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                ref={ref}
                className="block mt-2"
              />
            </label>
          </div>

          <button
            type="submit"
            className="px-5 py-2 bg-[#e4675f] text-white border-none cursor-pointer rounded"
          >
            Submit
          </button>

          {error.length > 0 && (
            <div className="mt-4">
              {error.map((err, index) => (
                <div key={index} className="text-red-500">
                  {err}
                </div>
              ))}
            </div>
          )}

          {success && (
            <div className="mt-4 text-green-500">
              File uploaded successfully!
            </div>
          )}
        </form>
      </div>
    </div>
  )
}

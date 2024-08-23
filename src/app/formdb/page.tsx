'use client';

import { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { fontSubmissionSchema } from '../../schemas/fontSubmissionSchema';
import Navbar from '@/components/Navbar';
import '../../../styles/globals.css';

type FontSubmissionForm = z.infer<typeof fontSubmissionSchema>;

export default function SubmitFontPage() {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string[]>([]);
  const [success, setSuccess] = useState(false);

  const ref = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FontSubmissionForm>({
    resolver: zodResolver(fontSubmissionSchema),
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'light');
  }, []);

  const onSubmit = async (data: FontSubmissionForm) => {
    console.log('Form data before submission:', data);
    console.log('Selected file:', file);

    try {
      if (file && file.type !== 'application/x-zip-compressed') {
        console.log('File type is not allowed:', file.type);
        setError(['Only .zip files are allowed']);
        return;
      }

      const formData = new FormData();

      // Append file to FormData if it exists
      if (file) {
        console.log('Appending file to FormData:', file);
        formData.append('file', file);
      }

      // Append form fields to FormData
      console.log('Appending form fields to FormData:');
      for (const [key, value] of Object.entries(data)) {
        if (value !== undefined) {
          console.log(`Field: ${key}, Value: ${value}`);
          // Convert value to string if necessary
          formData.append(key, String(value));
        }
      }

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await res.json();
      console.log('Response from server:', result);

      if (!res.ok) {
        console.log(
          'Server responded with an error:',
          result.message || 'Error uploading file'
        );
        setError([result.message || 'Error uploading file']);
        setSuccess(false);
        return;
      }

      console.log('File uploaded successfully');
      setSuccess(true);
      setError([]);
      if (ref.current) {
        ref.current.value = '';
      }
    } catch (err) {
      // Type assertion to Error
      const errorMessage = (err as Error).message || 'Error uploading file';
      console.log('Caught an error:', errorMessage);
      setError([errorMessage]);
      setSuccess(false);
    }
  };

  return (
    <div className="font-sans m-0 bg-[#dfdfdf]">
      <Navbar />

      <nav className="bg-[#e4675f] p-3 text-white px-[20px]">
        <div className="flex items-center">
          <span className="mr-2">→</span>
          <span>Click to search</span>
        </div>
      </nav>

      <div className="px-5 max-w-lg">
        <h1 className="text-xl mb-4">Submit Font</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <label className="flex items-center">
              <input
                type="radio"
                value="true"
                {...register('hasPermission', { required: 'Permission is required.' })}
                className="mr-2"
              />
              Yes
            </label>
            <label className="flex items-center mt-2">
              <input
                type="radio"
                value="false"
                {...register('hasPermission')}
                className="mr-2"
              />
              No
            </label>
            {errors.hasPermission && (
              <p className="text-red-500 mt-1">
                {errors.hasPermission.message}
              </p>
            )}
          </div>

          <div>
            <label className="block">
              Font Name (mandatory):
              <input
                type="text"
                {...register('fontName')}
                className="w-full p-2 mt-1 border border-gray-300 rounded"
              />
              {errors.fontName && (
                <p className="text-red-500 mt-1">{errors.fontName.message}</p>
              )}
            </label>
          </div>

          <div>
            <label className="block">
              Name of the Designer (mandatory):
              <input
                type="text"
                {...register('designerName')}
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
              Website of the Designer (optional):
              <input
                type="text"
                {...register('designerWebsite')}
                className="w-full p-2 mt-1 border border-gray-300 rounded"
              />
            </label>
          </div>

          <div>
            <label className="block">
              Donation Link (optional):
              <input
                type="text"
                {...register('donationLink')}
                className="w-full p-2 mt-1 border border-gray-300 rounded"
              />
            </label>
          </div>

          <div>
            <label className="block">
              Font Upload (title file .tff or .zip):
              <input
                type="file"
                accept=".zip"
                onChange={(e) => {
                  console.log('File selected:', e.target.files?.[0]);
                  setFile(e.target.files?.[0] || null);
                }}
                ref={ref}
                className="block mt-2"
              />
            </label>
          </div>

          <button
            type="submit"
            className="px-5 py-2 bg-orange-500 text-white border-none cursor-pointer rounded"
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
  );
}

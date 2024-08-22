'use client';

import '../../styles/globals.css';
import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { fontSubmissionSchema } from '../schemas/fontSubmissionSchema';
import { z } from 'zod';

type FontSubmissionForm = z.infer<typeof fontSubmissionSchema>;

const SubmitFontPage = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FontSubmissionForm>({
		resolver: zodResolver(fontSubmissionSchema),
	});

	console.log(errors);

	const [file, setFile] = useState<File | null>(null);
	const ref = useRef<HTMLInputElement>(null);

	const onSubmit = async (data: FontSubmissionForm) => {
		try {
			if (file && file.type !== 'application/x-zip-compressed') {
				alert('Only .zip files are allowed');
				return;
			}

			console.log('Form Submitted', data);

			if (file) {
				const formData = new FormData();
				formData.append('file', file);

				const res = await fetch('/api/upload', {
					method: 'POST',
					body: formData,
				});

				if (!res.ok) {
					throw new Error(await res.text());
				}

				console.log('File uploaded successfully');
				if (ref.current) {
					ref.current.value = '';
				}
			} else {
				console.log('No file selected');
			}
		} catch (error) {
			console.error('Error uploading file:', error);
		}
	};

	return (
		<div className="font-sans m-0 p-0 bg-[#dfdfdf]">
			{/* Top Navigation Bar */}
			<nav className="bg-gray-300 p-3 px-5">
				<div className="flex justify-between items-center">
					<div className="flex space-x-5">
						<a
							href="#"
							className="relative after:content-['|'] after:ml-5 after:text-gray-500 last:after:content-none"
						>
							Authors
						</a>
						<a
							href="#"
							className="relative after:content-['|'] after:ml-5 after:text-gray-500 last:after:content-none"
						>
							Submit a font
						</a>
						<a
							href="#"
							className="relative after:content-['|'] after:ml-5 after:text-gray-500 last:after:content-none"
						>
							Forum
						</a>
					</div>
					<div className="flex space-x-5 ">
						<a
							href="#"
							className="relative after:content-['|'] after:ml-5 after:text-gray-500 last:after:content-none"
						>
							Login
						</a>
						<a href="#" className="">
							Register
						</a>
					</div>
				</div>
			</nav>

			{/* Search Navigation Bar */}
			<nav className="bg-[#e4675f] p-3 text-white">
				<div className="flex items-center">
					<span className="mr-2">→</span>
					<span>Click to search</span>
				</div>
			</nav>

			{/* Form Content */}
			<div className="p-5 max-w-lg ">
				<h1 className="text-xl mb-4">Submit Font</h1>
				<form onSubmit={handleSubmit(onSubmit)}>
					<p className="mb-2">
						Do you have the necessary permissions to submit this font?
					</p>

					<div className="mb-4">
						<label className="flex items-center">
							<input
								type="checkbox"
								{...register('hasPermission', { value: true })}
								className="mr-2"
							/>
							Yes
						</label>
					</div>

					<div className="mb-4">
						<label className="flex items-center">
							<input
								type="checkbox"
								value="no"
								{...register('hasPermission')}
								className="mr-2"
							/>
							No
						</label>
					</div>

					{errors.hasPermission && (
						<p className="text-red-500">{errors.hasPermission.message}</p>
					)}

					<div className="mb-6">
						<label className="block">
							Font Name (mandatory):
							<input
								type="text"
								{...register('fontName')}
								className="w-full p-2 mt-1 border border-gray-300 rounded"
							/>
						</label>
						{errors.fontName && (
							<p className="text-red-500 mt-1">{errors.fontName.message}</p>
						)}
					</div>

					<div className="mb-6">
						<label className="block">
							Name of the Designer (mandatory):
							<input
								type="text"
								{...register('designerName')}
								className="w-full p-2 mt-1 border border-gray-300 rounded"
							/>
						</label>
						{errors.designerName && (
							<p className="text-red-500 mt-1">{errors.designerName.message}</p>
						)}
					</div>

					<div className="mb-6">
						<label className="block">
							Website of the Designer (optional):
							<input
								type="text"
								{...register('designerWebsite')}
								className="w-full p-2 mt-1 border border-gray-300 rounded"
							/>
						</label>
					</div>

					<div className="mb-6">
						<label className="block">
							Donation Link (optional):
							<input
								type="text"
								{...register('donationLink')}
								className="w-full p-2 mt-1 border border-gray-300 rounded"
							/>
						</label>
					</div>

					<div className="mb-6">
						<label className="block">
							Font Upload (title file .tff or .zip):
							<input
								type="file"
								name="file"
								accept=".zip"
								onChange={(e) => setFile(e.target.files?.[0] || null)}
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
				</form>
			</div>
		</div>
	);
};

export default SubmitFontPage;

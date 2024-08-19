'use client';

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

	const [file, setFile] = useState<File | null>(null); // State to hold the selected file
	const ref = useRef<HTMLInputElement>(null);

	const onSubmit = async (data: FontSubmissionForm) => {
		try {
			// Check file type on the frontend
			console.log('file type:', file.type);

			if (file && file.type !== 'application/x-zip-compressed') {
				alert('Only .zip files are allowed');
				return;
			}

			// Handle form submission
			console.log('Form Submitted', data);

			// Handle file upload
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
					ref.current.value = ''; // Clear the file input
				}
			} else {
				console.log('No file selected');
			}
		} catch (error) {
			console.error('Error uploading file:', error);
		}
	};

	return (
		<div style={{ fontFamily: 'Arial, sans-serif', margin: '0', padding: '0' }}>
			{/* Top Navigation Bar */}
			<nav style={{ backgroundColor: '#ccc', padding: '10px' }}>
				<div
					style={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
					}}
				>
					<div style={{ fontWeight: 'bold' }}>Logo</div>
					<div>
						<a href="#" style={{ marginRight: '20px' }}>
							Authors
						</a>
						<a href="#" style={{ marginRight: '20px' }}>
							Submit a font
						</a>
						<a href="#">Forum</a>
					</div>
					<div>
						<a href="#" style={{ marginRight: '20px' }}>
							Login
						</a>
						<a href="#">Register</a>
					</div>
				</div>
			</nav>

			{/* Search Navigation Bar */}
			<nav
				style={{ backgroundColor: '#FF6F61', padding: '10px', color: '#fff' }}
			>
				<div style={{ display: 'flex', alignItems: 'center' }}>
					<span style={{ marginRight: '10px' }}>→</span>
					<span>Click to search</span>
				</div>
			</nav>

			{/* Form Content */}
			<div style={{ padding: '20px', maxWidth: '600px' }}>
				<h1>Submit Font</h1>
				<form onSubmit={handleSubmit(onSubmit)}>
					<p>Do you have the necessary permissions to submit this font?</p>

					<div style={{ marginBottom: '10px' }}>
						<label>
							<input
								type="checkbox"
								{...register('hasPermission', { value: true })}
							/>
							Yes
						</label>
					</div>

					<div>
						<label>
							<input
								type="checkbox"
								value="no"
								{...register('hasPermission')}
							/>
							No
						</label>
					</div>

					{errors.hasPermission && (
						<p style={{ color: 'red' }}>{errors.hasPermission.message}</p>
					)}

					<div style={{ marginBottom: '20px' }}>
						<label>
							Font Name (mandatory):
							<input
								type="text"
								{...register('fontName')}
								style={{ width: '100%', padding: '8px', marginTop: '5px' }}
							/>
						</label>
						{errors.fontName && (
							<p style={{ color: 'red' }}>{errors.fontName.message}</p>
						)}
					</div>

					<div style={{ marginBottom: '20px' }}>
						<label>
							Name of the Designer (mandatory):
							<input
								type="text"
								{...register('designerName')}
								style={{ width: '100%', padding: '8px', marginTop: '5px' }}
							/>
						</label>
						{errors.designerName && (
							<p style={{ color: 'red' }}>{errors.designerName.message}</p>
						)}
					</div>

					<div style={{ marginBottom: '20px' }}>
						<label>
							Website of the Designer (optional):
							<input
								type="text"
								{...register('designerWebsite')}
								style={{ width: '100%', padding: '8px', marginTop: '5px' }}
							/>
						</label>
					</div>

					<div style={{ marginBottom: '20px' }}>
						<label>
							Donation Link (optional):
							<input
								type="text"
								{...register('donationLink')}
								style={{ width: '100%', padding: '8px', marginTop: '5px' }}
							/>
						</label>
					</div>

					<div style={{ marginBottom: '20px' }}>
						<label>
							Font Upload (title file .tff or .zip):
							<input
								type="file"
								name="file"
								accept=".zip"
								onChange={(e) => setFile(e.target.files?.[0] || null)}
								ref={ref}
								style={{ display: 'block', marginTop: '10px' }}
							/>
						</label>
					</div>

					<button
						type="submit"
						style={{
							padding: '10px 20px',
							backgroundColor: '#FF6F61',
							color: '#fff',
							border: 'none',
							cursor: 'pointer',
						}}
					>
						Submit
					</button>
				</form>
			</div>
		</div>
	);
};

export default SubmitFontPage;

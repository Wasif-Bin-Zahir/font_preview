'use client'; // This must be at the top

import Navbar from '@/components/Navbar';
import React, { useState, useEffect } from 'react';
import '../../styles/globals.css';
import Footer from '@/components/Footer';

// Sample font data with correct paths
const fontsData = [
	{
		name: 'Roboto',
		designer: 'Christian Robertson',
		file: '/fonts/Roboto.ttf',
	},
	{
		name: 'Open Sans',
		designer: 'Steve Matteson',
		file: '/fonts/OpenSans.ttf',
	},
	{
		name: 'Lato',
		designer: 'Łukasz Dziedzic',
		file: '/fonts/Lato.ttf',
	},
	{
		name: 'Montserrat',
		designer: 'Julieta Ulanovsky',
		file: '/fonts/Montserrat.otf',
	},
];

const FontPreviewPage: React.FC = () => {
	const [previewText, setPreviewText] = useState('Type here to preview font');
	const [letterSpacing, setLetterSpacing] = useState(0);
	const [fontSize, setFontSize] = useState(24);
	const [textTransform, setTextTransform] = useState<
		'uppercase' | 'capitalize' | 'lowercase' | 'none'
	>('none');

	const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPreviewText(e.target.value);
	};

	const handleLetterSpacingChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		setLetterSpacing(parseInt(e.target.value, 10));
	};

	const handleFontSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFontSize(parseInt(e.target.value, 10));
	};

	const setUppercase = () => {
		setTextTransform('uppercase');
	};

	const setCapitalize = () => {
		setTextTransform('capitalize');
	};

	const setLowercase = () => {
		setTextTransform('lowercase');
	};

	// Dynamically load fonts by adding @font-face declarations
	useEffect(() => {
		const style = document.createElement('style');
		document.head.appendChild(style);

		fontsData.forEach((font) => {
			const fontFace = new FontFace(font.name, `url(${font.file})`);
			fontFace
				.load()
				.then((loadedFace) => {
					document.fonts.add(loadedFace);
				})
				.catch((err) => {
					console.error(`Failed to load font: ${font.name}`, err);
				});
		});

		return () => {
			document.head.removeChild(style);
		};
	}, []);

	return (
		<div style={{ margin: 'auto' }}>
			<Navbar />
			<nav
				style={{
					backgroundColor: '#FF6347',
					padding: '10px',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<input
					type="text"
					placeholder="Search Font Here"
					style={{ padding: '5px', width: '300px', borderRadius: '4px' }}
				/>
			</nav>

			<div className="mx-[200px] mt-4">
				<input
					type="text"
					placeholder="Type here to preview font"
					value={previewText}
					onChange={handleTextChange}
					style={{
						width: '100%',
						padding: '10px',
						fontSize: '18px',
						marginBottom: '20px',
					}}
				/>
			</div>

			<div
				style={{
					margin: '20px 100px',
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
				}}
			>
				<div className="flex justify-center space-x-4 bg-orange-100 p-4 rounded-lg shadow-md">
					<button
						onClick={setUppercase}
						className="px-4 py-2 text-lg font-semibold text-white bg-orange-600 rounded-md hover:bg-orange-700 transition duration-300"
					>
						AA
					</button>
					<button
						onClick={setCapitalize}
						className="px-4 py-2 text-lg font-semibold text-white bg-orange-600 rounded-md hover:bg-orange-700 transition duration-300"
					>
						Aa
					</button>
					<button
						onClick={setLowercase}
						className="px-4 py-2 text-lg font-semibold text-white bg-orange-600 rounded-md hover:bg-orange-700 transition duration-300"
					>
						aa
					</button>
				</div>

				<div className="flex items-center space-x-6 p-4 bg-orange-100 rounded-lg shadow-md">
					<div className="flex items-center space-x-2">
						<label className="text-gray-700 font-medium">Letter Spacing</label>
						<input
							type="range"
							min="0"
							max="20"
							value={letterSpacing}
							onChange={handleLetterSpacingChange}
							className="w-48 h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
						/>
						<span className="text-gray-700">{letterSpacing}px</span>
					</div>

					<div className="flex items-center space-x-2">
						<label className="text-gray-700 font-medium">Font Size</label>
						<input
							type="range"
							min="12"
							max="48"
							value={fontSize}
							onChange={handleFontSizeChange}
							className="w-48 h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
						/>
						<span className="text-gray-700">{fontSize}px</span>
					</div>
				</div>
			</div>

			<hr />

			<div className="space-y-6">
				{fontsData.map((font, index) => (
					<div
						key={index}
						className="flex items-center space-x-6 border-b border-gray-300 pb-4 mx-24"
					>
						<div className="flex-1">
							<p
								className="text-gray-800"
								style={{
									fontFamily: font.name,
									fontSize: `${fontSize}px`,
									letterSpacing: `${letterSpacing}px`,
									textTransform:
										textTransform === 'none' ? 'none' : textTransform,
								}}
							>
								{previewText}
							</p>
						</div>
						<div className="flex-1 flex items-center justify-between">
							<div className="flex-1">
								<h3 className="text-lg font-semibold text-gray-900">
									{font.name}
								</h3>
								<p className="text-gray-700">{font.designer}</p>
							</div>
							<div className="flex space-x-4">
								<button className="px-3 py-1.5 bg-orange-100 text-orange-600 rounded-lg shadow-md hover:bg-orange-600 hover:text-white transition duration-300 text-sm">
									Image Download
								</button>
								<button className="px-3 py-1.5 bg-orange-400 text-white rounded-lg shadow-md hover:bg-orange-600 transition duration-300 text-sm">
									Font Download
								</button>
							</div>
						</div>
					</div>
				))}
			</div>

			<Footer/>
		</div>
	);
};

export default FontPreviewPage;

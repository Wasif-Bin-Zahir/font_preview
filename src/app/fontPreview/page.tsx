'use client'; // This must be at the top

import React, { useState, useEffect } from 'react';

// Sample font data with correct paths
const fontsData = [
	{
		name: 'Roboto',
		designer: 'Christian Robertson',
		file: '../../../fonts.json/Roboto.ttf',
	},
	{
		name: 'Open Sans',
		designer: 'Steve Matteson',
		file: '../../../fonts.json/OpenSans.ttf',
	},
	{
		name: 'Lato',
		designer: 'Łukasz Dziedzic',
		file: '../../../fonts.json/Lato.ttf',
	},
	{
		name: 'Montserrat',
		designer: 'Julieta Ulanovsky',
		file: '../../../fonts.json/Montserrat.ttf',
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
		<div style={{ padding: '20px', maxWidth: '1200px', margin: 'auto' }}>
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
					placeholder="Search..."
					style={{ padding: '5px', width: '300px', borderRadius: '4px' }}
				/>
			</nav>

			<div style={{ marginTop: '20px' }}>
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
					margin: '20px 0',
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
				}}
			>
				<div>
					<button
						onClick={setUppercase}
						style={{ fontSize: '24px', margin: '0 5px' }}
					>
						AA
					</button>
					<button
						onClick={setCapitalize}
						style={{ fontSize: '24px', margin: '0 5px' }}
					>
						Aa
					</button>
					<button
						onClick={setLowercase}
						style={{ fontSize: '24px', margin: '0 5px' }}
					>
						aa
					</button>
				</div>
				<div style={{ display: 'flex', alignItems: 'center' }}>
					<label style={{ marginRight: '10px' }}>Letter Spacing</label>
					<input
						type="range"
						min="0"
						max="20"
						value={letterSpacing}
						onChange={handleLetterSpacingChange}
						style={{ margin: '0 20px' }}
					/>
					<label style={{ marginRight: '10px' }}>Font Size</label>
					<input
						type="range"
						min="12"
						max="48"
						value={fontSize}
						onChange={handleFontSizeChange}
					/>
				</div>
			</div>

			<hr />

			<div>
				{fontsData.map((font, index) => (
					<div
						key={index}
						style={{
							display: 'flex',
							alignItems: 'center',
							margin: '20px 0',
							borderBottom: '1px solid #ccc',
							paddingBottom: '10px',
						}}
					>
						<div style={{ flex: 1 }}>
							<p
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
						<div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
							<div style={{ flex: 1 }}>
								<h3>{font.name}</h3>
								<p>{font.designer}</p>
							</div>
							<button style={{ margin: '0 10px' }}>Image Download</button>
							<button>Font Download</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default FontPreviewPage;

// pages/fontPreview.tsx
import React from 'react';

const FontPreviewPage: React.FC = () => {
  const fonts = [
    { name: 'Arial', designer: 'Designer One' },
    { name: 'Times New Roman', designer: 'Designer Two' },
    // Add more fonts as needed
  ];

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: 'auto' }}>
      {/* Navbar */}
      <nav style={{ backgroundColor: '#FF6347', padding: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <input type="text" placeholder="Search..." style={{ padding: '5px', width: '300px', borderRadius: '4px' }} />
      </nav>

      {/* Search Box */}
      <div style={{ marginTop: '20px' }}>
        <input type="text" placeholder="Type here to preview font" style={{ width: '100%', padding: '10px', fontSize: '18px', marginBottom: '20px' }} />
      </div>

      {/* Tool Panel */}
      <div style={{ margin: '20px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <button style={{ fontSize: '24px', margin: '0 5px' }}>AA</button>
          <button style={{ fontSize: '18px', margin: '0 5px' }}>Aa</button>
          <button style={{ fontSize: '12px', margin: '0 5px' }}>aa</button>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <label style={{ marginRight: '10px' }}>Letter Spacing</label>
          <input type="range" min="0" max="20" style={{ margin: '0 20px' }} />
          <label style={{ marginRight: '10px' }}>Font Size</label>
          <input type="range" min="12" max="48" />
        </div>
      </div>

      <hr />

      {/* Font List */}
      <div>
        {fonts.map((font, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center', margin: '20px 0', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
            <div style={{ flex: 1 }}>
              <p style={{ fontFamily: font.name, fontSize: '24px' }}>Type here to preview font</p>
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

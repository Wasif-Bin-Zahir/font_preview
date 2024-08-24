'use client';

import Navbar from '@/components/Navbar';
import '../../../styles/globals.css';
import Footer from '@/components/Footer';

export default function AdminFontApprovalPage() {
  // Dummy data for stats and pending fonts
  const stats = {
    totalDesigners: 3300,
    totalFonts: 130000,
    totalDownloads: 18000,
  };

  const pendingFonts = [
    { designerName: 'John Doe', fontName: 'Awesome Font' },
    { designerName: 'Jane Smith', fontName: 'Elegant Script' },
    // Add more pending fonts as needed
  ];

  return (
    <div className="font-sans bg-gray-100 min-h-screen flex flex-col">
      <Navbar />

      <div className="container mx-auto px-5 py-10">
        <h1 className="text-3xl font-bold text-center mb-10">Admin - Approve Fonts</h1>

        {/* Stats Section */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-8 flex justify-around">
          <div className="text-center">
            <p className="text-4xl font-bold text-orange-300">{stats.totalDesigners.toLocaleString()}+</p>
            <p className="text-gray-400 font-bold">Designers</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-orange-300">{stats.totalFonts.toLocaleString()}+</p>
            <p className="text-gray-400 font-bold">Total Fonts</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-orange-300">{stats.totalDownloads.toLocaleString()}+</p>
            <p className="text-gray-400 font-bold">Total Downloads</p>
          </div>
        </div>

        {/* Pending Fonts Section */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">Pending Fonts</h2>
          <div className="overflow-x-auto">
  <table className="min-w-full bg-white">
    <thead>
      <tr>
        <th className="py-3 px-5 bg-gray-200 text-left text-sm font-semibold text-gray-700">Designer Name</th>
        <th className="py-3 px-5 bg-gray-200 text-center text-sm font-semibold text-gray-700">Font Name</th>
        <th className="py-3 px-5 bg-gray-200 text-right text-sm font-semibold text-gray-700">Actions</th>
      </tr>
    </thead>
    <tbody>
      {pendingFonts.map((font, index) => (
        <tr key={index} className="border-b border-gray-200">
          <td className="py-3 px-5">{font.designerName}</td>
          <td className="py-3 px-5 text-center mr-2">{font.fontName}</td>
          <td className="py-3 px-5 text-right">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-green-600 mr-2">Approve</button>
            <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">Reject</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

        </div>
      </div>

      <Footer/>
    </div>
  );
}

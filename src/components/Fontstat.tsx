export default function FontStats() {
    return (
      <div className="bg-gray-100 py-12 mt-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6 bg-white shadow-md rounded-md">
              <h3 className="text-4xl font-bold text-orange-300">130,000+</h3>
              <p className="text-gray-500 mt-2 font-bold">Free Fonts</p>
            </div>
            <div className="p-6 bg-white shadow-md rounded-md">
              <h3 className="text-4xl font-bold text-orange-300">18,000+</h3>
              <p className="text-gray-500 mt-2">Commercial-Use Fonts</p>
            </div>
            <div className="p-6 bg-white shadow-md rounded-md">
              <h3 className="text-4xl font-bold text-orange-300">3,300+</h3>
              <p className="text-gray-500 mt-2">Designers</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
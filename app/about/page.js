export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex flex-col items-center justify-center p-6">
      <div className="bg-white bg-opacity-90 p-8 rounded-xl shadow w-full max-w-2xl flex flex-col items-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 text-center">About LocalWave</h1>
        <p className="text-lg text-gray-700 mb-6 text-center">
          LocalWave is a platform connecting conscious consumers, local clothing brands, and manufacturers. Our mission is to empower local businesses and make sustainable fashion accessible to everyone.
        </p>
        {/* Add more about content here if needed */}
      </div>
    </div>
  );
}

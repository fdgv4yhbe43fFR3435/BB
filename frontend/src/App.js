import React, { useState } from "react";
import "./App.css";

const TeraBoxDownloader = () => {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [downloadLink, setDownloadLink] = useState("");
  const [error, setError] = useState("");

  const handleDownload = async (e) => {
    e.preventDefault();
    if (!url.trim()) {
      setError("Please enter a TeraBox URL");
      return;
    }

    if (!url.includes("terabox") && !url.includes("1024terabox")) {
      setError("Please enter a valid TeraBox URL");
      return;
    }

    setIsLoading(true);
    setError("");
    setDownloadLink("");

    // Mock download process (since this is frontend only)
    setTimeout(() => {
      setIsLoading(false);
      // Generate a mock download link
      const fileName = "downloaded_file_" + Date.now() + ".mp4";
      setDownloadLink(`https://mock-download.com/${fileName}`);
    }, 3000);
  };

  const resetForm = () => {
    setUrl("");
    setDownloadLink("");
    setError("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden">
      {/* Anime Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <img 
          src="https://images.pexels.com/photos/18188107/pexels-photo-18188107.jpeg" 
          alt="anime-bg"
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Animated Particles */}
      <div className="absolute inset-0">
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
        <div className="particle particle-4"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        {/* Logo/Title */}
        <div className="text-center mb-12 animate-fadeInUp">
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-4 tracking-wider">
            <span className="bg-gradient-to-r from-gray-300 to-white bg-clip-text text-transparent">
              TERA
            </span>
            <span className="text-gray-400">BOX</span>
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-gray-400 to-white mx-auto mb-4"></div>
          <p className="text-gray-300 text-xl md:text-2xl font-light">
            Anime Style Downloader
          </p>
        </div>

        {/* Download Form */}
        <div className="w-full max-w-2xl">
          <form onSubmit={handleDownload} className="backdrop-blur-sm bg-black/30 p-8 rounded-2xl border border-gray-700 shadow-2xl animate-slideUp">
            <div className="mb-6">
              <label htmlFor="url" className="block text-gray-300 text-lg font-medium mb-3">
                TeraBox URL
              </label>
              <input
                type="url"
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Paste your TeraBox link here..."
                className="w-full px-6 py-4 bg-gray-900/80 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-400/20 transition-all duration-300 text-lg"
                disabled={isLoading}
              />
            </div>

            {error && (
              <div className="mb-4 p-4 bg-red-900/30 border border-red-700 rounded-lg text-red-300 animate-shake">
                {error}
              </div>
            )}

            {downloadLink && (
              <div className="mb-6 p-6 bg-green-900/30 border border-green-700 rounded-lg animate-fadeIn">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-300 font-medium mb-2">Download Ready!</p>
                    <p className="text-gray-300 text-sm break-all">{downloadLink}</p>
                  </div>
                  <button
                    onClick={() => window.open(downloadLink, '_blank')}
                    className="ml-4 px-6 py-3 bg-green-600 hover:bg-green-500 text-white rounded-lg transition-colors duration-300 font-medium"
                  >
                    Download
                  </button>
                </div>
              </div>
            )}

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 py-4 px-8 bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 text-white rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed font-bold text-lg tracking-wide"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="loader mr-3"></div>
                    Processing...
                  </div>
                ) : (
                  "GET DOWNLOAD LINK"
                )}
              </button>

              {(downloadLink || error) && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-8 py-4 border border-gray-600 text-gray-300 hover:text-white hover:border-gray-400 rounded-xl transition-all duration-300 font-medium"
                >
                  Reset
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Features */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full">
          <div className="text-center animate-fadeInUp" style={{animationDelay: '0.2s'}}>
            <div className="w-16 h-16 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-white font-bold text-xl mb-2">Lightning Fast</h3>
            <p className="text-gray-400">High-speed downloads with no limits</p>
          </div>

          <div className="text-center animate-fadeInUp" style={{animationDelay: '0.4s'}}>
            <div className="w-16 h-16 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-white font-bold text-xl mb-2">100% Safe</h3>
            <p className="text-gray-400">Secure downloads without login required</p>
          </div>

          <div className="text-center animate-fadeInUp" style={{animationDelay: '0.6s'}}>
            <div className="w-16 h-16 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </div>
            <h3 className="text-white font-bold text-xl mb-2">Original Quality</h3>
            <p className="text-gray-400">Downloads maintain original file quality</p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-20 text-center">
          <p className="text-gray-500 text-sm">
            Made with ❤️ for the anime community
          </p>
        </div>
      </div>
    </div>
  );
};

function App() {
  return <TeraBoxDownloader />;
}

export default App;
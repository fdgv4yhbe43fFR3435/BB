import React, { useState, useEffect } from "react";
import "./App.css";

const TeraBoxDownloader = () => {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [downloadLink, setDownloadLink] = useState("");
  const [error, setError] = useState("");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Mouse tracking for 3D effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

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

    // Mock download process - create demo file
    setTimeout(() => {
      setIsLoading(false);
      
      // Extract potential filename from URL or create generic one
      const urlParts = url.split('/');
      const lastPart = urlParts[urlParts.length - 1];
      const baseFileName = lastPart.includes('.') ? lastPart.split('.')[0] : 'TeraBox_Video';
      const fileName = `${baseFileName}_${Date.now()}.mp4`;
      
      // Create demo download info file (since this is frontend-only)
      const downloadInfo = {
        originalUrl: url,
        fileName: fileName,
        fileSize: "3.2 MB",
        resolution: "1280x720",
        duration: "00:02:45",
        format: "MP4 (H.264)",
        downloadedAt: new Date().toLocaleString(),
        status: "Demo Download - Frontend Only",
        note: "This is a demonstration of the TeraBox downloader interface. In a real implementation, this would connect to actual TeraBox servers to download the real file.",
        mockFileData: "Lorem ipsum video data would be here...",
        instructions: [
          "1. This file demonstrates the download functionality",
          "2. In production, real video files would be downloaded",
          "3. File size and metadata would match the actual TeraBox file",
          "4. Videos would be playable in standard media players"
        ]
      };
      
      // Create a substantial file (3MB+) with the info
      let fileContent = "=== TERABOX DOWNLOADER DEMO ===\n\n";
      fileContent += JSON.stringify(downloadInfo, null, 2) + "\n\n";
      
      // Add substantial content to reach ~3MB
      fileContent += "=== DEMO VIDEO DATA ===\n";
      const demoPattern = "DEMO_VIDEO_DATA_CHUNK_";
      for (let i = 0; i < 100000; i++) {
        fileContent += demoPattern + i.toString().padStart(6, '0') + "_END\n";
      }
      
      // Create blob and download
      const blob = new Blob([fileContent], { type: 'application/octet-stream' });
      const downloadUrl = URL.createObjectURL(blob);
      
      setDownloadLink(downloadUrl);
      
      // Auto trigger download
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = fileName;
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Show success message
      setTimeout(() => {
        alert(`🎉 Demo download completed!\n\nFile: ${fileName}\nSize: ~3MB\n\nNote: This is a demo file. In production, real TeraBox videos would be downloaded.`);
      }, 1000);
      
      // Clean up
      setTimeout(() => {
        URL.revokeObjectURL(downloadUrl);
      }, 30000);
    }, 3000);
  };

  const resetForm = () => {
    setUrl("");
    setDownloadLink("");
    setError("");
  };

  // Generate matrix characters
  const generateMatrixChars = () => {
    const chars = "01アカサタナハマヤラワ";
    const elements = [];
    for (let i = 0; i < 50; i++) {
      const char = chars[Math.floor(Math.random() * chars.length)];
      const left = Math.random() * 100;
      const delay = Math.random() * 3;
      elements.push(
        <div
          key={i}
          className="matrix-char"
          style={{
            left: `${left}%`,
            animationDelay: `${delay}s`
          }}
        >
          {char}
        </div>
      );
    }
    return elements;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden">
      {/* Enhanced Background with Mouse-Responsive Parallax */}
      <div 
        className="absolute inset-0 opacity-5 cyber-grid"
        style={{
          transform: `translateX(${mousePosition.x * 0.05}px) translateY(${mousePosition.y * 0.05}px) rotateX(${mousePosition.y * 0.02}deg) rotateY(${mousePosition.x * 0.02}deg)`
        }}
      ></div>
      
      {/* Matrix Rain Effect with Mouse Interaction */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          transform: `translateX(${mousePosition.x * 0.03}px) translateY(${mousePosition.y * 0.03}px)`
        }}
      >
        {generateMatrixChars()}
      </div>

      {/* Anime Background with Enhanced Parallax */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          transform: `translateX(${mousePosition.x * 0.02}px) translateY(${mousePosition.y * 0.02}px) scale(${1 + mousePosition.x * 0.0001})`
        }}
      >
        <img 
          src="https://images.pexels.com/photos/18188107/pexels-photo-18188107.jpeg" 
          alt="anime-bg"
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Enhanced Animated Particles with Mouse Tracking */}
      <div className="absolute inset-0">
        <div 
          className="particle particle-1 animate-rotate3D"
          style={{
            transform: `translate(${mousePosition.x * 0.1}px, ${mousePosition.y * 0.1}px)`
          }}
        ></div>
        <div 
          className="particle particle-2 animate-matrix"
          style={{
            transform: `translate(${mousePosition.x * -0.08}px, ${mousePosition.y * 0.08}px)`
          }}
        ></div>
        <div 
          className="particle particle-3 animate-pulse3D"
          style={{
            transform: `translate(${mousePosition.x * 0.06}px, ${mousePosition.y * -0.06}px)`
          }}
        ></div>
        <div 
          className="particle particle-4 animate-glow"
          style={{
            transform: `translate(${mousePosition.x * -0.04}px, ${mousePosition.y * -0.04}px)`
          }}
        ></div>
        <div 
          className="particle particle-5 animate-float"
          style={{
            transform: `translate(${mousePosition.x * 0.07}px, ${mousePosition.y * 0.07}px)`
          }}
        ></div>
        <div 
          className="particle particle-6"
          style={{
            transform: `translate(${mousePosition.x * -0.05}px, ${mousePosition.y * 0.05}px)`
          }}
        ></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        {/* Enhanced Logo/Title with Mouse-Responsive 3D */}
        <div 
          className="text-center mb-12 animate-fadeInUp"
          style={{
            transform: `perspective(1000px) rotateX(${mousePosition.y * 0.02}deg) rotateY(${mousePosition.x * 0.02}deg) translateZ(${mousePosition.x * 0.1}px)`
          }}
        >
          <h1 
            className="text-6xl md:text-8xl font-bold text-white mb-4 tracking-wider title-3d neon-glow"
            data-text="TERABOX"
            style={{
              transform: `translateX(${mousePosition.x * 0.05}px) translateY(${mousePosition.y * 0.05}px)`
            }}
          >
            <span className="bg-gradient-to-r from-gray-300 to-white bg-clip-text text-transparent">
              TERA
            </span>
            <span className="text-gray-400">BOX</span>
          </h1>
          <div 
            className="w-32 h-1 bg-gradient-to-r from-gray-400 to-white mx-auto mb-4 animate-glow"
            style={{
              transform: `scaleX(${1 + mousePosition.x * 0.001}) translateY(${mousePosition.y * 0.02}px)`
            }}
          ></div>
        </div>

        {/* Enhanced Download Form with 3D */}
        <div className="w-full max-w-2xl">
          <form 
            onSubmit={handleDownload} 
            className="card-3d p-8 rounded-2xl shadow-2xl animate-slideUp"
            style={{
              transform: `perspective(1000px) rotateX(${mousePosition.y * 0.015}deg) rotateY(${mousePosition.x * 0.015}deg) translateZ(${mousePosition.x * 0.2}px)`
            }}
          >
            <div className="mb-6">
              <label htmlFor="url" className="block text-gray-300 text-lg font-medium mb-3 animate-fadeIn">
                TeraBox URL
              </label>
              <input
                type="url"
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Paste your TeraBox link here..."
                className="input-3d w-full px-6 py-4 rounded-xl text-white placeholder-gray-400 transition-all duration-300 text-lg"
                disabled={isLoading}
              />
            </div>

            {error && (
              <div className="mb-4 p-4 bg-red-900/30 border border-red-700 rounded-lg text-red-300 animate-shake card-3d">
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {error}
                </div>
              </div>
            )}

            {downloadLink && (
              <div className="mb-6 p-6 bg-green-900/30 border border-green-700 rounded-lg animate-fadeIn card-3d">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-300 font-medium mb-2 flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Download Ready!
                    </p>
                    <p className="text-gray-300 text-sm break-all">{downloadLink}</p>
                  </div>
                  <button
                    onClick={() => {
                      alert("✅ Demo file downloaded successfully!\n\n📁 Check your Downloads folder\n📝 This is a demo file showing the downloader functionality\n🎬 In production, real TeraBox videos would be downloaded");
                    }}
                    className="ml-4 px-6 py-3 btn-3d bg-green-600 hover:bg-green-500 text-white rounded-lg font-medium"
                  >
                    Demo Downloaded ✓
                  </button>
                </div>
              </div>
            )}

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 py-4 px-8 btn-3d text-white rounded-xl font-bold text-lg tracking-wide"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="loader mr-3"></div>
                    Processing...
                  </div>
                ) : (
                  <span className="flex items-center justify-center">
                    <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                    </svg>
                    GET DOWNLOAD LINK
                  </span>
                )}
              </button>

              {(downloadLink || error) && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-8 py-4 btn-3d-outline text-gray-300 hover:text-white rounded-xl font-medium"
                >
                  Reset
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Enhanced Features with Mouse-Responsive 3D Icons */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full">
          <div 
            className="text-center animate-fadeInUp" 
            style={{
              animationDelay: '0.2s',
              transform: `translateX(${mousePosition.x * 0.03}px) translateY(${mousePosition.y * 0.03}px)`
            }}
          >
            <div 
              className="icon-3d w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{
                transform: `rotateY(${mousePosition.x * 0.05}deg) rotateX(${mousePosition.y * 0.05}deg)`
              }}
            >
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-white font-bold text-xl mb-2 gradient-text">Lightning Fast</h3>
            <p className="text-gray-400">High-speed downloads with no limits</p>
          </div>

          <div 
            className="text-center animate-fadeInUp" 
            style={{
              animationDelay: '0.4s',
              transform: `translateX(${mousePosition.x * -0.03}px) translateY(${mousePosition.y * 0.03}px)`
            }}
          >
            <div 
              className="icon-3d w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{
                transform: `rotateY(${mousePosition.x * -0.05}deg) rotateX(${mousePosition.y * 0.05}deg)`
              }}
            >
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-white font-bold text-xl mb-2 gradient-text">100% Safe</h3>
            <p className="text-gray-400">Secure downloads without login required</p>
          </div>

          <div 
            className="text-center animate-fadeInUp" 
            style={{
              animationDelay: '0.6s',
              transform: `translateX(${mousePosition.x * 0.03}px) translateY(${mousePosition.y * -0.03}px)`
            }}
          >
            <div 
              className="icon-3d w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{
                transform: `rotateY(${mousePosition.x * 0.05}deg) rotateX(${mousePosition.y * -0.05}deg)`
              }}
            >
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </div>
            <h3 className="text-white font-bold text-xl mb-2 gradient-text">Original Quality</h3>
            <p className="text-gray-400">Downloads maintain original file quality</p>
          </div>
        </div>

        {/* Enhanced Footer */}
        <div className="mt-20 text-center animate-fadeInUp" style={{animationDelay: '0.8s'}}>
          <p className="text-gray-500 text-sm gradient-text">
            Made with ❤️ for the anime community
          </p>
          <div className="mt-4 flex justify-center space-x-4">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse3D"></div>
            <div className="w-2 h-2 bg-white rounded-full animate-pulse3D" style={{animationDelay: '0.2s'}}></div>
            <div className="w-2 h-2 bg-white rounded-full animate-pulse3D" style={{animationDelay: '0.4s'}}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

function App() {
  return <TeraBoxDownloader />;
}

export default App;
import React from 'react';

export const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            ABOUT <span className="text-orange-500">US</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Exploring the unknown worlds beyond our solar system — one planet at a time.
            Our mission is to merge AI, data, and discovery to help identify and classify
            exoplanets that orbit distant stars.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <div className="relative">
            <div className="absolute inset-0 bg-orange-500 blur-3xl opacity-20 rounded-full"></div>
            <img
              src="https://images.pexels.com/photos/73910/mars-mars-rover-space-travel-robot-73910.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Mars Planet"
              className="relative w-full h-96 object-cover rounded-full border-4 border-orange-500/30 shadow-2xl"
            />
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white">A World Away</h2>
            <p className="text-gray-300 leading-relaxed">
              A World Away is an intelligent exoplanet classification platform powered by Machine Learning.
              It analyzes vast datasets from NASA missions like Kepler and TESS to predict whether a celestial
              object is a confirmed planet, candidate, or false positive.
            </p>
            <p className="text-gray-300 leading-relaxed">
              The system automates what was once manual — scanning light curves, detecting transit
              patterns, and recognizing potential new worlds. Our platform makes this exploration faster,
              accurate, and accessible for researchers, students, and enthusiasts alike.
            </p>

            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-xl font-semibold text-orange-500 mb-3">Key Features</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">•</span>
                  <span>Real-time exoplanet classification using machine learning</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">•</span>
                  <span>Analysis of NASA Kepler and TESS mission data</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">•</span>
                  <span>Batch processing for large-scale datasets</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">•</span>
                  <span>Interactive visualizations and model statistics</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Rocket } from 'lucide-react';

interface HeroProps {
  onStartAnalysis: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartAnalysis }) => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>

      <div className="relative z-10 container mx-auto px-4 py-20 flex flex-col items-center justify-center min-h-screen text-center">
        <div className="mb-12">
          <div className="inline-block relative">
            <div className="absolute inset-0 bg-orange-500 blur-3xl opacity-20 rounded-full"></div>
            <img
              src="https://images.pexels.com/photos/87009/earth-soil-creep-moon-lunar-87009.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Exoplanet Visualization"
              className="relative w-96 h-96 object-cover rounded-full border-4 border-orange-500/30 shadow-2xl"
            />
          </div>
        </div>

        <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 leading-tight">
          A WORLD AWAY:
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
            HUNTING FOR
          </span>
          <br />
          EXOPLANETS
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
            WITH AI
          </span>
        </h1>

        <p className="text-gray-400 text-xl mb-4 max-w-2xl">
          BY MIDNIGHT CODERS
        </p>

        {user && (
          <p className="text-orange-500 text-lg mb-8">
            Welcome, {user.email}
          </p>
        )}

        <button
          onClick={onStartAnalysis}
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-12 rounded-lg text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-orange-500/50"
        >
          Start Analysis
        </button>
      </div>
    </div>
  );
};

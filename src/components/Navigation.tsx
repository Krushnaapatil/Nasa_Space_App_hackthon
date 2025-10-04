import React from 'react';
import { Rocket, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface NavigationProps {
  currentView: 'hero' | 'about' | 'analysis' | 'modelStats' | 'contact';
  onNavigate: (view: 'hero' | 'about' | 'analysis' | 'modelStats' | 'contact') => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentView, onNavigate }) => {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <button
            onClick={() => onNavigate('hero')}
            className="flex items-center space-x-2 text-white hover:text-orange-500 transition-colors"
          >
            <div className="bg-orange-500 rounded-full p-2">
              <Rocket className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-xl hidden md:inline">Midnight Coders</span>
          </button>

          <div className="flex items-center space-x-8">
            <button
              onClick={() => onNavigate('about')}
              className={`text-sm font-medium transition-colors ${
                currentView === 'about'
                  ? 'text-orange-500'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              About US
            </button>
            <button
              onClick={() => onNavigate('modelStats')}
              className={`text-sm font-medium transition-colors ${
                currentView === 'modelStats'
                  ? 'text-orange-500'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Model stats
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className={`text-sm font-medium transition-colors ${
                currentView === 'contact'
                  ? 'text-orange-500'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Contact
            </button>

            {currentView !== 'analysis' && (
              <button
                onClick={() => onNavigate('analysis')}
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
              >
                Start Analysis
              </button>
            )}

            {user && (
              <button
                onClick={handleSignOut}
                className="text-gray-300 hover:text-white transition-colors"
                title="Sign Out"
              >
                <LogOut className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

import React from 'react';
import { ModelStats } from '../components/ModelStats';
import { exoplanetModel } from '../ml/exoplanetModel';

export const ModelStatsPage: React.FC = () => {
  const stats = exoplanetModel.getStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Model Performance Statistics
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Detailed metrics and performance analysis of our exoplanet classification model
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <ModelStats stats={stats} />
        </div>
      </div>
    </div>
  );
};

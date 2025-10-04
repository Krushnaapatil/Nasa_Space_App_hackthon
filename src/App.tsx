import { useState } from 'react';
import { Globe, BarChart3, Upload, Info } from 'lucide-react';
import { InputForm } from './components/InputForm';
import { ResultsDisplay } from './components/ResultsDisplay';
import { CSVUpload } from './components/CSVUpload';
import { BatchResults } from './components/BatchResults';
import { ModelStats } from './components/ModelStats';
import { exoplanetModel, ExoplanetFeatures, PredictionResult } from './ml/exoplanetModel';
import { ParsedCSVRow } from './utils/csvParser';

type ViewMode = 'input' | 'batch' | 'stats';

function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('input');
  const [isLoading, setIsLoading] = useState(false);
  const [singleResult, setSingleResult] = useState<PredictionResult | null>(null);
  const [batchResults, setBatchResults] = useState<Array<PredictionResult & { features: any }> | null>(null);

  const handleSinglePredict = async (features: ExoplanetFeatures) => {
    setIsLoading(true);
    setSingleResult(null);

    await new Promise(resolve => setTimeout(resolve, 800));

    const result = exoplanetModel.predict(features);
    exoplanetModel.incrementPredictions();
    setSingleResult(result);
    setIsLoading(false);
  };

  const handleBatchPredict = async (rows: ParsedCSVRow[]) => {
    setIsLoading(true);
    setBatchResults(null);

    await new Promise(resolve => setTimeout(resolve, 1200));

    const results = rows.map(row => {
      const { rowIndex, ...features } = row;
      const result = exoplanetModel.predict(features);
      exoplanetModel.incrementPredictions();
      return { ...result, features };
    });

    setBatchResults(results);
    setIsLoading(false);
  };

  const stats = exoplanetModel.getStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />

      <header className="relative bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 text-white shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-gradient-to-br from-blue-400 to-indigo-600 p-4 rounded-2xl shadow-lg">
              <Globe className="w-10 h-10 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold tracking-tight">A World Away</h1>
              <p className="text-slate-300 mt-1">Exoplanet Classification System</p>
            </div>
          </div>

          <nav className="flex gap-2 flex-wrap">
            <button
              onClick={() => setViewMode('input')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                viewMode === 'input'
                  ? 'bg-white text-slate-900 shadow-lg'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              <Info className="w-4 h-4" />
              Single Analysis
            </button>
            <button
              onClick={() => setViewMode('batch')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                viewMode === 'batch'
                  ? 'bg-white text-slate-900 shadow-lg'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              <Upload className="w-4 h-4" />
              Batch Upload
            </button>
            <button
              onClick={() => setViewMode('stats')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                viewMode === 'stats'
                  ? 'bg-white text-slate-900 shadow-lg'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              Model Stats
            </button>
          </nav>
        </div>
      </header>

      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {viewMode === 'input' && (
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 border-2 border-gray-100">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Exoplanet Feature Input</h2>
                <p className="text-gray-600">
                  Enter observational parameters to classify a potential exoplanet detection
                </p>
              </div>
              <InputForm onPredict={handleSinglePredict} isLoading={isLoading} />
            </div>

            {singleResult && (
              <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 border-2 border-gray-100">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Classification Results</h2>
                <ResultsDisplay result={singleResult} />
              </div>
            )}

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-100">
              <h3 className="text-lg font-bold text-gray-800 mb-3">About This System</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                This ML-powered classifier analyzes observational data to distinguish between confirmed exoplanets,
                potential candidates requiring further study, and false positive detections. The model is trained
                on data from NASA's Kepler, K2, and TESS missions, using a RandomForest algorithm with 92% accuracy.
              </p>
            </div>
          </div>
        )}

        {viewMode === 'batch' && (
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 border-2 border-gray-100">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Batch Analysis</h2>
                <p className="text-gray-600">
                  Upload a CSV file containing multiple observations for bulk classification
                </p>
              </div>
              <CSVUpload onBatchPredict={handleBatchPredict} isLoading={isLoading} />
            </div>

            {isLoading && (
              <div className="bg-white rounded-xl shadow-lg p-12 border-2 border-gray-100 text-center">
                <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-gray-700 font-medium">Analyzing exoplanet data...</p>
                <p className="text-gray-500 text-sm mt-2">Processing observations through ML model</p>
              </div>
            )}

            {batchResults && !isLoading && (
              <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 border-2 border-gray-100">
                <BatchResults results={batchResults} />
              </div>
            )}
          </div>
        )}

        {viewMode === 'stats' && (
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 border-2 border-gray-100">
            <ModelStats stats={stats} />
          </div>
        )}
      </main>

      <footer className="relative mt-16 bg-slate-800 text-slate-300 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm">
            Built with React, TypeScript, and Recharts | Trained on NASA Exoplanet Archive Data
          </p>
          <p className="text-xs mt-2 text-slate-400">
            For research and educational purposes | Model accuracy: {Math.round(stats.accuracy * 100)}%
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;

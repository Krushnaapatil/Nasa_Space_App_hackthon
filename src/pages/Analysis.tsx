import React, { useState } from 'react';
import { InputForm } from '../components/InputForm';
import { ResultsDisplay } from '../components/ResultsDisplay';
import { CSVUpload } from '../components/CSVUpload';
import { BatchResults } from '../components/BatchResults';
import { exoplanetModel, ExoplanetFeatures, PredictionResult } from '../ml/exoplanetModel';
import { ParsedCSVRow } from '../utils/csvParser';

export const Analysis: React.FC = () => {
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [batchResults, setBatchResults] = useState<Array<PredictionResult & { features: any }>>([]);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<'single' | 'batch'>('single');

  const handlePredict = async (features: ExoplanetFeatures) => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      const result = exoplanetModel.predict(features);
      exoplanetModel.incrementPredictions();
      setPrediction(result);
      setBatchResults([]);
    } catch (error) {
      console.error('Prediction error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBatchPredict = async (rows: ParsedCSVRow[]) => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1200));
      const results = rows.map(row => {
        const { rowIndex, ...features } = row;
        const result = exoplanetModel.predict(features);
        exoplanetModel.incrementPredictions();
        return { ...result, features };
      });
      setBatchResults(results);
      setPrediction(null);
    } catch (error) {
      console.error('Batch prediction error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Exoplanet Classification Analysis
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Use our AI-powered model to classify exoplanet candidates based on their features
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <div className="bg-gray-800 rounded-lg p-1 border border-gray-700 inline-flex">
            <button
              onClick={() => setMode('single')}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                mode === 'single'
                  ? 'bg-orange-500 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Single Prediction
            </button>
            <button
              onClick={() => setMode('batch')}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                mode === 'batch'
                  ? 'bg-orange-500 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Batch Processing
            </button>
          </div>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {mode === 'single' ? (
            <>
              <div className="bg-gray-800 rounded-xl p-6 border-2 border-gray-700">
                <InputForm onPredict={handlePredict} isLoading={loading} />
              </div>
              {prediction && <ResultsDisplay result={prediction} />}
            </>
          ) : (
            <>
              <CSVUpload onBatchPredict={handleBatchPredict} isLoading={loading} />
              {batchResults.length > 0 && <BatchResults results={batchResults} />}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

import { PredictionResult } from '../ml/exoplanetModel';
import { CheckCircle, AlertCircle, XCircle, Download } from 'lucide-react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from 'recharts';

interface BatchResultsProps {
  results: Array<PredictionResult & { features: any }>;
}

export function BatchResults({ results }: BatchResultsProps) {
  const getIcon = (prediction: string) => {
    switch (prediction) {
      case 'Confirmed Exoplanet':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'Candidate':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case 'False Positive':
        return <XCircle className="w-5 h-5 text-red-500" />;
    }
  };

  const getColor = (prediction: string) => {
    switch (prediction) {
      case 'Confirmed Exoplanet':
        return '#10b981';
      case 'Candidate':
        return '#f59e0b';
      case 'False Positive':
        return '#ef4444';
    }
  };

  const summary = {
    total: results.length,
    confirmed: results.filter(r => r.prediction === 'Confirmed Exoplanet').length,
    candidate: results.filter(r => r.prediction === 'Candidate').length,
    false: results.filter(r => r.prediction === 'False Positive').length
  };

  const scatterData = results.map((r, idx) => ({
    x: r.features.orbital_period,
    y: r.features.planetary_radius,
    prediction: r.prediction,
    confidence: r.confidence,
    index: idx + 1
  }));

  const handleExport = () => {
    const headers = ['Index', 'Prediction', 'Confidence', 'Orbital Period', 'Transit Duration', 'Planetary Radius', 'Stellar Temp', 'SNR', 'Depth'];
    const rows = results.map((r, idx) => [
      idx + 1,
      r.prediction,
      (r.confidence * 100).toFixed(2) + '%',
      r.features.orbital_period,
      r.features.transit_duration,
      r.features.planetary_radius,
      r.features.stellar_temp,
      r.features.snr,
      r.features.depth
    ]);

    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `exoplanet_predictions_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-gradient-to-r from-orange-600 to-orange-700 rounded-xl p-6 text-white shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Batch Analysis Complete</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/10 rounded-lg p-4 backdrop-blur">
            <p className="text-sm opacity-90">Total Analyzed</p>
            <p className="text-3xl font-bold">{summary.total}</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4 backdrop-blur">
            <p className="text-sm opacity-90">Confirmed</p>
            <p className="text-3xl font-bold text-green-300">{summary.confirmed}</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4 backdrop-blur">
            <p className="text-sm opacity-90">Candidates</p>
            <p className="text-3xl font-bold text-yellow-300">{summary.candidate}</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4 backdrop-blur">
            <p className="text-sm opacity-90">False Positives</p>
            <p className="text-3xl font-bold text-red-300">{summary.false}</p>
          </div>
        </div>
        <button
          onClick={handleExport}
          className="mt-4 bg-white text-orange-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          Export Results as CSV
        </button>
      </div>

      <div className="bg-gray-800 rounded-xl shadow-md p-6 border-2 border-gray-700">
        <h3 className="text-xl font-bold text-white mb-4">Radius vs Orbital Period</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                type="number"
                dataKey="x"
                name="Orbital Period"
                label={{ value: 'Orbital Period (days)', position: 'bottom' }}
              />
              <YAxis
                type="number"
                dataKey="y"
                name="Planetary Radius"
                label={{ value: 'Planetary Radius (R⊕)', angle: -90, position: 'left' }}
              />
              <Tooltip
                cursor={{ strokeDasharray: '3 3' }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-white p-3 border-2 border-gray-200 rounded-lg shadow-lg">
                        <p className="font-semibold">Entry #{data.index}</p>
                        <p className="text-sm">Period: {data.x.toFixed(2)} days</p>
                        <p className="text-sm">Radius: {data.y.toFixed(2)} R⊕</p>
                        <p className="text-sm font-semibold mt-1">{data.prediction}</p>
                        <p className="text-sm">Confidence: {(data.confidence * 100).toFixed(1)}%</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend />
              <Scatter name="Exoplanets" data={scatterData}>
                {scatterData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getColor(entry.prediction)} />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl shadow-md p-6 border-2 border-gray-700">
        <h3 className="text-xl font-bold text-white mb-4">Detailed Results</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-gray-700">
                <th className="text-left py-3 px-2 font-semibold text-gray-300">#</th>
                <th className="text-left py-3 px-2 font-semibold text-gray-300">Prediction</th>
                <th className="text-left py-3 px-2 font-semibold text-gray-300">Confidence</th>
                <th className="text-left py-3 px-2 font-semibold text-gray-300">Period (days)</th>
                <th className="text-left py-3 px-2 font-semibold text-gray-300">Radius (R⊕)</th>
                <th className="text-left py-3 px-2 font-semibold text-gray-300">SNR</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result, idx) => (
                <tr key={idx} className="border-b border-gray-700 hover:bg-gray-700/50 transition-colors">
                  <td className="py-3 px-2 font-medium text-gray-400">{idx + 1}</td>
                  <td className="py-3 px-2">
                    <div className="flex items-center gap-2">
                      {getIcon(result.prediction)}
                      <span className="font-medium text-gray-300">{result.prediction}</span>
                    </div>
                  </td>
                  <td className="py-3 px-2">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-gray-700 rounded-full h-2">
                        <div
                          className="h-2 rounded-full"
                          style={{
                            width: `${result.confidence * 100}%`,
                            backgroundColor: getColor(result.prediction)
                          }}
                        />
                      </div>
                      <span className="font-semibold text-gray-300">{Math.round(result.confidence * 100)}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-2 text-gray-300">{result.features.orbital_period.toFixed(2)}</td>
                  <td className="py-3 px-2 text-gray-300">{result.features.planetary_radius.toFixed(2)}</td>
                  <td className="py-3 px-2 text-gray-300">{result.features.snr.toFixed(1)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

import { PredictionResult } from '../ml/exoplanetModel';
import { CheckCircle, AlertCircle, XCircle } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie
} from 'recharts';

interface ResultsDisplayProps {
  result: PredictionResult;
}

export function ResultsDisplay({ result }: ResultsDisplayProps) {
  const getIcon = () => {
    switch (result.prediction) {
      case 'Confirmed Exoplanet':
        return <CheckCircle className="w-16 h-16 text-green-500" />;
      case 'Candidate':
        return <AlertCircle className="w-16 h-16 text-yellow-500" />;
      case 'False Positive':
        return <XCircle className="w-16 h-16 text-red-500" />;
    }
  };

  const getColor = () => {
    switch (result.prediction) {
      case 'Confirmed Exoplanet':
        return 'from-green-500 to-emerald-600';
      case 'Candidate':
        return 'from-yellow-500 to-orange-600';
      case 'False Positive':
        return 'from-red-500 to-rose-600';
    }
  };

  const getBgColor = () => {
    switch (result.prediction) {
      case 'Confirmed Exoplanet':
        return 'bg-green-900/20 border-green-500/30';
      case 'Candidate':
        return 'bg-yellow-900/20 border-yellow-500/30';
      case 'False Positive':
        return 'bg-red-900/20 border-red-500/30';
    }
  };

  const featureData = result.feature_importance.map(f => ({
    name: f.feature,
    importance: Math.round(f.importance * 100)
  }));

  const probabilityData = Object.entries(result.class_probabilities).map(([name, value]) => ({
    name: name.replace('Exoplanet', 'Exp.'),
    value: Math.round(value * 100),
    fullName: name
  }));

  const COLORS = {
    'Confirmed Exoplanet': '#10b981',
    'Candidate': '#f59e0b',
    'False Positive': '#ef4444'
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className={`border-2 rounded-xl p-8 ${getBgColor()}`}>
        <div className="flex flex-col items-center text-center">
          <div className="mb-4">{getIcon()}</div>
          <h2 className="text-3xl font-bold text-white mb-2">
            {result.prediction}
          </h2>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg text-gray-300">Confidence:</span>
            <span className={`text-2xl font-bold bg-gradient-to-r ${getColor()} bg-clip-text text-transparent`}>
              {Math.round(result.confidence * 100)}%
            </span>
          </div>
          <div className="w-full max-w-md bg-gray-700 rounded-full h-3 overflow-hidden">
            <div
              className={`h-full bg-gradient-to-r ${getColor()} transition-all duration-1000 ease-out`}
              style={{ width: `${result.confidence * 100}%` }}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-xl shadow-md p-6 border-2 border-gray-700">
          <h3 className="text-xl font-bold text-white mb-4">Class Probabilities</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={probabilityData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {probabilityData.map((item, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[item.fullName as keyof typeof COLORS]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => `${value}%`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-2">
            {Object.entries(result.class_probabilities).map(([name, value]) => (
              <div key={name} className="flex items-center justify-between text-sm">
                <span className="font-medium text-gray-300">{name}</span>
                <span className="font-bold" style={{ color: COLORS[name as keyof typeof COLORS] }}>
                  {Math.round(value * 100)}%
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl shadow-md p-6 border-2 border-gray-700">
          <h3 className="text-xl font-bold text-white mb-4">Feature Importance</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={featureData}
                layout="horizontal"
                margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
                <YAxis type="category" dataKey="name" width={100} tick={{ fontSize: 12 }} />
                <Tooltip formatter={(value: number) => `${value}%`} />
                <Bar dataKey="importance" fill="#3b82f6" radius={[0, 8, 8, 0]}>
                  {featureData.map((_item, index) => (
                    <Cell key={`cell-${index}`} fill={`hsl(${220 - index * 10}, 70%, 55%)`} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-4 text-sm text-gray-300">
            Top contributing features: <strong>{featureData[0].name}</strong> ({featureData[0].importance}%),{' '}
            <strong>{featureData[1].name}</strong> ({featureData[1].importance}%)
          </p>
        </div>
      </div>
    </div>
  );
}

import { ModelStats as Stats } from '../ml/exoplanetModel';
import { TrendingUp, Target, Activity, Award } from 'lucide-react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip
} from 'recharts';

interface ModelStatsProps {
  stats: Stats;
}

export function ModelStats({ stats }: ModelStatsProps) {
  const metricsData = [
    { metric: 'Accuracy', value: stats.accuracy * 100, fullMark: 100 },
    { metric: 'Precision', value: stats.precision * 100, fullMark: 100 },
    { metric: 'Recall', value: stats.recall * 100, fullMark: 100 },
    { metric: 'F1 Score', value: stats.f1 * 100, fullMark: 100 }
  ];

  const statCards = [
    {
      label: 'Accuracy',
      value: `${Math.round(stats.accuracy * 100)}%`,
      icon: Target,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    {
      label: 'Precision',
      value: `${Math.round(stats.precision * 100)}%`,
      icon: Award,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600'
    },
    {
      label: 'Recall',
      value: `${Math.round(stats.recall * 100)}%`,
      icon: TrendingUp,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600'
    },
    {
      label: 'F1 Score',
      value: `${Math.round(stats.f1 * 100)}%`,
      icon: Activity,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-600'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-slate-700 to-slate-800 rounded-xl p-6 text-white shadow-lg">
        <h2 className="text-2xl font-bold mb-2">Model Performance Dashboard</h2>
        <p className="text-slate-300 text-sm">
          RandomForest Classifier trained on NASA Kepler/TESS data
        </p>
        <div className="mt-4 flex items-center gap-4 text-sm">
          <div>
            <span className="text-slate-400">Total Predictions:</span>{' '}
            <span className="font-bold text-white">{stats.total_predictions.toLocaleString()}</span>
          </div>
          <div className="h-4 w-px bg-slate-600" />
          <div>
            <span className="text-slate-400">Last Updated:</span>{' '}
            <span className="font-medium text-white">
              {new Date(stats.last_updated).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, idx) => (
          <div
            key={idx}
            className={`${stat.bgColor} rounded-xl p-6 border-2 border-gray-200 hover:shadow-lg transition-shadow`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`p-3 rounded-lg bg-white shadow-sm`}>
                <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
              </div>
            </div>
            <p className="text-sm font-medium text-gray-600 mb-1">{stat.label}</p>
            <p className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6 border-2 border-gray-100">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Performance Metrics</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={metricsData}>
                <PolarGrid stroke="#e5e7eb" />
                <PolarAngleAxis dataKey="metric" tick={{ fill: '#6b7280', fontSize: 12 }} />
                <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#6b7280' }} />
                <Radar
                  name="Model Performance"
                  dataKey="value"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.6}
                />
                <Tooltip formatter={(value: number) => `${value.toFixed(1)}%`} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border-2 border-gray-100">
          <h3 className="text-xl font-bold text-gray-800 mb-4">About the Model</h3>
          <div className="space-y-4 text-sm text-gray-700">
            <div>
              <h4 className="font-semibold text-gray-800 mb-1">Algorithm</h4>
              <p>RandomForest Classifier with 100 estimators, trained on NASA exoplanet data</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-1">Training Data</h4>
              <p>Kepler, K2, and TESS mission datasets with confirmed, candidate, and false positive classifications</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-1">Key Features</h4>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Signal-to-Noise Ratio (SNR) - 28% importance</li>
                <li>Transit Depth - 24% importance</li>
                <li>Transit Duration - 19% importance</li>
                <li>Planetary Radius - 15% importance</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-1">Validation</h4>
              <p>5-fold cross-validation with stratified sampling to ensure balanced class representation</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-6 border-2 border-amber-200">
        <h3 className="text-lg font-bold text-gray-800 mb-2 flex items-center gap-2">
          <Activity className="w-5 h-5 text-amber-600" />
          Model Insights
        </h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-start gap-2">
            <span className="text-amber-600 font-bold">•</span>
            <span>High SNR and clear transit depth are the strongest indicators of confirmed exoplanets</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-600 font-bold">•</span>
            <span>Candidates typically show moderate confidence and may require additional observation</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-600 font-bold">•</span>
            <span>False positives often exhibit irregular transit patterns or low signal quality</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

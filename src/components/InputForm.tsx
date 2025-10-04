import { useState } from 'react';
import { ExoplanetFeatures } from '../ml/exoplanetModel';
import { Rocket } from 'lucide-react';

interface InputFormProps {
  onPredict: (features: ExoplanetFeatures) => void;
  isLoading: boolean;
}

export function InputForm({ onPredict, isLoading }: InputFormProps) {
  const [features, setFeatures] = useState<ExoplanetFeatures>({
    orbital_period: 15.234,
    transit_duration: 2.45,
    planetary_radius: 1.12,
    stellar_temp: 5778,
    snr: 12.5,
    depth: 0.0023
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (field: keyof ExoplanetFeatures, value: string) => {
    const numValue = parseFloat(value);
    setFeatures(prev => ({ ...prev, [field]: numValue }));

    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validate = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (features.orbital_period <= 0 || features.orbital_period > 10000) {
      newErrors.orbital_period = 'Must be between 0 and 10000 days';
    }
    if (features.transit_duration <= 0 || features.transit_duration > 24) {
      newErrors.transit_duration = 'Must be between 0 and 24 hours';
    }
    if (features.planetary_radius <= 0 || features.planetary_radius > 50) {
      newErrors.planetary_radius = 'Must be between 0 and 50 Earth radii';
    }
    if (features.stellar_temp < 2000 || features.stellar_temp > 10000) {
      newErrors.stellar_temp = 'Must be between 2000 and 10000 K';
    }
    if (features.snr <= 0 || features.snr > 100) {
      newErrors.snr = 'Must be between 0 and 100';
    }
    if (features.depth <= 0 || features.depth > 1) {
      newErrors.depth = 'Must be between 0 and 1';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onPredict(features);
    }
  };

  const inputFields = [
    {
      key: 'orbital_period',
      label: 'Orbital Period',
      unit: 'days',
      description: 'Time to complete one orbit',
      step: '0.001'
    },
    {
      key: 'transit_duration',
      label: 'Transit Duration',
      unit: 'hours',
      description: 'Duration of planetary transit',
      step: '0.01'
    },
    {
      key: 'planetary_radius',
      label: 'Planetary Radius',
      unit: 'R⊕',
      description: 'Radius relative to Earth',
      step: '0.01'
    },
    {
      key: 'stellar_temp',
      label: 'Stellar Temperature',
      unit: 'K',
      description: 'Host star temperature',
      step: '1'
    },
    {
      key: 'snr',
      label: 'Signal-to-Noise Ratio',
      unit: '',
      description: 'Detection confidence metric',
      step: '0.1'
    },
    {
      key: 'depth',
      label: 'Transit Depth',
      unit: '',
      description: 'Brightness decrease during transit',
      step: '0.0001'
    }
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {inputFields.map(field => (
          <div key={field.key}>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {field.label}
              {field.unit && <span className="text-gray-500 font-normal ml-1">({field.unit})</span>}
            </label>
            <input
              type="number"
              step={field.step}
              value={features[field.key as keyof ExoplanetFeatures]}
              onChange={(e) => handleChange(field.key as keyof ExoplanetFeatures, e.target.value)}
              className={`w-full px-4 py-3 rounded-lg border-2 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors[field.key]
                  ? 'border-red-300 bg-red-50'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
              disabled={isLoading}
            />
            {errors[field.key] && (
              <p className="mt-1 text-sm text-red-600">{errors[field.key]}</p>
            )}
            <p className="mt-1 text-xs text-gray-500">{field.description}</p>
          </div>
        ))}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 shadow-lg"
      >
        {isLoading ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Analyzing...
          </>
        ) : (
          <>
            <Rocket className="w-5 h-5" />
            Classify Exoplanet
          </>
        )}
      </button>
    </form>
  );
}

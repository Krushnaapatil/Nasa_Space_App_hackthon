import { useState, useRef } from 'react';
import { Upload, Download, FileText, X } from 'lucide-react';
import { parseCSV, generateSampleCSV, ParsedCSVRow } from '../utils/csvParser';

interface CSVUploadProps {
  onBatchPredict: (rows: ParsedCSVRow[]) => void;
  isLoading: boolean;
}

export function CSVUpload({ onBatchPredict, isLoading }: CSVUploadProps) {
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [rowCount, setRowCount] = useState<number>(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const csvText = event.target?.result as string;
        const parsedRows = parseCSV(csvText);
        setRowCount(parsedRows.length);
        onBatchPredict(parsedRows);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to parse CSV');
        setFileName(null);
        setRowCount(0);
      }
    };
    reader.onerror = () => {
      setError('Failed to read file');
      setFileName(null);
    };
    reader.readAsText(file);
  };

  const handleDownloadSample = () => {
    const sampleCSV = generateSampleCSV();
    const blob = new Blob([sampleCSV], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'exoplanet_sample.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleClearFile = () => {
    setFileName(null);
    setError(null);
    setRowCount(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-gray-800 rounded-xl p-6 border-2 border-gray-700">
        <div className="flex items-start gap-4">
          <FileText className="w-6 h-6 text-orange-500 flex-shrink-0 mt-1" />
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white mb-2">Batch Analysis via CSV</h3>
            <p className="text-sm text-gray-300 mb-4">
              Upload a CSV file with multiple exoplanet observations for batch classification.
              Required columns: orbital_period, transit_duration, planetary_radius, stellar_temp, snr, depth
            </p>

            <div className="flex flex-wrap gap-3">
              <label className="cursor-pointer">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv"
                  onChange={handleFileSelect}
                  className="hidden"
                  disabled={isLoading}
                />
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50">
                  <Upload className="w-4 h-4" />
                  Choose CSV File
                </div>
              </label>

              <button
                onClick={handleDownloadSample}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-700 text-white border-2 border-orange-500 rounded-lg hover:bg-gray-600 transition-colors"
              >
                <Download className="w-4 h-4" />
                Download Sample CSV
              </button>
            </div>

            {fileName && (
              <div className="mt-4 flex items-center justify-between bg-gray-900 rounded-lg p-3 border-2 border-green-500/50">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-green-400" />
                  <div>
                    <p className="font-medium text-white">{fileName}</p>
                    <p className="text-sm text-gray-400">{rowCount} rows detected</p>
                  </div>
                </div>
                <button
                  onClick={handleClearFile}
                  className="p-1 hover:bg-gray-700 rounded transition-colors"
                  disabled={isLoading}
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            )}

            {error && (
              <div className="mt-4 bg-red-900/20 border-2 border-red-500/50 rounded-lg p-3">
                <p className="text-sm text-red-400 font-medium">{error}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
        <h4 className="font-semibold text-gray-300 mb-2 text-sm">CSV Format Example:</h4>
        <pre className="text-xs font-mono bg-gray-900 text-gray-300 p-3 rounded border border-gray-700 overflow-x-auto">
{`orbital_period,transit_duration,planetary_radius,stellar_temp,snr,depth
15.234,2.45,1.12,5778,12.5,0.0023
3.567,1.23,0.89,6200,18.3,0.0045`}
        </pre>
      </div>
    </div>
  );
}

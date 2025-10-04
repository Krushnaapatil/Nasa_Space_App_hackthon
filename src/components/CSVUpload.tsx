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
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200">
        <div className="flex items-start gap-4">
          <FileText className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Batch Analysis via CSV</h3>
            <p className="text-sm text-gray-600 mb-4">
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
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50">
                  <Upload className="w-4 h-4" />
                  Choose CSV File
                </div>
              </label>

              <button
                onClick={handleDownloadSample}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
              >
                <Download className="w-4 h-4" />
                Download Sample CSV
              </button>
            </div>

            {fileName && (
              <div className="mt-4 flex items-center justify-between bg-white rounded-lg p-3 border-2 border-green-200">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="font-medium text-gray-800">{fileName}</p>
                    <p className="text-sm text-gray-600">{rowCount} rows detected</p>
                  </div>
                </div>
                <button
                  onClick={handleClearFile}
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                  disabled={isLoading}
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            )}

            {error && (
              <div className="mt-4 bg-red-50 border-2 border-red-200 rounded-lg p-3">
                <p className="text-sm text-red-700 font-medium">{error}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
        <h4 className="font-semibold text-gray-700 mb-2 text-sm">CSV Format Example:</h4>
        <pre className="text-xs font-mono bg-white p-3 rounded border border-gray-300 overflow-x-auto">
{`orbital_period,transit_duration,planetary_radius,stellar_temp,snr,depth
15.234,2.45,1.12,5778,12.5,0.0023
3.567,1.23,0.89,6200,18.3,0.0045`}
        </pre>
      </div>
    </div>
  );
}

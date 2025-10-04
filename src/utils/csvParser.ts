import { ExoplanetFeatures } from '../ml/exoplanetModel';

export interface ParsedCSVRow extends ExoplanetFeatures {
  rowIndex: number;
}

export function parseCSV(csvText: string): ParsedCSVRow[] {
  const lines = csvText.trim().split('\n');
  if (lines.length < 2) {
    throw new Error('CSV must contain at least a header row and one data row');
  }

  const headers = lines[0].split(',').map(h => h.trim().toLowerCase());

  const requiredFields = [
    'orbital_period',
    'transit_duration',
    'planetary_radius',
    'stellar_temp',
    'snr',
    'depth'
  ];

  const headerIndices: { [key: string]: number } = {};
  for (const field of requiredFields) {
    const index = headers.findIndex(h =>
      h === field ||
      h.replace(/_/g, '') === field.replace(/_/g, '') ||
      h.replace(/[_\s]/g, '') === field.replace(/_/g, '')
    );
    if (index === -1) {
      throw new Error(`Required column '${field}' not found in CSV. Found headers: ${headers.join(', ')}`);
    }
    headerIndices[field] = index;
  }

  const parsedRows: ParsedCSVRow[] = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const values = line.split(',').map(v => v.trim());

    try {
      const row: ParsedCSVRow = {
        orbital_period: parseFloat(values[headerIndices.orbital_period]),
        transit_duration: parseFloat(values[headerIndices.transit_duration]),
        planetary_radius: parseFloat(values[headerIndices.planetary_radius]),
        stellar_temp: parseFloat(values[headerIndices.stellar_temp]),
        snr: parseFloat(values[headerIndices.snr]),
        depth: parseFloat(values[headerIndices.depth]),
        rowIndex: i
      };

      if (Object.values(row).some(v => typeof v === 'number' && isNaN(v))) {
        console.warn(`Row ${i} contains invalid numeric values, skipping`);
        continue;
      }

      parsedRows.push(row);
    } catch (error) {
      console.warn(`Error parsing row ${i}:`, error);
    }
  }

  if (parsedRows.length === 0) {
    throw new Error('No valid data rows found in CSV');
  }

  return parsedRows;
}

export function generateSampleCSV(): string {
  const header = 'orbital_period,transit_duration,planetary_radius,stellar_temp,snr,depth';
  const rows = [
    '15.234,2.45,1.12,5778,12.5,0.0023',
    '3.567,1.23,0.89,6200,18.3,0.0045',
    '89.123,4.12,2.34,5100,8.7,0.0012',
    '1.234,0.78,0.65,4500,7.2,0.0008',
    '234.567,5.67,3.45,5900,22.1,0.0067',
    '45.678,3.12,1.78,6100,15.6,0.0034',
    '7.890,1.45,0.98,5500,9.8,0.0015',
    '123.456,4.56,2.12,5800,19.4,0.0052'
  ];

  return [header, ...rows].join('\n');
}

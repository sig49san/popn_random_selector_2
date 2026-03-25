
import * as fs from 'fs';
import * as path from 'path';
import { parse } from 'csv-parse/sync';
import * as url from 'url';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface MusicDataJson {
  id: number;
  version: number;
  genre: string;
  musicName: string;
  artist: string;
  bpm: string;
  light: number;
  normal: number;
  hyper: number;
  extra: number;
  inFolderCheck: number;
}

// Google Spreadsheet の CSV エクスポート URL
// edit リンクから export?format=csv に変換したもの
const SPREADSHEET_URL = 'https://docs.google.com/spreadsheets/d/1eITfr3_oeCa8oH9jJPX7dpcVKnTK_U9N57zsdOfH9n8/export?format=csv&gid=1711844479';
const jsonFilePath = path.resolve(__dirname, '../data/music_data.json');

const processSpreadsheet = async () => {
  console.log('Fetching data from Google Spreadsheet...');
  const response = await fetch(SPREADSHEET_URL);

  if (!response.ok) {
    throw new Error(`Failed to fetch spreadsheet: ${response.statusText}`);
  }

  const csvText = await response.text();

  // CSVテキストをパース
  const records: any[] = parse(csvText, {
    columns: true, // ヘッダー行を列名として使用
    skip_empty_lines: true,
    trim: true,
  });

  const musicItems: MusicDataJson[] = records.map((record) => ({
    id: parseInt(record.id || '0', 10),
    version: parseInt(record.version || '0', 10),
    genre: record.genre || '',
    musicName: record.musicName || '',
    artist: record.artist || '',
    bpm: record.bpm || '',
    light: parseInt(record.easy || '-1', 10), // easyをlightにマッピング
    normal: parseInt(record.normal || '-1', 10),
    hyper: parseInt(record.hyper || '-1', 10),
    extra: parseInt(record.extra || '-1', 10),
    inFolderCheck: parseInt(record.inFolderCheck || '0', 10),
  }));

  fs.writeFileSync(jsonFilePath, JSON.stringify(musicItems, null, 2), { encoding: 'utf8' });
  console.log(`Successfully converted Spreadsheet to JSON: ${jsonFilePath}`);
  console.log(`Total records: ${musicItems.length}`);
};

processSpreadsheet().catch(err => {
  console.error('Error processing Spreadsheet:', err);
});
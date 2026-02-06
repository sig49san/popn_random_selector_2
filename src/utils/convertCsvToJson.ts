import * as fs from 'fs';
import * as path from 'path';
import { parse } from 'csv-parse';
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

const csvFilePath = path.resolve(__dirname, '../data/popn_music_list.csv');
const jsonFilePath = path.resolve(__dirname, '../data/music_data.json');

const processCsv = async () => {
  const records = [];
  const parser = fs
    .createReadStream(csvFilePath)
    .pipe(parse({
      columns: true, // ヘッダー行を列名として使用
      skip_empty_lines: true,
      trim: true,
    }));

  for await (const record of parser) {
    // CSVのeasyをJSONのlightにマッピングし、不要なcreated_at, updated_atを省く
    const musicItem: MusicDataJson = {
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
    };
    records.push(musicItem);
  }

  fs.writeFile(jsonFilePath, JSON.stringify(records, null, 2), { encoding: 'utf8' }, (err) => {
    if (err) {
      console.error('Failed to write JSON file:', err);
      return;
    }
    console.log(`Successfully converted CSV to JSON: ${jsonFilePath}`);
  });
};

processCsv().catch(err => {
  console.error('Error processing CSV:', err);
});
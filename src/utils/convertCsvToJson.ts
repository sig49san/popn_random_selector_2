import * as fs from 'fs';
import * as url from 'url';
import * as path from 'path';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface MusicDataCsv {
  id: string;
  version: string;
  genre: string;
  musicName: string;
  artist: string;
  bpm: string;
  easy: string;
  normal: string;
  hyper: string;
  extra: string;
  inFolderCheck: string;
  created_at: string;
  updated_at: string;
}

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

fs.readFile(csvFilePath, { encoding: 'utf8' }, (err, data) => {
  if (err) {
    console.error('Failed to read CSV file:', err);
    return;
  }

  const lines = data.trim().split('\n');
  const headers = lines[0].split(',');
  const result: MusicDataJson[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',');
    const obj: Partial<MusicDataCsv> = {};
    headers.forEach((header, index) => {
      obj[header as keyof MusicDataCsv] = values[index];
    });

    // CSVのeasyをJSONのlightにマッピングし、不要なcreated_at, updated_atを省く
    const musicItem: MusicDataJson = {
      id: parseInt(obj.id || '0', 10),
      version: parseInt(obj.version || '0', 10),
      genre: obj.genre || '',
      musicName: obj.musicName || '',
      artist: obj.artist || '',
      bpm: obj.bpm || '',
      light: parseInt(obj.easy || '-1', 10),
      normal: parseInt(obj.normal || '-1', 10),
      hyper: parseInt(obj.hyper || '-1', 10),
      extra: parseInt(obj.extra || '-1', 10),
      inFolderCheck: parseInt(obj.inFolderCheck || '0', 10),
    };
    result.push(musicItem);
  }

  fs.writeFile(jsonFilePath, JSON.stringify(result, null, 2), { encoding: 'utf8' }, (err) => {
    if (err) {
      console.error('Failed to write JSON file:', err);
      return;
    }
    console.log(`Successfully converted CSV to JSON: ${jsonFilePath}`);
  });
});

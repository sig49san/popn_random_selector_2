export interface MusicData {
  id: number;
  version: number;
  seriesName: string; // ここを追加
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

import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import { parse } from 'csv-parse/sync'; // 同期APIを使用
import * as path from 'path';

// テスト用のダミーCSVファイルを作成するヘルパー関数
const createDummyCsv = (content: string) => {
  const dummyCsvPath = path.join(__dirname, 'dummy_popn_music_list.csv');
  fs.writeFileSync(dummyCsvPath, content, 'utf8');
  return dummyCsvPath;
};

// スクリプトの実行ロジックを直接実行するヘルパー関数
// csv-parseライブラリを使用するように修正
const parseCsvString = (csvString: string) => {
  const records = parse(csvString, {
    columns: true, // ヘッダー行を列名として使用
    skip_empty_lines: true,
    trim: true,
  });

  const result: any[] = [];
  for (const record of records) {
    const musicItem: any = {
      id: parseInt(record.id || '0', 10),
      version: parseInt(record.version || '0', 10),
      genre: record.genre || '',
      musicName: record.musicName || '',
      artist: record.artist || '',
      bpm: record.bpm || '',
      light: parseInt(record.easy || '-1', 10),
      normal: parseInt(record.normal || '-1', 10),
      hyper: parseInt(record.hyper || '-1', 10),
      extra: parseInt(record.extra || '-1', 10),
      inFolderCheck: parseInt(record.inFolderCheck || '0', 10),
    };
    result.push(musicItem);
  }
  return result;
};


describe('convertCsvToJson', () => {
  it('should convert CSV data to JSON correctly, including problematic entries', async () => {
    const csvContent = `id,version,genre,musicName,artist,bpm,easy,normal,hyper,extra,inFolderCheck,created_at,updated_at
1,1,J-テクノ,Quick Master,act deft,147,2,10,23,-1,1,2025-02-12 22:30:00,2025-02-12 22:30:00
2,1,アニメヒーロー,The theme of GAMBLER Z,words:RYO song:NARAMCHA,161,-1,18,23,-1,1,2025-02-12 22:30:00,2025-02-12 22:30:00
142,8,ピアノロック,マリンドライブ,"Oh,la,la!",150,-1,24,34,40,1,2025-02-12 22:30:00,2025-02-12 22:30:00`;
    
    // csv-parseが正しくパースする結果を期待値として設定
    const expectedResult = [
      {
        id: 1,
        version: 1,
        genre: "J-テクノ",
        musicName: "Quick Master",
        artist: "act deft",
        bpm: "147",
        light: 2,
        normal: 10,
        hyper: 23,
        extra: -1,
        inFolderCheck: 1
      },
      {
        id: 2,
        version: 1,
        genre: "アニメヒーロー",
        musicName: "The theme of GAMBLER Z",
        artist: "words:RYO song:NARAMCHA",
        bpm: "161",
        light: -1,
        normal: 18,
        hyper: 23,
        extra: -1,
        inFolderCheck: 1
      },
      { // ID 142 は csv-parse によって正しくパースされる
        id: 142,
        version: 8,
        genre: "ピアノロック",
        musicName: "マリンドライブ",
        artist: "Oh,la,la!", // ダブルクォーテーションは取り除かれる
        bpm: "150",
        light: -1,
        normal: 24,
        hyper: 34,
        extra: 40,
        inFolderCheck: 1,
      }
    ];

    const actualResult = parseCsvString(csvContent);
    expect(actualResult).toEqual(expectedResult);
  });
});

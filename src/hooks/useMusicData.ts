import { useState, useEffect, useCallback } from 'react';
import type { MusicData } from '../types/MusicData';
import allMusicData from '../data/music_data.json'; // 生成したJSONデータを直接インポート

/**
 * 配列をランダムに指定数取得する関数
 * Fisher-Yates（Knuth）シャッフルアルゴリズムを使用
 */
const getRandomItems = <T>(data: T[], count: number): T[] => {
  const shuffled = [...data];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, count);
};

interface UseMusicDataResult {
  selectedMusic: MusicData[];
  drawMusic: (count: number) => void;
  loading: boolean;
  error: string | null;
}

export const useMusicData = (): UseMusicDataResult => {
  const [selectedMusic, setSelectedMusic] = useState<MusicData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [musicData, setMusicData] = useState<MusicData[]>([]);

  useEffect(() => {
    // JSONデータは直接インポートしているので、ここでは読み込みエラーチェックのみ
    if (allMusicData && allMusicData.length > 0) {
      setMusicData(allMusicData as MusicData[]);
      setLoading(false);
    } else {
      setError('楽曲データの読み込みに失敗しました。');
      setLoading(false);
    }
  }, []);

  const drawMusic = useCallback((count: number) => {
    if (musicData.length === 0) {
      setError('楽曲データがありません。');
      setSelectedMusic([]);
      return;
    }
    const drawn = getRandomItems(musicData, count);
    setSelectedMusic(drawn);
  }, [musicData]);

  return { selectedMusic, drawMusic, loading, error };
};

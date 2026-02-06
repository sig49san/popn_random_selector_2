import { renderHook } from '@testing-library/react'; // @testing-library/react から renderHook をインポート
import { act, waitFor } from '@testing-library/react'; // act, waitFor も @testing-library/react から
import { useMusicData } from './useMusicData';
import allMusicData from '../data/music_data.json';
import type { MusicData } from '../types/MusicData';
import { describe, it, expect, vi, beforeEach } from 'vitest';

// モックデータ: テストごとに異なるインスタンスを保証するため、vi.mockの外で定義
const mockMusicData: MusicData[] = [
  { id: 1, version: 1, genre: "J-テクノ", musicName: "Quick Master", artist: "act deft", bpm: "147", light: 2, normal: 10, hyper: 23, extra: -1, inFolderCheck: 1 },
  { id: 2, version: 1, genre: "アニメヒーロー", musicName: "The theme of GAMBLER Z", artist: "words:RYO song:NARAMCHA", bpm: "161", light: -1, normal: 18, hyper: 23, extra: -1, inFolderCheck: 1 },
  { id: 3, version: 1, genre: "スパイ", musicName: "SPICY PIECE", artist: "ORIGINAL SOUND TRACKS", bpm: "156", light: -1, normal: 23, hyper: 29, extra: -1, inFolderCheck: 1 },
  { id: 4, version: 1, genre: "ダンス", musicName: "Hi-Tekno", artist: "Hi-Tekno", bpm: "140", light: -1, normal: 17, hyper: 24, extra: -1, inFolderCheck: 1 },
  { id: 5, version: 1, genre: "テクノポップ", musicName: "Electronic Fill", artist: "Windslope", bpm: "121", light: -1, normal: 19, hyper: 24, extra: -1, inFolderCheck: 1 },
  { id: 6, version: 1, genre: "ファンタジー", musicName: "monde des songe", artist: "Bikke", bpm: "119", light: 3, normal: 11, hyper: 30, extra: 36, inFolderCheck: 1 },
  { id: 7, version: 1, genre: "ボーナストラック", musicName: "すれちがう二人", artist: "aprésmidi", bpm: "136", light: -1, normal: 18, hyper: -1, extra: -1, inFolderCheck: 1 },
  { id: 8, version: 1, genre: "ポップス", musicName: "I REALLY WANT TO HURT YOU", artist: "SUGI & REO", bpm: "142", light: 1, normal: 14, hyper: 19, extra: 38, inFolderCheck: 1 },
  { id: 9, version: 1, genre: "ラテン", musicName: "El pais del sol", artist: "Senórita Rica", bpm: "106-109", light: -1, normal: 12, hyper: -1, extra: -1, inFolderCheck: 1 },
  { id: 10, version: 1, genre: "レイヴ", musicName: "e-motion", artist: "e.o.s", bpm: "145", light: -1, normal: 21, hyper: -1, extra: -1, inFolderCheck: 1 },
];

vi.mock('../data/music_data.json', () => {
  return {
    default: mockMusicData,
  };
});

// `renderHook` を使用する際に、wrapper を提供する必要がある
const wrapper = ({ children }: { children: React.ReactNode }) => <div>{children}</div>;

describe('useMusicData', () => {
  // 各テストの前にモックの状態をリセット
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with loading true and then false with data', async () => {
    const { result } = renderHook(() => useMusicData(), { wrapper });

    expect(result.current.loading).toBe(true);

    await act(async () => {
      // useEffect内のsetStateが反映されるのを待つ
      await new Promise(resolve => setTimeout(resolve, 0)); // マイクロタスクキューをフラッシュ
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.selectedMusic).toEqual([]);
    // musicDataがロードされていることを確認 (内部状態なので直接はテストしにくいが、errorがnullならOK)
  });

  it('should return correct number of unique music items when drawMusic is called', async () => {
    const { result } = renderHook(() => useMusicData(), { wrapper });
    
    // データロード完了を待つ
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    act(() => {
      result.current.drawMusic(5);
    });

    expect(result.current.selectedMusic).toHaveLength(5);
    const uniqueIds = new Set(result.current.selectedMusic.map(m => m.id));
    expect(uniqueIds.size).toBe(5); // 重複がないことを確認
  });

  it('should handle drawing more items than available data gracefully', async () => {
    const { result } = renderHook(() => useMusicData(), { wrapper });
    
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    act(() => {
      // モックデータは10件なので、15件を要求すると利用可能な最大件数（10件）が返されるはず
      result.current.drawMusic(15); 
    });

    expect(result.current.selectedMusic).toHaveLength(10);
    const uniqueIds = new Set(result.current.selectedMusic.map(m => m.id));
    expect(uniqueIds.size).toBe(10);
  });

  it('should return different results on successive calls (basic randomness check)', async () => {
    const { result } = renderHook(() => useMusicData(), { wrapper });
    
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    act(() => {
      result.current.drawMusic(3);
    });
    const firstDraw = result.current.selectedMusic;

    act(() => {
      result.current.drawMusic(3);
    });
    const secondDraw = result.current.selectedMusic;
    
    // 完全に同じ配列になる可能性は低いが、異なる可能性が高いことを期待
    expect(firstDraw).not.toEqual(secondDraw);
  });
});
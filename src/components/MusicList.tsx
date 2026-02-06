import React from 'react';
import { List, ListItem, ListItemText, Typography, Box, Stack } from '@mui/material';
import type { MusicData } from '../types/MusicData';

interface MusicListProps {
  musicList: MusicData[];
}

const MusicList: React.FC<MusicListProps> = ({ musicList }) => {
  if (musicList.length === 0) {
    return null;
  }

  const formatDifficulty = (level: number) => (level === -1 ? '-' : level.toString());

  // 難易度ごとの色定義
  const difficultyColors = {
    light: '#80d8ff', // 淡い青
    normal: '#b9f6ca', // 淡い緑
    hyper: '#ffeb3b', // 淡い黄
    extra: '#ff8a80', // 淡い赤
    default: 'rgba(0, 0, 0, 0.6)', // デフォルトの色
  };

  return (
    <Box sx={{ mt: 2, maxWidth: 600, margin: '0 auto', px: 2, bgcolor: '#424242', borderRadius: '8px' }}> {/* 背景色を灰色に、角を丸める */}
      <List disablePadding>
        {musicList.map((music, index) => (
          <ListItem key={`${music.id}-${index}`} disableGutters sx={{ py: 1.5, display: 'flex', alignItems: 'center', borderBottom: index < musicList.length - 1 ? '1px solid rgba(255, 255, 255, 0.12)' : 'none' }}>
            {/* 左側のID (version) */}
            <Box sx={{ flexShrink: 0, mr: 2, width: 30, textAlign: 'center', color: '#bdbdbd', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
              <Typography variant="h6" component="span" fontWeight="bold" sx={{ lineHeight: 1 }}>
                {music.version}
              </Typography>
            </Box>

            {/* 中央の楽曲情報 */}
            <ListItemText
              primary={
                <React.Fragment>
                  <Typography variant="subtitle1" component="div" align="center" fontWeight="bold" sx={{ color: '#ffffff', mb: 0.5 }}>
                    {music.genre} {/* ジャンル名を目立たせる (太字) */}
                  </Typography>
                  <Typography variant="body1" component="div" align="center" sx={{ color: '#bdbdbd' }}>
                    {music.musicName} {/* 楽曲名を薄く */}
                  </Typography>
                  <Typography variant="body2" component="div" align="center" sx={{ color: '#bdbdbd' }}>
                    {music.artist} {/* アーティスト名を薄く */}
                  </Typography>
                </React.Fragment>
              }
              sx={{ flexGrow: 1, mr: 2 }}
            />

            {/* 右側の難易度情報 */}
            <Stack direction="column" spacing={0.2} sx={{ flexShrink: 0, textAlign: 'right', justifyContent: 'flex-end', height: '100%' }}>
              <Typography variant="caption" sx={{ color: difficultyColors.light, lineHeight: 1 }}>L: {formatDifficulty(music.light)}</Typography>
              <Typography variant="caption" sx={{ color: difficultyColors.normal, lineHeight: 1 }}>N: {formatDifficulty(music.normal)}</Typography>
              <Typography variant="caption" sx={{ color: difficultyColors.hyper, lineHeight: 1 }}>H: {formatDifficulty(music.hyper)}</Typography>
              <Typography variant="caption" sx={{ color: difficultyColors.extra, lineHeight: 1 }}>E: {formatDifficulty(music.extra)}</Typography>
            </Stack>
          </ListItem>
        ))}
        {/* 最後のアイテムのボーダーは削除 */}
        <ListItem disableGutters sx={{ py: 1.5, display: 'flex', alignItems: 'flex-start' }} />
      </List>
    </Box>
  );
};

export default MusicList;
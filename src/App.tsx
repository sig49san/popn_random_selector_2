import React, { useState } from 'react';
import { useMusicData } from './hooks/useMusicData';
import MusicSelector from './components/MusicSelector';
import MusicList from './components/MusicList';
import { Container, Typography, Box } from '@mui/material'; // Material UIのコンポーネントを追加
import './App.css'; // デフォルトのCSSを維持する

function App() {
  const { selectedMusic, drawMusic, loading, error } = useMusicData();
  const [selectedCount, setSelectedCount] = useState<number>(20); // デフォルト20曲

  const handleSelectMusic = (count: number) => {
    drawMusic(count);
  };

  if (loading) {
    return <Typography>Loading music data...</Typography>;
  }

  if (error) {
    return <Typography color="error">Error: {error}</Typography>;
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          Pop'n Music 楽曲おみくじ
        </Typography>
        <MusicSelector
          onSelect={handleSelectMusic}
          selectedCount={selectedCount}
          setSelectedCount={setSelectedCount}
        />
        <MusicList musicList={selectedMusic} />
      </Box>
    </Container>
  );
}

export default App;

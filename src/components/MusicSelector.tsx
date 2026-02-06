import React from 'react';
import { Box, Slider, Button, Typography } from '@mui/material';

interface MusicSelectorProps {
  onSelect: (count: number) => void;
  selectedCount: number;
  setSelectedCount: (count: number) => void;
}

const MusicSelector: React.FC<MusicSelectorProps> = ({ onSelect, selectedCount, setSelectedCount }) => {
  const handleChange = (_event: Event, newValue: number | number[]) => {
    setSelectedCount(newValue as number);
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 400, margin: '20px auto', textAlign: 'center' }}>
      <Typography gutterBottom variant="h6">
        表示曲数: {selectedCount}
      </Typography>
      <Slider
        value={selectedCount}
        min={1}
        max={20}
        step={1}
        onChange={handleChange}
        valueLabelDisplay="auto"
        aria-labelledby="music-count-slider"
        sx={{ mb: 2 }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={() => onSelect(selectedCount)}
        sx={{ mt: 2, p: 1.5, fontSize: '1.1rem' }}
      >
        ランダムセレクト！
      </Button>
    </Box>
  );
};

export default MusicSelector;

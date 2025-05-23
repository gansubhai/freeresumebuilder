import { Box, Typography, Button, TextField } from '@mui/material';
import { useState } from 'react';

function AccomplishmentsSection({ accomplishments, setResumeData }) {
  const [newAccomplishment, setNewAccomplishment] = useState('');

  const addAccomplishment = () => {
    if (newAccomplishment.trim()) {
      setResumeData((prev) => ({
        ...prev,
        accomplishments: [...prev.accomplishments, newAccomplishment.trim()],
      }));
      setNewAccomplishment('');
    }
  };

  const updateAccomplishment = (index, value) => {
    setResumeData((prev) => {
      const newAccomplishments = [...prev.accomplishments];
      newAccomplishments[index] = value;
      return { ...prev, accomplishments: newAccomplishments };
    });
  };

  const deleteAccomplishment = (index) => {
    setResumeData((prev) => ({
      ...prev,
      accomplishments: prev.accomplishments.filter((_, i) => i !== index),
    }));
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Accomplishments
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField
          label="Add an accomplishment"
          value={newAccomplishment}
          onChange={(e) => setNewAccomplishment(e.target.value)}
          variant="outlined"
          fullWidth
        />
        <Button variant="contained" onClick={addAccomplishment}>
          Add
        </Button>
      </Box>
      {accomplishments.map((acc, index) => (
        <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <TextField
            value={acc}
            onChange={(e) => updateAccomplishment(index, e.target.value)}
            variant="outlined"
            fullWidth
            sx={{ mr: 2 }}
          />
          <Button variant="outlined" color="error" onClick={() => deleteAccomplishment(index)}>
            Delete
          </Button>
        </Box>
      ))}
    </Box>
  );
}

export default AccomplishmentsSection;
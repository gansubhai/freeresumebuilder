import { Box, Typography, Autocomplete, Chip, TextField, MenuItem, Select, FormControl, InputLabel, Grid } from '@mui/material';
import { useState } from 'react';

function LanguagesSection({ languages, setResumeData }) {
  const [newLanguage, setNewLanguage] = useState({ name: '', proficiency: 'Excellent' });

  const handleAddLanguage = (value) => {
    if (value && value.trim() && !languages.find((lang) => lang.name.toLowerCase() === value.trim().toLowerCase())) {
      setResumeData((prev) => ({
        ...prev,
        languages: [...prev.languages, { name: value.trim(), proficiency: newLanguage.proficiency }],
      }));
      setNewLanguage({ name: '', proficiency: 'Excellent' });
    }
  };

  const handleProficiencyChange = (index, value) => {
    setResumeData((prev) => {
      const newLanguages = [...prev.languages];
      newLanguages[index] = { ...newLanguages[index], proficiency: value };
      return { ...prev, languages: newLanguages };
    });
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Languages
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <Autocomplete
          freeSolo
          value={newLanguage.name}
          onChange={(event, value) => handleAddLanguage(value)}
          inputValue={newLanguage.name}
          onInputChange={(event, newInputValue) => setNewLanguage((prev) => ({ ...prev, name: newInputValue }))}
          options={[]}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Add a language and press Enter"
              variant="outlined"
              onKeyDown={(event) => {
                if (event.key === 'Enter' && newLanguage.name.trim()) {
                  event.preventDefault();
                  handleAddLanguage(newLanguage.name);
                }
              }}
            />
          )}
          sx={{ flexGrow: 1 }}
        />
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Proficiency</InputLabel>
          <Select
            value={newLanguage.proficiency}
            onChange={(e) => setNewLanguage((prev) => ({ ...prev, proficiency: e.target.value }))}
            label="Proficiency"
          >
            <MenuItem value="Excellent">Excellent</MenuItem>
            <MenuItem value="Good">Good</MenuItem>
            <MenuItem value="Basic">Basic</MenuItem>
          </Select>
        </FormControl>
      </Box>
      {languages.map((lang, index) => (
        <Grid container spacing={2} key={index} sx={{ mb: 1, alignItems: 'center' }}>
          <Grid item xs={6}>
            <Chip
              label={lang.name}
              onDelete={() =>
                setResumeData((prev) => ({
                  ...prev,
                  languages: prev.languages.filter((_, i) => i !== index),
                }))
              }
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Proficiency</InputLabel>
              <Select
                value={lang.proficiency}
                onChange={(e) => handleProficiencyChange(index, e.target.value)}
                label="Proficiency"
              >
                <MenuItem value="Excellent">Excellent</MenuItem>
                <MenuItem value="Good">Good</MenuItem>
                <MenuItem value="Basic">Basic</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      ))}
    </Box>
  );
}

export default LanguagesSection;
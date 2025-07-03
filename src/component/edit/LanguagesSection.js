import { Box, Typography, Autocomplete, Chip, TextField, MenuItem, Select, FormControl, InputLabel, Grid, Tooltip } from '@mui/material';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Delete } from '@mui/icons-material';

// Animation variants for inputs, selects, and chips
const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, delay: index * 0.1 },
  }),
  hover: { scale: 1.02, boxShadow: '0 4px 12px rgba(16, 185, 129, 0.2)' },
  focus: { borderColor: '#10b981', boxShadow: '0 0 8px rgba(16, 185, 129, 0.3)' },
};

function LanguagesSection({ languages, setResumeData }) {
  const [newLanguage, setNewLanguage] = useState({ name: '', proficiency: 'Excellent' });

  const mmToPx = (mm) => mm * 3.78;
  const defaultSideMargin = 10; // Default side margin in mm

  const handleAddLanguage = (value) => {
    const trimmedValue = value.trim();
    if (trimmedValue && !languages.find((lang) => lang.name.toLowerCase() === trimmedValue.toLowerCase())) {
      setResumeData((prev) => ({
        ...prev,
        languages: [...prev.languages, { name: trimmedValue, proficiency: newLanguage.proficiency }],
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
    <Box
      sx={{
        ml: mmToPx(defaultSideMargin) / 96,
        mr: mmToPx(defaultSideMargin) / 96,
        bgcolor: '#f5f5f5',
        p: 2,
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        mb: 3,
      }}
      component={motion.div}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
      }}
    >
      <Typography
        variant="h6"
        sx={{
          color: '#1e3a8a',
          fontWeight: 'bold',
          mb: 2,
        }}
      >
        Languages
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <Autocomplete
          freeSolo
          value={newLanguage.name}
          inputValue={newLanguage.name}
          onInputChange={(event, newInputValue) => setNewLanguage((prev) => ({ ...prev, name: newInputValue }))}
          onChange={(event, value) => handleAddLanguage(value)}
          options={[]}
          renderInput={(params) => (
            <Tooltip title="Type a language and press Enter to add" placement="top" arrow>
              <TextField
                {...params}
                label="Add a language"
                variant="outlined"
                size="small"
                error={newLanguage.name.trim() && languages.find((lang) => lang.name.toLowerCase() === newLanguage.name.trim().toLowerCase())}
                helperText={
                  newLanguage.name.trim() && languages.find((lang) => lang.name.toLowerCase() === newLanguage.name.trim().toLowerCase())
                    ? 'Language already exists'
                    : newLanguage.name.trim() === ''
                      ? 'Language cannot be empty'
                      : ''
                }
                onKeyDown={(event) => {
                  if (event.key === 'Enter' && newLanguage.name.trim()) {
                    event.preventDefault();
                    event.stopPropagation();
                    handleAddLanguage(newLanguage.name);
                  }
                }}
                sx={{
                  '& .MuiInputLabel-root': { color: '#1e3a8a' },
                  '& .MuiInputLabel-root.Mui-focused': { color: '#10b981' },
                  '& .MuiOutlinedInput-root': {
                    bgcolor: '#ffffff',
                    borderRadius: '6px',
                    '&:hover fieldset': { borderColor: '#10b981' },
                    '&.Mui-focused fieldset': { borderColor: '#10b981' },
                  },
                }}
                component={motion.div}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                whileFocus="focus"
                custom={0}
              />
            </Tooltip>
          )}
          sx={{ flexGrow: 1 }}
        />
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel sx={{ color: '#1e3a8a', '&.Mui-focused': { color: '#10b981' } }}>
            Proficiency
          </InputLabel>
          <Tooltip title="Select proficiency level for the new language" placement="top" arrow>
            <Select
              value={newLanguage.proficiency}
              onChange={(e) => setNewLanguage((prev) => ({ ...prev, proficiency: e.target.value }))}
              label="Proficiency"
              size="small"
              sx={{
                bgcolor: '#ffffff',
                borderRadius: '6px',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#e0e0e0',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#10b981',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#10b981',
                },
              }}
              component={motion.div}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              whileFocus="focus"
              custom={1}
            >
              <MenuItem value="Excellent">Excellent</MenuItem>
              <MenuItem value="Good">Good</MenuItem>
              <MenuItem value="Basic">Basic</MenuItem>
            </Select>
          </Tooltip>
        </FormControl>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        {languages.map((lang, index) => (
          <Grid
            container
            spacing={2}
            key={index}
            sx={{ alignItems: 'center' }}
            component={motion.div}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            custom={index + 2}
          >
            <Grid item xs={6}>
              <Tooltip title="Click to remove language" placement="top" arrow>
                <Chip
                  label={lang.name}
                  onDelete={() =>
                    setResumeData((prev) => ({
                      ...prev,
                      languages: prev.languages.filter((_, i) => i !== index),
                    }))
                  }
                  deleteIcon={<Delete />}
                  sx={{
                    bgcolor: '#e6fff9',
                    color: '#1e3a8a',
                    '&:hover': { bgcolor: '#d1f2eb' },
                    '& .MuiChip-deleteIcon': { color: '#dc2626', '&:hover': { color: '#b91c1c' } },
                  }}
                  component={motion.div}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                />
              </Tooltip>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel sx={{ color: '#1e3a8a', '&.Mui-focused': { color: '#10b981' } }}>
                  Proficiency
                </InputLabel>
                <Tooltip title="Select proficiency level" placement="top" arrow>
                  <Select
                    value={lang.proficiency}
                    onChange={(e) => handleProficiencyChange(index, e.target.value)}
                    label="Proficiency"
                    size="small"
                    sx={{
                      bgcolor: '#ffffff',
                      borderRadius: '6px',
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#e0e0e0',
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#10b981',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#10b981',
                      },
                    }}
                    component={motion.div}
                    variants={itemVariants}
                    whileHover="hover"
                    whileFocus="focus"
                  >
                    <MenuItem value="Excellent">Excellent</MenuItem>
                    <MenuItem value="Good">Good</MenuItem>
                    <MenuItem value="Basic">Basic</MenuItem>
                  </Select>
                </Tooltip>
              </FormControl>
            </Grid>
          </Grid>
        ))}
      </Box>
    </Box>
  );
}

export default LanguagesSection;
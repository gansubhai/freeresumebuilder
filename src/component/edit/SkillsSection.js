import { Box, Typography, Autocomplete, Chip, TextField, MenuItem, Select, FormControl, InputLabel, Grid } from '@mui/material';
import { useState } from 'react';

function SkillsSection({ skills, setResumeData }) {
  const [newSkill, setNewSkill] = useState({ name: '', proficiency: 'Excellent' });

  const handleAddSkill = (value) => {
    if (value && value.trim() && !skills.find((skill) => skill.name.toLowerCase() === value.trim().toLowerCase())) {
      setResumeData((prev) => ({
        ...prev,
        skills: [...prev.skills, { name: value.trim(), proficiency: newSkill.proficiency }],
      }));
      setNewSkill({ name: '', proficiency: 'Excellent' });
    }
  };

  const handleProficiencyChange = (index, value) => {
    setResumeData((prev) => {
      const newSkills = [...prev.skills];
      newSkills[index] = { ...newSkills[index], proficiency: value };
      return { ...prev, skills: newSkills };
    });
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Skills
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <Autocomplete
          freeSolo
          value={newSkill.name}
          onChange={(event, value) => handleAddSkill(value)}
          inputValue={newSkill.name}
          onInputChange={(event, newInputValue) => setNewSkill((prev) => ({ ...prev, name: newInputValue }))}
          options={[]}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Add a skill and press Enter"
              variant="outlined"
              onKeyDown={(event) => {
                if (event.key === 'Enter' && newSkill.name.trim()) {
                  event.preventDefault();
                  handleAddSkill(newSkill.name);
                }
              }}
            />
          )}
          sx={{ flexGrow: 1 }}
        />
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Proficiency</InputLabel>
          <Select
            value={newSkill.proficiency}
            onChange={(e) => setNewSkill((prev) => ({ ...prev, proficiency: e.target.value }))}
            label="Proficiency"
          >
            <MenuItem value="Excellent">Excellent</MenuItem>
            <MenuItem value="Good">Good</MenuItem>
            <MenuItem value="Basic">Basic</MenuItem>
          </Select>
        </FormControl>
      </Box>
      {skills.map((skill, index) => (
        <Grid container spacing={2} key={index} sx={{ mb: 1, alignItems: 'center' }}>
          <Grid item xs={6}>
            <Chip
              label={skill.name}
              onDelete={() =>
                setResumeData((prev) => ({
                  ...prev,
                  skills: prev.skills.filter((_, i) => i !== index),
                }))
              }
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Proficiency</InputLabel>
              <Select
                value={skill.proficiency}
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

export default SkillsSection;
import { Box, Typography, Autocomplete, Chip, TextField, MenuItem, Select, FormControl, Grid, InputLabel, Tooltip } from '@mui/material';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Delete } from '@mui/icons-material';

// Animation variants for input fields and chips
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
    <Box
      sx={{
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
        Skills
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <Autocomplete
          freeSolo
          value={newSkill.name}
          inputValue={newSkill.name}
          onInputChange={(event, newInputValue) => setNewSkill((prev) => ({ ...prev, name: newInputValue }))}
          options={[]}
          renderInput={(params) => (
            <Tooltip title="Type a skill and press Enter to add" placement="top" arrow>
              <TextField
                {...params}
                label="Add a skill"
                variant="outlined"
                size="small"
                error={newSkill.name.trim() && skills.find((skill) => skill.name.toLowerCase() === newSkill.name.trim().toLowerCase())}
                helperText={
                  newSkill.name.trim() && skills.find((skill) => skill.name.toLowerCase() === newSkill.name.trim().toLowerCase())
                    ? 'Skill already exists'
                    : newSkill.name.trim() === ''
                      ? 'Skill cannot be empty'
                      : ''
                }
                onKeyDown={(event) => {
                  if (event.key === 'Enter' && newSkill.name.trim()) {
                    event.preventDefault();
                    event.stopPropagation(); // Prevent Autocomplete from intercepting Enter
                    handleAddSkill(newSkill.name);
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
          <Tooltip title="Select proficiency level for the new skill" placement="top" arrow>
            <Select
              value={newSkill.proficiency}
              onChange={(e) => setNewSkill((prev) => ({ ...prev, proficiency: e.target.value }))}
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
        {skills.map((skill, index) => (
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
            <Grid item sx={{ width: '200px' }}>
              <Tooltip title="Click to remove skill" placement="top" arrow>
                <Chip
                  label={skill.name}
                  onDelete={() =>
                    setResumeData((prev) => ({
                      ...prev,
                      skills: prev.skills.filter((_, i) => i !== index),
                    }))
                  }
                  deleteIcon={<Delete />}
                  sx={{
                    maxWidth: '100%',
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
            <Grid item sx={{ minWidth: '150px', maxWidth: '150px' }}>
              <FormControl fullWidth>
                <InputLabel sx={{ color: '#1e3a8a', '&.Mui-focused': { color: '#10b981' } }}>
                  Proficiency
                </InputLabel>
                <Tooltip title="Select proficiency level" placement="top" arrow>
                  <Select
                    value={skill.proficiency}
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

export default SkillsSection;
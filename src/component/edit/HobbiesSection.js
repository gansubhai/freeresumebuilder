import { Box, Typography, Autocomplete, Chip, TextField, Tooltip } from '@mui/material';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Delete } from '@mui/icons-material';

// Animation variants for inputs and chips
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

function HobbiesSection({ hobbies, setResumeData }) {
  const [inputValue, setInputValue] = useState('');

  const mmToPx = (mm) => mm * 3.78;
  const defaultSideMargin = 10; // Default side margin in mm

  const handleAddHobby = (newValue) => {
    const trimmedValue = newValue.trim();
    if (trimmedValue && !hobbies.includes(trimmedValue.toLowerCase())) {
      setResumeData((prev) => ({
        ...prev,
        hobbies: [...prev.hobbies, trimmedValue],
      }));
      setInputValue('');
    }
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
        Hobbies and Interests
      </Typography>
      <Autocomplete
        multiple
        freeSolo
        value={hobbies}
        onChange={(event, newValue) => {
          setResumeData((prev) => ({
            ...prev,
            hobbies: newValue.map((v) => v.trim()).filter((v) => v && !hobbies.includes(v.toLowerCase())),
          }));
          setInputValue('');
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
        options={[]}
        renderInput={(params) => (
          <Tooltip title="Type a hobby and press Enter to add" placement="top" arrow>
            <TextField
              {...params}
              label="Add a hobby"
              variant="outlined"
              size="small"
              error={inputValue.trim() && hobbies.includes(inputValue.trim().toLowerCase())}
              helperText={
                inputValue.trim() && hobbies.includes(inputValue.trim().toLowerCase())
                  ? 'Hobby already exists'
                  : inputValue.trim() === ''
                    ? 'Hobby cannot be empty'
                    : ''
              }
              onKeyDown={(event) => {
                if (event.key === 'Enter' && inputValue.trim()) {
                  event.preventDefault();
                  event.stopPropagation();
                  handleAddHobby(inputValue);
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
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Tooltip title="Click to remove hobby" placement="top" arrow key={index}>
              <Chip
                label={option}
                deleteIcon={<Delete />}
                {...getTagProps({ index })}
                sx={{
                  bgcolor: '#e6fff9',
                  color: '#1e3a8a',
                  '&:hover': { bgcolor: '#d1f2eb' },
                  '& .MuiChip-deleteIcon': { color: '#dc2626', '&:hover': { color: '#b91c1c' } },
                }}
                component={motion.div}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                custom={index + 1}
              />
            </Tooltip>
          ))
        }
        fullWidth
        sx={{ mb: 2 }}
      />
    </Box>
  );
}

export default HobbiesSection;
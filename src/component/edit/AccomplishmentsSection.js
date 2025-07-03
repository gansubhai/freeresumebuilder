import { Box, Typography, Button, TextField } from '@mui/material';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tooltip } from '@mui/material';

// Animation variants for inputs, buttons, and rows
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

function AccomplishmentsSection({ accomplishments, setResumeData }) {
  const [newAccomplishment, setNewAccomplishment] = useState('');

  const mmToPx = (mm) => mm * 3.78;
  const defaultSideMargin = 10; // Default side margin in mm

  const addAccomplishment = () => {
    const trimmedValue = newAccomplishment.trim();
    if (trimmedValue && !accomplishments.includes(trimmedValue.toLowerCase())) {
      setResumeData((prev) => ({
        ...prev,
        accomplishments: [...prev.accomplishments, trimmedValue],
      }));
      setNewAccomplishment('');
    }
  };

  const updateAccomplishment = (index, value) => {
    const trimmedValue = value.trim();
    if (!trimmedValue || accomplishments.includes(trimmedValue.toLowerCase())) return;
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
        Accomplishments
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <Tooltip title="Type an accomplishment and press Enter or click Add" placement="top" arrow>
          <TextField
            label="Add an accomplishment"
            value={newAccomplishment}
            onChange={(e) => setNewAccomplishment(e.target.value)}
            variant="outlined"
            size="small"
            fullWidth
            error={newAccomplishment.trim() && accomplishments.includes(newAccomplishment.trim().toLowerCase())}
            helperText={
              newAccomplishment.trim() && accomplishments.includes(newAccomplishment.trim().toLowerCase())
                ? 'Accomplishment already exists'
                : newAccomplishment.trim() === ''
                  ? 'Accomplishment cannot be empty'
                  : ''
            }
            onKeyDown={(event) => {
              if (event.key === 'Enter' && newAccomplishment.trim()) {
                event.preventDefault();
                addAccomplishment();
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
        <Tooltip title="Add the accomplishment" placement="top" arrow>
          <Button
            variant="contained"
            onClick={addAccomplishment}
            disabled={!newAccomplishment.trim() || accomplishments.includes(newAccomplishment.trim().toLowerCase())}
            sx={{
              bgcolor: '#1e3a8a',
              '&:hover': { bgcolor: '#1565c0' },
              borderRadius: '8px',
              textTransform: 'none',
            }}
            component={motion.div}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.05 }}
            custom={1}
          >
            Add
          </Button>
        </Tooltip>
      </Box>
      <AnimatePresence>
        {accomplishments.map((acc, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
            custom={index + 2}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5, gap: 2 }}>
              <Tooltip title="Edit accomplishment" placement="top" arrow>
                <TextField
                  value={acc}
                  onChange={(e) => updateAccomplishment(index, e.target.value)}
                  variant="outlined"
                  size="small"
                  fullWidth
                  error={acc.trim() && accomplishments.find((a, i) => i !== index && a.toLowerCase() === acc.trim().toLowerCase())}
                  helperText={
                    acc.trim() && accomplishments.find((a, i) => i !== index && a.toLowerCase() === acc.trim().toLowerCase())
                      ? 'Accomplishment already exists'
                      : acc.trim() === ''
                        ? 'Accomplishment cannot be empty'
                        : ''
                  }
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
                  whileHover="hover"
                  whileFocus="focus"
                />
              </Tooltip>
              <Tooltip title="Delete this accomplishment" placement="top" arrow>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => deleteAccomplishment(index)}
                  sx={{
                    borderColor: '#dc2626',
                    color: '#dc2626',
                    '&:hover': { borderColor: '#b91c1c', color: '#b91c1c', bgcolor: '#fef2f2' },
                    borderRadius: '8px',
                    textTransform: 'none',
                  }}
                  component={motion.div}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  Delete
                </Button>
              </Tooltip>
            </Box>
          </motion.div>
        ))}
      </AnimatePresence>
    </Box>
  );
}

export default AccomplishmentsSection;
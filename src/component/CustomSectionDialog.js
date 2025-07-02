import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  Box,
} from '@mui/material';
import { motion } from 'framer-motion';
import TextareaAutosize from '@mui/material/TextareaAutosize';

// Animation variants for dialog content
const dialogVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
};

function CustomSectionDialog({
  open,
  onClose,
  customSection,
  setCustomSection,
  editIndex,
  handleSave,
  handleDelete,
  fontStyle,
  fontSize,
}) {
  // Helper to check if the save button should be disabled
  const isSaveDisabled = !customSection.heading.trim() || !customSection.description.trim();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: '12px',
          maxWidth: '500px',
          width: '90%',
          bgcolor: '#ffffff',
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
        },
      }}
      component={motion.div}
      variants={dialogVariants}
      initial="hidden"
      animate="visible"
    >
      <DialogTitle sx={{ bgcolor: '#1e3a8a', color: 'white', fontWeight: 'bold', py: 2 }}>
        {editIndex !== null ? 'Edit Custom Section' : 'Add Custom Section'}
      </DialogTitle>
      <DialogContent sx={{ p: 3 }}>
        <Box sx={{ mb: 2, mt: 1 }}>
          <Typography variant="body2" sx={{ color: '#616161', mb: 1 }}>
            Tip: Use clear, professional headings (e.g., "Projects", "Volunteer Work") to ensure ATS compatibility.
          </Typography>
        </Box>
        <TextField
          label="Section Heading"
          value={customSection.heading}
          onChange={(e) => setCustomSection({ ...customSection, heading: e.target.value })}
          fullWidth
          margin="dense"
          variant="outlined"
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px',
              '&:hover fieldset': { borderColor: '#10b981' },
              '&.Mui-focused fieldset': { borderColor: '#10b981' },
            },
            '& .MuiInputLabel-root': { color: '#616161' },
            '& .MuiInputLabel-root.Mui-focused': { color: '#10b981' },
          }}
          inputProps={{ maxLength: 50 }} // Limit to prevent overly long headings
        />
        <TextareaAutosize
          minRows={4}
          maxRows={10}
          placeholder="Enter section details (e.g., project descriptions, achievements)"
          value={customSection.description}
          onChange={(e) => setCustomSection({ ...customSection, description: e.target.value })}
          style={{
            width: '100%',
            marginTop: '16px',
            padding: '12px',
            fontFamily: fontStyle,
            fontSize: `${fontSize}px`,
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            resize: 'vertical',
            '&:focus': {
              borderColor: '#10b981',
              outline: 'none',
              boxShadow: '0 0 0 3px rgba(16, 185, 129, 0.2)',
            },
          }}
          className="focus:border-[#10b981] focus:ring focus:ring-[#10b981] focus:ring-opacity-50"
        />
      </DialogContent>
      <DialogActions sx={{ p: 3, pt: 0 }}>
        {editIndex !== null && (
          <Button
            onClick={() => {
              handleDelete(editIndex);
              onClose();
            }}
            sx={{
              color: '#dc2626',
              '&:hover': { bgcolor: '#fee2e2' },
              textTransform: 'none',
              borderRadius: '8px',
            }}
            component={motion.div}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            Delete
          </Button>
        )}
        <Button
          onClick={onClose}
          sx={{
            color: '#616161',
            '&:hover': { bgcolor: '#f4f7fa' },
            textTransform: 'none',
            borderRadius: '8px',
          }}
          component={motion.div}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          disabled={isSaveDisabled}
          variant="contained"
          sx={{
            bgcolor: '#10b981',
            '&:hover': { bgcolor: '#059669' },
            '&:disabled': { bgcolor: '#d1d5db', color: '#9ca3af' },
            textTransform: 'none',
            borderRadius: '8px',
            px: 3,
          }}
          component={motion.div}
          whileHover={{ scale: isSaveDisabled ? 1 : 1.05 }}
          transition={{ duration: 0.2 }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CustomSectionDialog;
import { Box, Typography, IconButton, Collapse } from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';

function SectionWrapper({ title, isOpen, toggleSection, children }) {
  return (
    <Box sx={{ mb: 2, border: '1px solid #e0e0e0', borderRadius: '4px', bgcolor: '#fff' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 1,
          cursor: 'pointer',
          bgcolor: isOpen ? '#f5f5f5' : '#e3f2fd',
          '&:hover': { bgcolor: isOpen ? '#e0e0e0' : '#bbdefb' },
        }}
        onClick={toggleSection}
      >
        <Typography variant="h6">{title}</Typography>
        <IconButton size="small">
          {isOpen ? <ExpandLess /> : <ExpandMore />}
        </IconButton>
      </Box>
      <Collapse in={isOpen}>
        <Box sx={{ p: 2 }}>{children}</Box>
      </Collapse>
    </Box>
  );
}

export default SectionWrapper;
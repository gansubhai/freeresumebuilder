import { Box, TextField, IconButton, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

function CustomSection({
  section,
  customSection, // Support legacy prop
  updateSection,
  addItem,
  deleteItem,
  deleteSection,
  color,
  fontStyle,
  fontSize,
  headingSize,
  sectionSpacing,
  paragraphSpacing,
  lineSpacing,
  sideMargin,
  paragraphIndent,
}) {
  // Normalize section data
  const sectionData = section || customSection;
  if (!sectionData || typeof sectionData !== 'object') {
    console.warn('CustomSection received invalid section:', sectionData);
    return (
      <Box sx={{ padding: 2, color: 'error.main' }}>
        <Typography>Error: Invalid section data</Typography>
      </Box>
    );
  }

  const validSection = {
    title: sectionData.title || sectionData.heading || 'Untitled Section',
    items: Array.isArray(sectionData.items) ? sectionData.items : [],
  };

  const handleSectionChange = (field) => (event) => {
    updateSection({ ...validSection, [field]: event.target.value });
  };

  const handleItemChange = (index, field) => (event) => {
    const newItems = [...validSection.items];
    newItems[index] = { ...newItems[index], [field]: event.target.value };
    updateSection({ ...validSection, items: newItems });
  };

  const items = validSection.items;

  return (
    <Box
      sx={{
        fontFamily: fontStyle,
        fontSize: `${fontSize}px`,
        lineHeight: lineSpacing,
        marginLeft: `${sideMargin}px`,
        marginRight: `${sideMargin}px`,
        textIndent: `${paragraphIndent}px`,
        display: 'flex',
        flexDirection: 'column',
        gap: `${paragraphSpacing}px`,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <TextField
          label="Section Title"
          value={validSection.title}
          onChange={handleSectionChange('title')}
          fullWidth
          size="small"
          aria-label="Custom section title"
        />
        <IconButton onClick={deleteSection} aria-label="Delete section">
          <DeleteIcon />
        </IconButton>
      </Box>
      {items.length === 0 && (
        <Typography sx={{ color: 'text.secondary' }}>
          No items. Click the plus icon to add an item.
        </Typography>
      )}
      {items.map((item, index) => (
        <Box key={index} sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <TextField
              label="Item Title"
              value={item.title || ''}
              onChange={handleItemChange(index, 'title')}
              fullWidth
              size="small"
              aria-label={`Item ${index + 1} title`}
            />
            <IconButton
              onClick={() => deleteItem(index)}
              aria-label={`Delete item ${index + 1}`}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
          <TextField
            label="Description"
            value={item.description || ''}
            onChange={handleItemChange(index, 'description')}
            fullWidth
            multiline
            rows={3}
            size="small"
            aria-label={`Item ${index + 1} description`}
          />
        </Box>
      ))}
      <Box>
        <IconButton onClick={addItem} aria-label="Add item">
          <AddIcon />
        </IconButton>
      </Box>
    </Box>
  );
}

export default CustomSection;
import { Box, Typography, Button, TextField } from '@mui/material';
import RichTextEditor from './RichTextEditor'; // Adjust path if needed

function CustomSection({
  section,
  customSection,
  updateSection,
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
  console.log('CustomSection props:', { section, customSection });

  const defaultSlateValue = JSON.stringify([
    { type: 'paragraph', children: [{ text: '' }] },
  ]);

  const sectionData = section || customSection;
  const validSection = {
    heading: sectionData?.heading || sectionData?.title || 'Untitled Section',
    description: sectionData?.description || defaultSlateValue,
  };

  if (!sectionData) {
    console.warn('CustomSection: Invalid section data');
    return <Box>Invalid section data</Box>;
  }

  const handleHeadingChange = (e) => {
    updateSection({ ...validSection, heading: e.target.value });
  };

  const handleDescriptionChange = (value) => {
    updateSection({ ...validSection, description: JSON.stringify(value) });
  };

  let slateValue;
  try {
    slateValue = JSON.parse(validSection.description);
  } catch (e) {
    console.warn('Invalid Slate JSON in description, using default:', e);
    slateValue = JSON.parse(defaultSlateValue);
  }

  return (
    <Box sx={{ mt: sectionSpacing / 96, fontFamily: fontStyle }}>
      <TextField
        label="Section Heading"
        value={validSection.heading}
        onChange={handleHeadingChange}
        sx={{ mb: paragraphSpacing / 96, fontSize, lineHeight: lineSpacing }}
        fullWidth
      />
      <Box sx={{ mb: paragraphSpacing / 96 }}>
        <Typography
          variant="body2"
          sx={{ fontSize, mb: paragraphSpacing / 96, color: 'text.secondary' }}
        >
          Description
        </Typography>
        <RichTextEditor
          value={slateValue}
          onChange={handleDescriptionChange}
          fontStyle={fontStyle}
          fontSize={fontSize}
          lineSpacing={lineSpacing}
        />
      </Box>
      <Button
        onClick={deleteSection}
        sx={{ color, fontSize, mt: paragraphSpacing / 96 }}
      >
        Delete Section
      </Button>
    </Box>
  );
}

export default CustomSection;
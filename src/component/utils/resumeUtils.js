import { Box, Typography } from '@mui/material';

export const renderProficiencyBars = (proficiency) => {
  const filled = proficiency === 'Excellent' ? 3 : proficiency === 'Good' ? 2 : 1;
  return (
    <Box sx={{ display: 'flex', gap: 0.5 }}>
      {[...Array(3)].map((_, i) => (
        <Box
          key={i}
          sx={{
            width: 12,
            height: 4,
            bgcolor: i < filled ? '#fff' : '#ccc',
          }}
        />
      ))}
    </Box>
  );
};

export const renderCustomSections = (
  customSections,
  fontStyle,
  fontSize,
  headingSize,
  sectionSpacing,
  paragraphIndent,
  lineSpacing
) => {
  const mmToPx = (mm) => mm * 3.78;
  return customSections.map((section, index) => (
    <Box key={index} sx={{ mt: mmToPx(sectionSpacing) / 96 }}>
      <Typography variant="h6" sx={{ fontSize: headingSize, mb: mmToPx(sectionSpacing) / 96 }}>
        {section.heading}
      </Typography>
      <Typography
        variant="body2"
        sx={{
          fontFamily: fontStyle,
          fontSize,
          lineHeight: lineSpacing,
          pl: mmToPx(paragraphIndent) / 96,
        }}
      >
        {section.description}
      </Typography>
    </Box>
  ));
};
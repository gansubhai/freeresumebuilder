import { Box, Typography, Select, MenuItem, InputLabel, FormControl, Tabs, Tab, Slider, TextField } from '@mui/material';
import { useState } from 'react';

function Sidebar({
  templates,
  selectedTemplate,
  setSelectedTemplate,
  color,
  setColor,
  fontStyle,
  setFontStyle,
  fontSize,
  setFontSize,
  headingSize,
  setHeadingSize,
  sectionSpacing,
  setSectionSpacing,
  paragraphSpacing,
  setParagraphSpacing,
  lineSpacing,
  setLineSpacing,
  sideMargin,
  setSideMargin,
  paragraphIndent,
  setParagraphIndent,
}) {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ width: '25%', p: 2, borderRight: '1px solid #e0e0e0', overflowY: 'auto' }}>
      <Typography variant="h6" gutterBottom>
        Customize Resume
      </Typography>
      <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 2 }}>
        <Tab label="Design" />
        <Tab label="Formatting" />
      </Tabs>

      {tabValue === 0 && (
        <Box>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Template</InputLabel>
            <Select
              value={selectedTemplate}
              onChange={(e) => setSelectedTemplate(e.target.value)}
              label="Template"
            >
              {templates.map((template) => (
                <MenuItem key={template.id} value={template.id}>
                  {template.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Typography gutterBottom>Color</Typography>
          <TextField
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />
        </Box>
      )}

      {tabValue === 1 && (
        <Box>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Font Style</InputLabel>
            <Select
              value={fontStyle}
              onChange={(e) => setFontStyle(e.target.value)}
              label="Font Style"
            >
              <MenuItem value="Arial">Arial</MenuItem>
              <MenuItem value="Times New Roman">Times New Roman</MenuItem>
            </Select>
          </FormControl>
          <Typography gutterBottom>Font Size ({fontSize}px)</Typography>
          <Slider
            value={fontSize}
            onChange={(e, value) => setFontSize(value)}
            min={8}
            max={14}
            step={1}
            valueLabelDisplay="auto"
            sx={{ mb: 2 }}
          />
          <Typography gutterBottom>Heading Size ({headingSize}px)</Typography>
          <Slider
            value={headingSize}
            onChange={(e, value) => setHeadingSize(value)}
            min={8}
            max={24}
            step={1}
            valueLabelDisplay="auto"
            sx={{ mb: 2 }}
          />
          <Typography gutterBottom>Document Formatting</Typography>
          <Typography variant="body2" gutterBottom>Section Spacing ({sectionSpacing}mm)</Typography>
          <Slider
            value={sectionSpacing}
            onChange={(e, value) => setSectionSpacing(value)}
            min={2}
            max={10}
            step={1}
            valueLabelDisplay="auto"
            sx={{ mb: 2 }}
          />
          <Typography variant="body2" gutterBottom>Paragraph Spacing ({paragraphSpacing}mm)</Typography>
          <Slider
            value={paragraphSpacing}
            onChange={(e, value) => setParagraphSpacing(value)}
            min={1}
            max={5}
            step={0.5}
            valueLabelDisplay="auto"
            sx={{ mb: 2 }}
          />
          <Typography variant="body2" gutterBottom>Line Spacing ({lineSpacing})</Typography>
          <Slider
            value={lineSpacing}
            onChange={(e, value) => setLineSpacing(value)}
            min={1.0}
            max={2.0}
            step={0.05}
            valueLabelDisplay="auto"
            sx={{ mb: 2 }}
          />
          <Typography variant="body2" gutterBottom>Side Margin ({sideMargin}mm)</Typography>
          <Slider
            value={sideMargin}
            onChange={(e, value) => setSideMargin(value)}
            min={5}
            max={20}
            step={1}
            valueLabelDisplay="auto"
            sx={{ mb: 2 }}
          />
          <Typography variant="body2" gutterBottom>Paragraph Indent ({paragraphIndent}mm)</Typography>
          <Slider
            value={paragraphIndent}
            onChange={(e, value) => setParagraphIndent(value)}
            min={0}
            max={10}
            step={1}
            valueLabelDisplay="auto"
            sx={{ mb: 2 }}
          />
        </Box>
      )}
    </Box>
  );
}

export default Sidebar;
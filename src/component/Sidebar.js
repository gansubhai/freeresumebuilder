import {
  Box,
  Tabs,
  Tab,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Button,
} from '@mui/material';
import { Palette, TextFormat } from '@mui/icons-material';
import { CirclePicker } from 'react-color';
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
  isOpen,
  setIsOpen,
}) {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const fontStyles = ['Arial', 'Times New Roman', 'Helvetica'];

  return (
    <Box
      sx={{
        width: isOpen ? '25%' : '50px',
        maxHeight: 'calc(100vh - 64px)', // Cap height to avoid overflow
        borderRight: '1px solid #e0e0e0',
        transition: 'width 0.3s ease',
        overflowY: isOpen ? 'hidden' : 'hidden', // Disable outer scrollbar
        bgcolor: isOpen ? '#fff' : '#f5f5f5',
        display: 'flex',
        alignItems: 'center',
        justifyContent: isOpen ? 'flex-start' : 'center',
      }}
    >
      {isOpen ? (
        <Box
          sx={{
            p: 1, // Reduced padding
            width: '100%',
            overflowY: 'auto', // Scroll content if needed
            height: 'calc(100vh - 64px)', // Match maxHeight
          }}
        >
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            centered
            sx={{
              minHeight: '48px', // Consistent height
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 400,
                color: '#616161',
                minHeight: '48px',
                '&.Mui-selected': {
                  color: '#1976d2',
                  fontWeight: 600,
                  bgcolor: '#e3f2fd',
                  borderRadius: '4px',
                },
              },
              '& .MuiTabs-indicator': {
                backgroundColor: '#1976d2',
              },
            }}
          >
            <Tab
              icon={<Palette />}
              iconPosition="start"
              label="Design"
              sx={{ minHeight: '48px' }}
            />
            <Tab
              icon={<TextFormat />}
              iconPosition="start"
              label="Formatting"
              sx={{ minHeight: '48px' }}
            />
          </Tabs>
          {tabValue === 0 && (
            <Box sx={{ mt: 1 }}>
              <Typography variant="subtitle1" gutterBottom>
                Templates
              </Typography>
              <FormControl fullWidth sx={{ mb: 1 }}>
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
              <Typography variant="subtitle1" gutterBottom>
                Color
              </Typography>
              <CirclePicker
                color={color}
                onChangeComplete={(color) => setColor(color.hex)}
                width="100%"
              />
            </Box>
          )}
          {tabValue === 1 && (
            <Box sx={{ mt: 1 }}>
              <Typography variant="subtitle1" gutterBottom>
                Formatting
              </Typography>
              <FormControl fullWidth sx={{ mb: 1 }}>
                <InputLabel>Font Style</InputLabel>
                <Select
                  value={fontStyle}
                  onChange={(e) => setFontStyle(e.target.value)}
                  label="Font Style"
                >
                  {fontStyles.map((style) => (
                    <MenuItem key={style} value={style}>
                      {style}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Box sx={{ mb: 1 }}>
                <Typography variant="body2">Font Size: {fontSize}</Typography>
                <Slider
                  value={fontSize}
                  onChange={(e, value) => setFontSize(value)}
                  min={8}
                  max={16}
                  step={1}
                  valueLabelDisplay="auto"
                  size="small"
                />
              </Box>
              <Box sx={{ mb: 1 }}>
                <Typography variant="body2">Heading Size: {headingSize}</Typography>
                <Slider
                  value={headingSize}
                  onChange={(e, value) => setHeadingSize(value)}
                  min={12}
                  max={24}
                  step={1}
                  valueLabelDisplay="auto"
                  size="small"
                />
              </Box>
              <Box sx={{ mb: 1 }}>
                <Typography variant="body2">Section Spacing: {sectionSpacing} mm</Typography>
                <Slider
                  value={sectionSpacing}
                  onChange={(e, value) => setSectionSpacing(value)}
                  min={2}
                  max={12}
                  step={1}
                  valueLabelDisplay="auto"
                  size="small"
                />
              </Box>
              <Box sx={{ mb: 1 }}>
                <Typography variant="body2">Paragraph Spacing: {paragraphSpacing} mm</Typography>
                <Slider
                  value={paragraphSpacing}
                  onChange={(e, value) => setParagraphSpacing(value)}
                  min={0}
                  max={6}
                  step={1}
                  valueLabelDisplay="auto"
                  size="small"
                />
              </Box>
              <Box sx={{ mb: 1 }}>
                <Typography variant="body2">Line Spacing: {lineSpacing}</Typography>
                <Slider
                  value={lineSpacing}
                  onChange={(e, value) => setLineSpacing(value)}
                  min={1}
                  max={2}
                  step={0.05}
                  valueLabelDisplay="auto"
                  size="small"
                />
              </Box>
              <Box sx={{ mb: 1 }}>
                <Typography variant="body2">Side Margin: {sideMargin} mm</Typography>
                <Slider
                  value={sideMargin}
                  onChange={(e, value) => setSideMargin(value)}
                  min={5}
                  max={20}
                  step={1}
                  valueLabelDisplay="auto"
                  size="small"
                />
              </Box>
              <Box sx={{ mb: 1 }}>
                <Typography variant="body2">Paragraph Indent: {paragraphIndent} mm</Typography>
                <Slider
                  value={paragraphIndent}
                  onChange={(e, value) => setParagraphIndent(value)}
                  min={0}
                  max={10}
                  step={1}
                  valueLabelDisplay="auto"
                  size="small"
                />
              </Box>
            </Box>
          )}
          <Button
            variant="outlined"
            onClick={() => setIsOpen(false)}
            sx={{ mt: 1, mb: 1, width: '100%' }}
          >
            Close Sidebar
          </Button>
        </Box>
      ) : (
        <Box
          onClick={() => setIsOpen(true)}
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            bgcolor: '#f5f5f5',
            '&:hover': { bgcolor: '#e0e0e0' },
          }}
        >
          <Typography
            variant="h6"
            sx={{
              transform: 'rotate(-90deg)',
              whiteSpace: 'nowrap',
              color: '#1976d2',
              fontWeight: 'bold',
            }}
          >
            Style your resume
          </Typography>
        </Box>
      )}
    </Box>
  );
}

export default Sidebar;
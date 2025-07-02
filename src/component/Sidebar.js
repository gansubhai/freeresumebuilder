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
  IconButton,
} from '@mui/material';
import { Palette, TextFormat } from '@mui/icons-material';
import { CirclePicker } from 'react-color';
import { useState } from 'react';
import { motion } from 'framer-motion';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

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

  const fontStyles = ['Arial', 'Times New Roman', 'Helvetica', 'Georgia', 'Roboto'];

  // Animation variants for sidebar content
  const contentVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  };

  return (
    <Box
      sx={{
        width: isOpen ? { xs: '80%', sm: '50%', md: '25%' } : '50px',
        maxHeight: 'calc(100vh - 64px)',
        borderRight: '1px solid #e0e0e0',
        transition: 'width 0.3s ease',
        bgcolor: isOpen ? '#ffffff' : '#f4f7fa',
        display: 'flex',
        alignItems: 'center',
        justifyContent: isOpen ? 'flex-start' : 'center',
        position: { xs: 'fixed', md: 'relative' },
        top: { xs: '64px', md: 0 },
        zIndex: 1200,
        boxShadow: isOpen ? '2px 0 8px rgba(0,0,0,0.1)' : 'none',
      }}
    >
      {isOpen ? (
        <Box
          sx={{
            p: 2,
            width: '100%',
            overflowY: 'auto',
            height: 'calc(100vh - 64px)',
            bgcolor: '#ffffff',
          }}
          component={motion.div}
          initial="hidden"
          animate="visible"
          variants={contentVariants}
        >
          {/* Header with Close Button */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1e3a8a' }}>
              Customize Your Resume
            </Typography>
            <IconButton onClick={() => setIsOpen(false)} sx={{ color: '#1e3a8a' }}>
              <ChevronLeftIcon />
            </IconButton>
          </Box>

          {/* Tabs */}
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            centered
            sx={{
              mb: 2,
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 500,
                color: '#616161',
                borderRadius: '8px',
                '&.Mui-selected': {
                  color: '#10b981',
                  bgcolor: '#e6fff9',
                  fontWeight: 600,
                },
              },
              '& .MuiTabs-indicator': {
                backgroundColor: '#10b981',
              },
            }}
          >
            <Tab
              icon={<Palette />}
              iconPosition="start"
              label="Design"
              sx={{ minWidth: '100px' }}
            />
            <Tab
              icon={<TextFormat />}
              iconPosition="start"
              label="Formatting"
              sx={{ minWidth: '100px' }}
            />
          </Tabs>

          {/* Design Tab */}
          {tabValue === 0 && (
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 'medium', mb: 1, color: '#1e3a8a' }}>
                Resume Template
              </Typography>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel sx={{ color: '#616161' }}>Template</InputLabel>
                <Select
                  value={selectedTemplate}
                  onChange={(e) => setSelectedTemplate(e.target.value)}
                  label="Template"
                  sx={{
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: '#e0e0e0' },
                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#10b981' },
                  }}
                >
                  {templates.map((template) => (
                    <MenuItem key={template.id} value={template.id}>
                      {template.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Typography variant="subtitle1" sx={{ fontWeight: 'medium', mb: 1, color: '#1e3a8a' }}>
                Accent Color
              </Typography>
              <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                <CirclePicker
                  color={color}
                  onChangeComplete={(color) => setColor(color.hex)}
                  width="100%"
                  circleSize={24}
                  circleSpacing={10}
                  className="justify-center"
                />
              </motion.div>
            </Box>
          )}

          {/* Formatting Tab */}
          {tabValue === 1 && (
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 'medium', mb: 1, color: '#1e3a8a' }}>
                Text Formatting
              </Typography>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel sx={{ color: '#616161' }}>Font Style</InputLabel>
                <Select
                  value={fontStyle}
                  onChange={(e) => setFontStyle(e.target.value)}
                  label="Font Style"
                  sx={{
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: '#e0e0e0' },
                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#10b981' },
                  }}
                >
                  {fontStyles.map((style) => (
                    <MenuItem key={style} value={style}>
                      {style}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ color: '#616161' }}>
                  Font Size: {fontSize}pt
                </Typography>
                <Slider
                  value={fontSize}
                  onChange={(e, value) => setFontSize(value)}
                  min={8}
                  max={16}
                  step={1}
                  valueLabelDisplay="auto"
                  size="small"
                  sx={{ color: '#10b981' }}
                />
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ color: '#616161' }}>
                  Heading Size: {headingSize}pt
                </Typography>
                <Slider
                  value={headingSize}
                  onChange={(e, value) => setHeadingSize(value)}
                  min={12}
                  max={24}
                  step={1}
                  valueLabelDisplay="auto"
                  size="small"
                  sx={{ color: '#10b981' }}
                />
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ color: '#616161' }}>
                  Section Spacing: {sectionSpacing}mm
                </Typography>
                <Slider
                  value={sectionSpacing}
                  onChange={(e, value) => setSectionSpacing(value)}
                  min={2}
                  max={12}
                  step={1}
                  valueLabelDisplay="auto"
                  size="small"
                  sx={{ color: '#10b981' }}
                />
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ color: '#616161' }}>
                  Paragraph Spacing: {paragraphSpacing}mm
                </Typography>
                <Slider
                  value={paragraphSpacing}
                  onChange={(e, value) => setParagraphSpacing(value)}
                  min={0}
                  max={6}
                  step={1}
                  valueLabelDisplay="auto"
                  size="small"
                  sx={{ color: '#10b981' }}
                />
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ color: '#616161' }}>
                  Line Spacing: {lineSpacing}x
                </Typography>
                <Slider
                  value={lineSpacing}
                  onChange={(e, value) => setLineSpacing(value)}
                  min={1}
                  max={2}
                  step={0.05}
                  valueLabelDisplay="auto"
                  size="small"
                  sx={{ color: '#10b981' }}
                />
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ color: '#616161' }}>
                  Side Margin: {sideMargin}mm
                </Typography>
                <Slider
                  value={sideMargin}
                  onChange={(e, value) => setSideMargin(value)}
                  min={5}
                  max={20}
                  step={1}
                  valueLabelDisplay="auto"
                  size="small"
                  sx={{ color: '#10b981' }}
                />
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ color: '#616161' }}>
                  Paragraph Indent: {paragraphIndent}mm
                </Typography>
                <Slider
                  value={paragraphIndent}
                  onChange={(e, value) => setParagraphIndent(value)}
                  min={0}
                  max={10}
                  step={1}
                  valueLabelDisplay="auto"
                  size="small"
                  sx={{ color: '#10b981' }}
                />
              </Box>
            </Box>
          )}

          {/* Close Button */}
          <Button
            variant="contained"
            onClick={() => setIsOpen(false)}
            sx={{
              width: '100%',
              bgcolor: '#1e3a8a',
              '&:hover': { bgcolor: '#1e40af' },
              mt: 2,
            }}
            component={motion.div}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
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
            bgcolor: '#f4f7fa',
            '&:hover': { bgcolor: '#e5e7eb' },
          }}
          component={motion.div}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <Typography
            variant="h6"
            sx={{
              transform: 'rotate(-90deg)',
              whiteSpace: 'nowrap',
              color: '#1e3a8a',
              fontWeight: 'bold',
            }}
          >
            Style Your Resume
            <ChevronRightIcon sx={{ ml: 1, verticalAlign: 'middle' }} />
          </Typography>
        </Box>
      )}
    </Box>
  );
}

export default Sidebar;
import {
  Box,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from '@mui/material';
import { FileDownload, Print, Email, Delete, ChevronRight } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useState } from 'react';

function RightSidebar({
  color,
  resumeData,
  setResumeData: _setResumeData, // Unused but kept for consistency
  generatePDF,
  handlePrint,
  handleEmail,
  handleOpenDialog,
  handleDeleteSection,
  selectedTemplate,
  fontStyle,
  fontSize,
  headingSize,
  sectionSpacing,
  paragraphSpacing,
  lineSpacing,
  sideMargin,
  paragraphIndent,
  isOpen,
  setIsOpen,
}) {
  const defaultSections = [
    'Heading',
    'Summary',
    'Skills',
    'Experience',
    'Education',
    'Hobbies and Interests',
    'Languages',
    'Personal Information',
    'Certifications',
    'Accomplishments',
  ];

  // Animation variants for sidebar content
  const contentVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  };

  return (
    <Box
      sx={{
        width: isOpen ? { xs: '80%', sm: '50%', md: '25%' } : '50px',
        maxHeight: 'calc(100vh - 64px)',
        borderLeft: '1px solid #e0e0e0',
        transition: 'width 0.3s ease',
        bgcolor: isOpen ? '#ffffff' : '#f4f7fa',
        position: { xs: 'fixed', md: 'relative' },
        top: { xs: '64px', md: 0 },
        right: 0,
        zIndex: 1200,
        boxShadow: isOpen ? '-2px 0 8px rgba(0,0,0,0.1)' : 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: isOpen ? 'flex-start' : 'center',
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
              Resume Actions
            </Typography>
            <IconButton onClick={() => setIsOpen(false)} sx={{ color: '#1e3a8a' }}>
              <ChevronRight />
            </IconButton>
          </Box>

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 3 }}>
            <Button
              variant="contained"
              startIcon={<FileDownload />}
              onClick={() =>
                generatePDF(
                  resumeData,
                  color,
                  selectedTemplate,
                  fontStyle,
                  fontSize,
                  headingSize,
                  sectionSpacing,
                  paragraphSpacing,
                  lineSpacing,
                  sideMargin,
                  paragraphIndent
                )
              }
              sx={{
                bgcolor: '#10b981',
                '&:hover': { bgcolor: '#059669' },
                borderRadius: '8px',
                textTransform: 'none',
                py: 1.5,
              }}
              component={motion.div}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              Download PDF
            </Button>
            <Button
              variant="contained"
              startIcon={<Print />}
              onClick={handlePrint}
              sx={{
                bgcolor: '#1e3a8a',
                '&:hover': { bgcolor: '#1e40af' },
                borderRadius: '8px',
                textTransform: 'none',
                py: 1.5,
              }}
              component={motion.div}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              Print Resume
            </Button>
            <Button
              variant="contained"
              startIcon={<Email />}
              onClick={handleEmail}
              sx={{
                bgcolor: '#1e3a8a',
                '&:hover': { bgcolor: '#1e40af' },
                borderRadius: '8px',
                textTransform: 'none',
                py: 1.5,
              }}
              component={motion.div}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              Email Resume
            </Button>
          </Box>

          {/* Resume Sections */}
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1e3a8a', mb: 2 }}>
            Resume Sections
          </Typography>
          <List>
            {defaultSections.map((section, index) => (
              <ListItem
                key={index}
                sx={{
                  py: 1,
                  '&:hover': { bgcolor: '#e6fff9' },
                }}
                component={motion.div}
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <ListItemText
                  primary={
                    <Typography variant="body2" sx={{ color: '#616161' }}>
                      {`${index + 1}. ${section}`}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
            {resumeData.customSections.map((section, index) => (
              <ListItem
                key={index + defaultSections.length}
                sx={{
                  py: 1,
                  '&:hover': { bgcolor: '#e6fff9' },
                }}
                component={motion.div}
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
                secondaryAction={
                  <IconButton
                    edge="end"
                    onClick={() => handleDeleteSection(index)}
                    sx={{ color: '#dc2626', '&:hover': { color: '#b91c1c' } }}
                  >
                    <Delete />
                  </IconButton>
                }
              >
                <ListItemText
                  primary={
                    <Typography variant="body2" sx={{ color: '#616161' }}>
                      {`${index + defaultSections.length + 1}. ${section.heading}`}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>

          {/* Add Section Button */}
          <Button
            variant="contained"
            onClick={() => handleOpenDialog()}
            sx={{
              width: '100%',
              bgcolor: '#10b981',
              '&:hover': { bgcolor: '#059669' },
              borderRadius: '8px',
              textTransform: 'none',
              mt: 2,
              py: 1.5,
            }}
            component={motion.div}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            Add Custom Section
          </Button>

          {/* Close Button */}
          <Button
            variant="outlined"
            onClick={() => setIsOpen(false)}
            sx={{
              width: '100%',
              borderColor: '#1e3a8a',
              color: '#1e3a8a',
              '&:hover': { borderColor: '#1e40af', color: '#1e40af' },
              borderRadius: '8px',
              textTransform: 'none',
              mt: 2,
              py: 1.5,
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
            Resume Actions
            <ChevronRight sx={{ ml: 1, verticalAlign: 'middle' }} />
          </Typography>
        </Box>
      )}
    </Box>
  );
}

export default RightSidebar;
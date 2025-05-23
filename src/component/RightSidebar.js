import {
    Box,
    Button,
    Typography,
    List,
    ListItem,
    ListItemText,
    IconButton,
  } from '@mui/material';
  import { FileDownload, Print, Email, Delete } from '@mui/icons-material';
  
  function RightSidebar({
    color,
    resumeData,
    setResumeData: _setResumeData, // Unused but passed for consistency
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
  
    return (
      <Box
        sx={{
          width: '25%',
          p: 2,
          borderLeft: '1px solid #e0e0e0',
          position: 'sticky',
          top: 0,
          alignSelf: 'flex-start',
          maxHeight: 'calc(100vh - 64px - 32px)',
          overflowY: 'auto',
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2 }}>
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
            sx={{ backgroundColor: color, '&:hover': { backgroundColor: `${color}cc` } }}
          >
            Download
          </Button>
          <Button
            variant="contained"
            startIcon={<Print />}
            onClick={handlePrint}
            sx={{ backgroundColor: color, '&:hover': { backgroundColor: `${color}cc` } }}
          >
            Print
          </Button>
          <Button
            variant="contained"
            startIcon={<Email />}
            onClick={handleEmail}
            sx={{ backgroundColor: color, '&:hover': { backgroundColor: `${color}cc` } }}
          >
            Email
          </Button>
        </Box>
        <Typography variant="h6" gutterBottom>
          Resume Sections
        </Typography>
        <List>
          {defaultSections.map((section, index) => (
            <ListItem key={index} disablePadding>
              <ListItemText primary={`${index + 1}. ${section}`} />
            </ListItem>
          ))}
          {resumeData.customSections.map((section, index) => (
            <ListItem
              key={index + defaultSections.length}
              disablePadding
              secondaryAction={
                <IconButton edge="end" onClick={() => handleDeleteSection(index)}>
                  <Delete />
                </IconButton>
              }
            >
              <ListItemText primary={`${index + defaultSections.length + 1}. ${section.heading}`} />
            </ListItem>
          ))}
        </List>
        <Button
          variant="outlined"
          onClick={() => handleOpenDialog()}
          sx={{ mt: 2, borderColor: color, color, width: '100%' }}
        >
          Add Section
        </Button>
      </Box>
    );
  }
  
  export default RightSidebar;
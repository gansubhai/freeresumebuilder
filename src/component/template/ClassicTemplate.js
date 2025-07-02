import { Box, Typography, Paper, Divider, List, ListItem } from '@mui/material';
import { motion } from 'framer-motion';
import SectionWrapper from '../edit/SectionWrapper';
import CreateResumeForm from '../createResumeForm/CreateResumeForm';

// Animation variants for sections
const sectionVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

function ClassicTemplate({
  resumeData,
  setResumeData,
  color,
  fontStyle,
  fontSize,
  headingSize,
  sectionSpacing,
  paragraphSpacing,
  lineSpacing,
  sideMargin,
  paragraphIndent,
  sectionStates,
  toggleSection,
  handleExpandAll,
  handleCollapseAll,
}) {
  const mmToPx = (mm) => mm * 3.78;

  // Safely access resumeData fields with fallbacks
  const safeResumeData = {
    heading: resumeData?.heading || {},
    summary: resumeData?.summary || JSON.stringify([{ type: 'paragraph', children: [{ text: '' }] }]),
    skills: resumeData?.skills || [],
    experiences: resumeData?.experiences || [],
    educations: resumeData?.educations || [],
    hobbies: resumeData?.hobbies || [],
    languages: resumeData?.languages || [],
    personalInfo: resumeData?.personalInfo || {},
    certifications: resumeData?.certifications || [],
    accomplishments: resumeData?.accomplishments || [],
    customSections: resumeData?.customSections || [],
  };

  // Return loading state if resumeData is not ready
  if (!resumeData) {
    return (
      <Box sx={{ width: '100%', p: 4, textAlign: 'center' }}>
        <Typography sx={{ color: '#1e3a8a' }}>Loading resume data...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', p: { xs: 2, md: 4 }, overflowY: 'auto' }}>
      <Paper
        elevation={3}
        sx={{
          border: `2px solid ${color}`,
          p: 3,
          fontFamily: fontStyle,
          mx: { xs: 0, md: mmToPx(sideMargin) / 96 },
          bgcolor: '#ffffff',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        }}
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        aria-label="Resume preview"
      >
        <CreateResumeForm
          resumeData={resumeData}
          setResumeData={setResumeData}
          color={color}
          fontStyle={fontStyle}
          fontSize={fontSize}
          headingSize={headingSize}
          sectionSpacing={sectionSpacing}
          paragraphSpacing={paragraphSpacing}
          lineSpacing={lineSpacing}
          sideMargin={sideMargin}
          paragraphIndent={paragraphIndent}
          sectionStates={sectionStates}
          toggleSection={toggleSection}
          handleExpandAll={handleExpandAll}
          handleCollapseAll={handleCollapseAll}
        />
        <SectionWrapper
          title="Preview (Classic Template)"
          isOpen={sectionStates.preview}
          toggleSection={() => toggleSection('preview')}
        >
          <Box sx={{ mt: mmToPx(sectionSpacing) / 96, fontFamily: fontStyle }}>
            {/* Header */}
            <Box
              sx={{ textAlign: 'center', mb: mmToPx(paragraphSpacing) / 96 }}
              component={motion.div}
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
            >
              <Typography
                variant="h4"
                sx={{
                  fontSize: headingSize + 8,
                  fontWeight: 'bold',
                  color: '#1e3a8a',
                  mb: mmToPx(paragraphSpacing) / 96 / 2,
                }}
              >
                {safeResumeData.heading.firstName || ''} {safeResumeData.heading.lastName || ''}
              </Typography>
              <Typography
                sx={{
                  fontSize: fontSize - 2,
                  lineHeight: lineSpacing,
                  mb: mmToPx(paragraphSpacing) / 96 / 4,
                  color: '#616161',
                }}
              >
                {safeResumeData.heading.city || ''}, {safeResumeData.heading.country || ''}{' '}
                {safeResumeData.heading.pincode || ''}
              </Typography>
              <Typography
                sx={{
                  fontSize: fontSize - 2,
                  lineHeight: lineSpacing,
                  mb: mmToPx(paragraphSpacing) / 96 / 4,
                  color: '#616161',
                }}
              >
                {safeResumeData.heading.phone || ''}
              </Typography>
              <Typography
                sx={{
                  fontSize: fontSize - 2,
                  lineHeight: lineSpacing,
                  color: '#616161',
                }}
              >
                <a
                  href={`mailto:${safeResumeData.heading.email || ''}`}
                  style={{ color: '#10b981', textDecoration: 'none' }}
                >
                  {safeResumeData.heading.email || ''}
                </a>
              </Typography>
              {safeResumeData.heading.linkedin && (
                <Typography
                  sx={{
                    fontSize: fontSize - 2,
                    lineHeight: lineSpacing,
                    color: '#616161',
                  }}
                >
                  <a
                    href={safeResumeData.heading.linkedin}
                    style={{ color: '#10b981', textDecoration: 'none' }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {safeResumeData.heading.linkedin}
                  </a>
                </Typography>
              )}
            </Box>
            <Divider sx={{ my: mmToPx(sectionSpacing) / 96, borderColor: color }} />

            {/* Professional Summary */}
            {safeResumeData.summary && (
              <Box
                sx={{ mt: mmToPx(sectionSpacing) / 96 }}
                component={motion.div}
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: headingSize + 2,
                    color,
                    fontWeight: 'bold',
                    mb: mmToPx(paragraphSpacing) / 96 / 2,
                  }}
                >
                  Professional Summary
                </Typography>
                <Box
                  sx={{
                    ml: { xs: 0, md: '17%' },
                    width: { xs: '100%', md: '83%' },
                    pl: mmToPx(paragraphIndent) / 96,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize,
                      lineHeight: lineSpacing,
                      mb: mmToPx(paragraphSpacing) / 96,
                      color: '#333333',
                    }}
                  >
                    {typeof safeResumeData.summary === 'string' &&
                      safeResumeData.summary.startsWith('[{')
                      ? JSON.parse(safeResumeData.summary)
                        .map((node) => node.children.map((child) => child.text).join(''))
                        .join('\n')
                      : safeResumeData.summary}
                  </Typography>
                </Box>
              </Box>
            )}
            <Divider sx={{ my: mmToPx(sectionSpacing) / 96, borderColor: color }} />

            {/* Skills */}
            {safeResumeData.skills.length > 0 && (
              <Box
                sx={{ mt: mmToPx(sectionSpacing) / 96 }}
                component={motion.div}
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: headingSize + 2,
                    color,
                    fontWeight: 'bold',
                    mb: mmToPx(paragraphSpacing) / 96 / 2,
                  }}
                >
                  Skills
                </Typography>
                <Box
                  sx={{
                    ml: { xs: 0, md: '17%' },
                    width: { xs: '100%', md: '83%' },
                    pl: mmToPx(paragraphIndent) / 96,
                  }}
                >
                  <List>
                    {safeResumeData.skills.map((skill, index) => (
                      <ListItem
                        key={index}
                        sx={{
                          py: mmToPx(paragraphSpacing) / 96 / 2,
                          pl: 0,
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize,
                            lineHeight: lineSpacing,
                            color: '#333333',
                          }}
                        >
                          • {skill.name || ''} ({skill.proficiency || ''})
                        </Typography>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Box>
            )}
            <Divider sx={{ my: mmToPx(sectionSpacing) / 96, borderColor: color }} />

            {/* Work History */}
            {safeResumeData.experiences.length > 0 && (
              <Box
                sx={{ mt: mmToPx(sectionSpacing) / 96 }}
                component={motion.div}
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: headingSize + 2,
                    color,
                    fontWeight: 'bold',
                    mb: mmToPx(paragraphSpacing) / 96 / 2,
                  }}
                >
                  Work History
                </Typography>
                {safeResumeData.experiences.map((exp, index) => (
                  <Box
                    key={index}
                    sx={{
                      mb: mmToPx(paragraphSpacing) / 96,
                      display: 'flex',
                      flexDirection: { xs: 'column', md: 'row' },
                      justifyContent: 'space-between',
                    }}
                  >
                    <Box
                      sx={{
                        width: { xs: '100%', md: '70%' },
                        pl: mmToPx(paragraphIndent) / 96,
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize,
                          lineHeight: lineSpacing,
                          fontWeight: 'bold',
                          color: '#333333',
                        }}
                      >
                        {exp.jobTitle || ''}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize,
                          lineHeight: lineSpacing,
                          mb: mmToPx(paragraphSpacing) / 96 / 2,
                          color: '#333333',
                        }}
                      >
                        {exp.employer || ''}, {exp.city || ''}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize,
                          lineHeight: lineSpacing,
                          color: '#333333',
                        }}
                      >
                        {exp.description || ''}
                      </Typography>
                    </Box>
                    <Typography
                      sx={{
                        fontSize: fontSize - 2,
                        lineHeight: lineSpacing,
                        textAlign: { xs: 'left', md: 'right' },
                        color: '#616161',
                      }}
                    >
                      {exp.startDate || ''} - {exp.current ? 'Present' : exp.endDate || ''}
                    </Typography>
                  </Box>
                ))}
              </Box>
            )}
            <Divider sx={{ my: mmToPx(sectionSpacing) / 96, borderColor: color }} />

            {/* Education */}
            {safeResumeData.educations.length > 0 && (
              <Box
                sx={{ mt: mmToPx(sectionSpacing) / 96 }}
                component={motion.div}
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: headingSize + 2,
                    color,
                    fontWeight: 'bold',
                    mb: mmToPx(paragraphSpacing) / 96 / 2,
                  }}
                >
                  Education
                </Typography>
                {safeResumeData.educations.map((edu, index) => (
                  <Box
                    key={index}
                    sx={{
                      mb: mmToPx(paragraphSpacing) / 96,
                      display: 'flex',
                      flexDirection: { xs: 'column', md: 'row' },
                      justifyContent: 'space-between',
                    }}
                  >
                    <Box
                      sx={{
                        width: { xs: '100%', md: '70%' },
                        pl: mmToPx(paragraphIndent) / 96,
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize,
                          lineHeight: lineSpacing,
                          fontWeight: 'bold',
                          color: '#333333',
                        }}
                      >
                        {edu.degree || ''}, {edu.fieldOfStudy || ''}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize,
                          lineHeight: lineSpacing,
                          color: '#333333',
                        }}
                      >
                        {edu.schoolName || ''}, {edu.schoolLocation || ''}
                      </Typography>
                    </Box>
                    <Typography
                      sx={{
                        fontSize: fontSize - 2,
                        lineHeight: lineSpacing,
                        textAlign: { xs: 'left', md: 'right' },
                        color: '#616161',
                      }}
                    >
                      {edu.graduationMonth || ''} {edu.graduationYear || ''}
                    </Typography>
                  </Box>
                ))}
              </Box>
            )}
            <Divider sx={{ my: mmToPx(sectionSpacing) / 96, borderColor: color }} />

            {/* Languages */}
            {safeResumeData.languages.length > 0 && (
              <Box
                sx={{ mt: mmToPx(sectionSpacing) / 96 }}
                component={motion.div}
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: headingSize + 2,
                    color,
                    fontWeight: 'bold',
                    mb: mmToPx(paragraphSpacing) / 96 / 2,
                  }}
                >
                  Languages
                </Typography>
                <Box
                  sx={{
                    ml: { xs: 0, md: '17%' },
                    width: { xs: '100%', md: '83%' },
                    pl: mmToPx(paragraphIndent) / 96,
                  }}
                >
                  <List>
                    {safeResumeData.languages.map((lang, index) => (
                      <ListItem
                        key={index}
                        sx={{
                          py: mmToPx(paragraphSpacing) / 96 / 2,
                          pl: 0,
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize,
                            lineHeight: lineSpacing,
                            color: '#333333',
                          }}
                        >
                          • {lang.name || ''} ({lang.proficiency || ''})
                        </Typography>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Box>
            )}
            <Divider sx={{ my: mmToPx(sectionSpacing) / 96, borderColor: color }} />

            {/* Certifications */}
            {safeResumeData.certifications.length > 0 && (
              <Box
                sx={{ mt: mmToPx(sectionSpacing) / 96 }}
                component={motion.div}
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: headingSize + 2,
                    color,
                    fontWeight: 'bold',
                    mb: mmToPx(paragraphSpacing) / 96 / 2,
                  }}
                >
                  Certifications
                </Typography>
                <Box
                  sx={{
                    ml: { xs: 0, md: '17%' },
                    width: { xs: '100%', md: '83%' },
                    pl: mmToPx(paragraphIndent) / 96,
                  }}
                >
                  <List>
                    {safeResumeData.certifications.map((cert, index) => (
                      <ListItem
                        key={index}
                        sx={{
                          py: mmToPx(paragraphSpacing) / 96 / 2,
                          pl: 0,
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize,
                            lineHeight: lineSpacing,
                            color: '#333333',
                          }}
                        >
                          • {cert.name || ''} ({cert.date || ''})
                        </Typography>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Box>
            )}
            <Divider sx={{ my: mmToPx(sectionSpacing) / 96, borderColor: color }} />

            {/* Accomplishments */}
            {safeResumeData.accomplishments.length > 0 && (
              <Box
                sx={{ mt: mmToPx(sectionSpacing) / 96 }}
                component={motion.div}
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: headingSize + 2,
                    color,
                    fontWeight: 'bold',
                    mb: mmToPx(paragraphSpacing) / 96 / 2,
                  }}
                >
                  Accomplishments
                </Typography>
                <Box
                  sx={{
                    ml: { xs: 0, md: '17%' },
                    width: { xs: '100%', md: '83%' },
                    pl: mmToPx(paragraphIndent) / 96,
                  }}
                >
                  <List>
                    {safeResumeData.accomplishments.map((acc, index) => (
                      <ListItem
                        key={index}
                        sx={{
                          py: mmToPx(paragraphSpacing) / 96 / 2,
                          pl: 0,
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize,
                            lineHeight: lineSpacing,
                            color: '#333333',
                          }}
                        >
                          • {acc || ''}
                        </Typography>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Box>
            )}
            <Divider sx={{ my: mmToPx(sectionSpacing) / 96, borderColor: color }} />

            {/* Personal Information */}
            {safeResumeData.personalInfo && Object.keys(safeResumeData.personalInfo).length > 0 && (
              <Box
                sx={{ mt: mmToPx(sectionSpacing) / 96 }}
                component={motion.div}
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: headingSize + 2,
                    color,
                    fontWeight: 'bold',
                    mb: mmToPx(paragraphSpacing) / 96 / 2,
                  }}
                >
                  Personal Information
                </Typography>
                <Box
                  sx={{
                    ml: { xs: 0, md: '17%' },
                    width: { xs: '100%', md: '83%' },
                    pl: mmToPx(paragraphIndent) / 96,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize,
                      lineHeight: lineSpacing,
                      mb: mmToPx(paragraphSpacing) / 96 / 2,
                      color: '#333333',
                    }}
                  >
                    Date of Birth: {safeResumeData.personalInfo.dateOfBirth || ''}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize,
                      lineHeight: lineSpacing,
                      mb: mmToPx(paragraphSpacing) / 96 / 2,
                      color: '#333333',
                    }}
                  >
                    Gender: {safeResumeData.personalInfo.gender || ''}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize,
                      lineHeight: lineSpacing,
                      mb: mmToPx(paragraphSpacing) / 96 / 2,
                      color: '#333333',
                    }}
                  >
                    Nationality: {safeResumeData.personalInfo.nationality || ''}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize,
                      lineHeight: lineSpacing,
                      mb: mmToPx(paragraphSpacing) / 96 / 2,
                      color: '#333333',
                    }}
                  >
                    Marital Status: {safeResumeData.personalInfo.maritalStatus || ''}
                  </Typography>
                </Box>
              </Box>
            )}
            <Divider sx={{ my: mmToPx(sectionSpacing) / 96, borderColor: color }} />

            {/* Custom Sections */}
            {safeResumeData.customSections.length > 0 &&
              safeResumeData.customSections.map((section, index) => (
                <Box
                  key={index}
                  sx={{ mt: mmToPx(sectionSpacing) / 96 }}
                  component={motion.div}
                  variants={sectionVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <SectionWrapper
                    title={section.heading || `Custom Section ${index + 1}`}
                    isOpen={sectionStates.customSections?.[index] || false}
                    toggleSection={() => toggleSection('customSections', index)}
                  >
                    <Box
                      sx={{
                        ml: { xs: 0, md: '17%' },
                        width: { xs: '100%', md: '83%' },
                        pl: mmToPx(paragraphIndent) / 96,
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize,
                          lineHeight: lineSpacing,
                          mb: mmToPx(paragraphSpacing) / 96,
                          color: '#333333',
                        }}
                      >
                        {section.description || ''}
                      </Typography>
                    </Box>
                  </SectionWrapper>
                </Box>
              ))}
          </Box>
        </SectionWrapper>
      </Paper>
    </Box>
  );
}

export default ClassicTemplate;
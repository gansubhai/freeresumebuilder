import { Box, Typography, Paper, Divider, List, ListItem } from '@mui/material';
import SectionWrapper from '../edit/SectionWrapper';
import CreateResumeForm from '../createResumeForm/CreateResumeForm';

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
  };

  // Return loading state if resumeData is not ready
  if (!resumeData) {
    return (
      <Box sx={{ width: '100%', p: 4, overflowY: 'auto' }}>
        <Typography>Loading resume data...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', p: 4, overflowY: 'auto' }}>
      <Paper
        elevation={3}
        sx={{
          border: `2px solid ${color}`,
          p: 3,
          fontFamily: fontStyle,
          mx: mmToPx(sideMargin) / 96,
        }}
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
            <Box sx={{ textAlign: 'center', mb: mmToPx(paragraphSpacing) / 96 }}>
              <Typography
                variant="h4"
                sx={{
                  fontSize: headingSize + 8,
                  fontWeight: 'bold',
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
                }}
              >
                {safeResumeData.heading.phone || ''}
              </Typography>
              <Typography
                sx={{
                  fontSize: fontSize - 2,
                  lineHeight: lineSpacing,
                }}
              >
                <a
                  href={`mailto:${safeResumeData.heading.email || ''}`}
                  style={{ color, textDecoration: 'none' }}
                >
                  {safeResumeData.heading.email || ''}
                </a>
              </Typography>
            </Box>
            <Divider sx={{ my: mmToPx(sectionSpacing) / 96 }} />

            {/* Professional Summary */}
            <Box sx={{ mt: mmToPx(sectionSpacing) / 96 }}>
              <Typography
                variant="h6"
                sx={{
                  fontSize: headingSize + 2,
                  color,
                  mb: mmToPx(paragraphSpacing) / 96 / 2,
                }}
              >
                Professional Summary
              </Typography>

              <Box
                sx={{
                  ml: '17%',
                  width: '83%',
                  pl: mmToPx(paragraphIndent) / 96,
                }}
              >
                <Typography
                  sx={{
                    fontSize,
                    lineHeight: lineSpacing,
                    mb: mmToPx(paragraphSpacing) / 96,
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
            <Divider sx={{ my: mmToPx(sectionSpacing) / 96 }} />

            {/* Skills */}
            <Box sx={{ mt: mmToPx(sectionSpacing) / 96 }}>
              <Typography
                variant="h6"
                sx={{
                  fontSize: headingSize + 2,
                  color,
                  mb: mmToPx(paragraphSpacing) / 96 / 2,
                }}
              >
                Skills
              </Typography>

              <Box
                sx={{
                  ml: '17%',
                  width: '83%',
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
                        }}
                      >
                        {skill.name || ''} ({skill.proficiency || ''})
                      </Typography>
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Box>
            <Divider sx={{ my: mmToPx(sectionSpacing) / 96 }} />

            {/* Work History */}
            <Box sx={{ mt: mmToPx(sectionSpacing) / 96 }}>
              <Typography
                variant="h6"
                sx={{
                  fontSize: headingSize + 2,
                  color,
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
                    justifyContent: 'space-between',
                  }}
                >
                  <Box
                    sx={{
                      width: '70%',
                      pl: mmToPx(paragraphIndent) / 96,
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize,
                        lineHeight: lineSpacing,
                        fontWeight: 'bold',
                      }}
                    >
                      {exp.jobTitle || ''}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize,
                        lineHeight: lineSpacing,
                        mb: mmToPx(paragraphSpacing) / 96 / 2,
                      }}
                    >
                      {exp.employer || ''}, {exp.city || ''}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize,
                        lineHeight: lineSpacing,
                      }}
                    >
                      {exp.description || ''}
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      fontSize: fontSize - 2,
                      lineHeight: lineSpacing,
                      textAlign: 'right',
                    }}
                  >
                    {exp.startDate || ''} - {exp.current ? 'Present' : exp.endDate || ''}
                  </Typography>
                </Box>
              ))}
            </Box>
            <Divider sx={{ my: mmToPx(sectionSpacing) / 96 }} />

            {/* Education */}
            <Box sx={{ mt: mmToPx(sectionSpacing) / 96 }}>
              <Typography
                variant="h6"
                sx={{
                  fontSize: headingSize + 2,
                  color,
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
                    justifyContent: 'space-between',
                  }}
                >
                  <Box
                    sx={{
                      width: '70%',
                      pl: mmToPx(paragraphIndent) / 96,
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize,
                        lineHeight: lineSpacing,
                        fontWeight: 'bold',
                      }}
                    >
                      {edu.degree || ''}, {edu.fieldOfStudy || ''}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize,
                        lineHeight: lineSpacing,
                      }}
                    >
                      {edu.schoolName || ''}, {edu.schoolLocation || ''}
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      fontSize: fontSize - 2,
                      lineHeight: lineSpacing,
                      textAlign: 'right',
                    }}
                  >
                    {edu.graduationMonth || ''} {edu.graduationYear || ''}
                  </Typography>
                </Box>
              ))}
            </Box>
            <Divider sx={{ my: mmToPx(sectionSpacing) / 96 }} />

            {/* Languages */}
            <Box sx={{ mt: mmToPx(sectionSpacing) / 96 }}>
              <Typography
                variant="h6"
                sx={{
                  fontSize: headingSize + 2,
                  color,
                  mb: mmToPx(paragraphSpacing) / 96 / 2,
                }}
              >
                Languages
              </Typography>
              <Box
                sx={{
                  ml: '17%',
                  width: '83%',
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
                        }}
                      >
                        {lang.name || ''} ({lang.proficiency || ''})
                      </Typography>
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Box>
            <Divider sx={{ my: mmToPx(sectionSpacing) / 96 }} />

            {/* Certifications */}
            <Box sx={{ mt: mmToPx(sectionSpacing) / 96 }}>
              <Typography
                variant="h6"
                sx={{
                  fontSize: headingSize + 2,
                  color,
                  mb: mmToPx(paragraphSpacing) / 96 / 2,
                }}
              >
                Certifications
              </Typography>

              <Box
                sx={{
                  ml: '17%',
                  width: '83%',
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
                        }}
                      >
                        {cert.name || ''} ({cert.date || ''})
                      </Typography>
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Box>
            <Divider sx={{ my: mmToPx(sectionSpacing) / 96 }} />

            {/* Accomplishments */}
            <Box sx={{ mt: mmToPx(sectionSpacing) / 96 }}>
              <Typography
                variant="h6"
                sx={{
                  fontSize: headingSize + 2,
                  color,
                  mb: mmToPx(paragraphSpacing) / 96 / 2,
                }}
              >
                Accomplishments
              </Typography>

              <Box
                sx={{
                  ml: '17%',
                  width: '83%',
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
                        }}
                      >
                        {acc || ''}
                      </Typography>
                    </ListItem>
                  ))}
                </List>
              >
              </Box>
            </Box>
            <Divider sx={{ my: mmToPx(sectionSpacing) / 96 }} />

            {/* Personal Information */}
            <Box sx={{ mt: mmToPx(sectionSpacing) / 96 }}>
              <Typography
                variant="h6"
                sx={{
                  fontSize: headingSize + 2,
                  color,
                  mb: mmToPx(paragraphSpacing) / 96 / 2,
                }}
              >
                Personal Information
              </Typography>

              <Box
                sx={{
                  ml: '17%',
                  width: '83%',
                  pl: mmToPx(paragraphIndent) / 96,
                }}
              >
                <Typography
                  sx={{
                    fontSize,
                    lineHeight: lineSpacing,
                    mb: mmToPx(paragraphSpacing) / 96 / 2,
                  }}
                >
                  Date of Birth: safeResumeData.personalInfo.dateOfBirth || ''}
                </Typography>
                <Typography
                  sx={{
                    fontSize,
                    lineHeight: lineSpacing,
                    mb: mmToPx(paragraphSpacing) / 96 / 2,
                  }}
                >
                  Gender: {safeResumeData.personalInfo.gender || ''}
                </Typography>
                <Typography
                  sx={{
                    fontSize,
                    lineHeight: lineSpacing,
                    mb: mmToPx(paragraphSpacing) / 96 / 2,
                  }}
                >
                  Nationality: {safeResumeData.personalInfo.nationality || ''}
                </Typography>
                <Typography
                  sx={{
                    fontSize,
                    lineHeight: lineSpacing,
                    mb: mmToPx(paragraphSpacing) / 96 / 2,
                  }}
                >
                  Marital Status: {safeResumeData.personalInfo.maritalStatus || ''}
                </Typography>
              </Box>
            </Box>
          </Box>
        </SectionWrapper>
      </Paper>
    </Box>
  );
}

export default ClassicTemplate;
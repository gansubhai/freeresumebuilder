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
        />
        <SectionWrapper
          title="Preview (Classic Template)"
          isOpen={sectionStates.preview}
          toggleSection={() => toggleSection('preview')}
        >
          <Box sx={{ mt: mmToPx(sectionSpacing) / 96, fontFamily: fontStyle }}>
            <Typography variant="h5" sx={{ fontSize: headingSize + 4, mb: mmToPx(paragraphSpacing) / 96 }}>
              {safeResumeData.heading.firstName || ''} {safeResumeData.heading.lastName || ''}
            </Typography>
            <Typography sx={{ fontSize, lineHeight: lineSpacing, mb: mmToPx(paragraphSpacing) / 96, pl: mmToPx(paragraphIndent) / 96 }}>
              {safeResumeData.heading.email || ''}
            </Typography>
            <Typography sx={{ fontSize, lineHeight: lineSpacing, mb: mmToPx(paragraphSpacing) / 96, pl: mmToPx(paragraphIndent) / 96 }}>
              {safeResumeData.heading.city || ''}, {safeResumeData.heading.country || ''} | {safeResumeData.heading.pincode || ''}
            </Typography>
            <Typography sx={{ fontSize, lineHeight: lineSpacing, mb: mmToPx(paragraphSpacing) / 96, pl: mmToPx(paragraphIndent) / 96 }}>
              {safeResumeData.heading.phone || ''} | {safeResumeData.heading.email || ''}
            </Typography>
            <Typography sx={{ fontSize, lineHeight: lineSpacing, mb: mmToPx(paragraphSpacing) / 96, pl: mmToPx(paragraphIndent) / 96 }}>
              {safeResumeData.heading.linkedin || ''}
            </Typography>
            <Divider sx={{ my: mmToPx(sectionSpacing) / 96 }} />
            <Box sx={{ mt: mmToPx(sectionSpacing) / 96 }}>
              <Typography variant="h6" sx={{ fontSize: headingSize, mb: mmToPx(sectionSpacing) / 96 }}>
                Summary
              </Typography>
              <Typography sx={{ fontSize, lineHeight: lineSpacing, mb: mmToPx(paragraphSpacing) / 96, pl: mmToPx(paragraphIndent) / 96 }}>
                {typeof safeResumeData.summary === 'string' && safeResumeData.summary.startsWith('[{')
                  ? JSON.parse(safeResumeData.summary)
                    .map((node) => node.children.map((child) => child.text).join(''))
                    .join('\n')
                  : safeResumeData.summary}
              </Typography>
            </Box>
            <Divider sx={{ my: mmToPx(sectionSpacing) / 96 }} />
            <Box sx={{ mt: mmToPx(sectionSpacing) / 96 }}>
              <Typography variant="h6" sx={{ fontSize: headingSize, mb: mmToPx(sectionSpacing) / 96 }}>
                Skills
              </Typography>
              <List>
                {safeResumeData.skills.map((skill, index) => (
                  <ListItem key={index} sx={{ py: mmToPx(paragraphSpacing) / 96 / 2, pl: mmToPx(paragraphIndent) / 96 }}>
                    <Typography sx={{ fontSize, lineHeight: lineSpacing }}>
                      {skill.name || ''} ({skill.proficiency || ''})
                    </Typography>
                  </ListItem>
                ))}
              </List>
            </Box>
            <Divider sx={{ my: mmToPx(sectionSpacing) / 96 }} />
            <Box sx={{ mt: mmToPx(sectionSpacing) / 96 }}>
              <Typography variant="h6" sx={{ fontSize: headingSize, mb: mmToPx(sectionSpacing) / 96 }}>
                Experience
              </Typography>
              {safeResumeData.experiences.map((exp, index) => (
                <Box key={index} sx={{ mb: mmToPx(paragraphSpacing) / 96 }}>
                  <Typography sx={{ fontSize, lineHeight: lineSpacing, pl: mmToPx(paragraphIndent) / 96 }}>
                    {exp.jobTitle || ''}, {exp.employer || ''}, {exp.city || ''}
                  </Typography>
                  <Typography sx={{ fontSize, lineHeight: lineSpacing, pl: mmToPx(paragraphIndent) / 96, mb: mmToPx(paragraphSpacing) / 96 }}>
                    {exp.startDate || ''} - {exp.current ? 'Present' : exp.endDate || ''}
                  </Typography>
                  <Typography sx={{ fontSize, lineHeight: lineSpacing, pl: mmToPx(paragraphIndent) / 96 }}>
                    {exp.description || ''}
                  </Typography>
                </Box>
              ))}
            </Box>
            <Divider sx={{ my: mmToPx(sectionSpacing) / 96 }} />
            <Box sx={{ mt: mmToPx(sectionSpacing) / 96 }}>
              <Typography variant="h6" sx={{ fontSize: headingSize, mb: mmToPx(sectionSpacing) / 96 }}>
                Education
              </Typography>
              {safeResumeData.educations.map((edu, index) => (
                <Box key={index} sx={{ mb: mmToPx(paragraphSpacing) / 96 }}>
                  <Typography sx={{ fontSize, lineHeight: lineSpacing, pl: mmToPx(paragraphIndent) / 96 }}>
                    {edu.degree || ''}, {edu.fieldOfStudy || ''}
                  </Typography>
                  <Typography sx={{ fontSize, lineHeight: lineSpacing, pl: mmToPx(paragraphIndent) / 96 }}>
                    {edu.schoolName || ''}, {edu.schoolLocation || ''}
                  </Typography>
                  <Typography sx={{ fontSize, lineHeight: lineSpacing, pl: mmToPx(paragraphIndent) / 96 }}>
                    {edu.graduationMonth || ''} {edu.graduationYear || ''}
                  </Typography>
                </Box>
              ))}
            </Box>
            <Divider sx={{ my: mmToPx(sectionSpacing) / 96 }} />
            <Box sx={{ mt: mmToPx(sectionSpacing) / 96 }}>
              <Typography variant="h6" sx={{ fontSize: headingSize, mb: mmToPx(sectionSpacing) / 96 }}>
                Hobbies and Interests
              </Typography>
              <List>
                {safeResumeData.hobbies.map((hobby, index) => (
                  <ListItem key={index} sx={{ py: mmToPx(paragraphSpacing) / 96 / 2, pl: mmToPx(paragraphIndent) / 96 }}>
                    <Typography sx={{ fontSize, lineHeight: lineSpacing }}>
                      {hobby || ''}
                    </Typography>
                  </ListItem>
                ))}
              </List>
            </Box>
            <Divider sx={{ my: mmToPx(sectionSpacing) / 96 }} />
            <Box sx={{ mt: mmToPx(sectionSpacing) / 96 }}>
              <Typography variant="h6" sx={{ fontSize: headingSize, mb: mmToPx(sectionSpacing) / 96 }}>
                Languages
              </Typography>
              <List>
                {safeResumeData.languages.map((lang, index) => (
                  <ListItem key={index} sx={{ py: mmToPx(paragraphSpacing) / 96 / 2, pl: mmToPx(paragraphIndent) / 96 }}>
                    <Typography sx={{ fontSize, lineHeight: lineSpacing }}>
                      {lang.name || ''} ({lang.proficiency || ''})
                    </Typography>
                  </ListItem>
                ))}
              </List>
            </Box>
            <Divider sx={{ my: mmToPx(sectionSpacing) / 96 }} />
            <Box sx={{ mt: mmToPx(sectionSpacing) / 96 }}>
              <Typography variant="h6" sx={{ fontSize: headingSize, mb: mmToPx(sectionSpacing) / 96 }}>
                Certifications
              </Typography>
              <List>
                {safeResumeData.certifications.map((cert, index) => (
                  <ListItem key={index} sx={{ py: mmToPx(paragraphSpacing) / 96 / 2, pl: mmToPx(paragraphIndent) / 96 }}>
                    <Typography sx={{ fontSize, lineHeight: lineSpacing }}>
                      {cert.name || ''} ({cert.date || ''})
                    </Typography>
                  </ListItem>
                ))}
              </List>
            </Box>
            <Divider sx={{ my: mmToPx(sectionSpacing) / 96 }} />
            <Box sx={{ mt: mmToPx(sectionSpacing) / 96 }}>
              <Typography variant="h6" sx={{ fontSize: headingSize, mb: mmToPx(sectionSpacing) / 96 }}>
                Accomplishments
              </Typography>
              <List>
                {safeResumeData.accomplishments.map((acc, index) => (
                  <ListItem key={index} sx={{ py: mmToPx(paragraphSpacing) / 96 / 2, pl: mmToPx(paragraphIndent) / 96 }}>
                    <Typography sx={{ fontSize, lineHeight: lineSpacing }}>
                      {acc || ''}
                    </Typography>
                  </ListItem>
                ))}
              </List>
            </Box>
            <Divider sx={{ my: mmToPx(sectionSpacing) / 96 }} />
            <Box sx={{ mt: mmToPx(sectionSpacing) / 96 }}>
              <Typography variant="h6" sx={{ fontSize: headingSize, mb: mmToPx(sectionSpacing) / 96 }}>
                Personal Information
              </Typography>
              <Typography sx={{ fontSize, lineHeight: lineSpacing, mb: mmToPx(paragraphSpacing) / 96, pl: mmToPx(paragraphIndent) / 96 }}>
                Date of Birth: {safeResumeData.personalInfo.dateOfBirth || ''}
              </Typography>
              <Typography sx={{ fontSize, lineHeight: lineSpacing, mb: mmToPx(paragraphSpacing) / 96, pl: mmToPx(paragraphIndent) / 96 }}>
                Gender: {safeResumeData.personalInfo.gender || ''}
              </Typography>
              <Typography sx={{ fontSize, lineHeight: lineSpacing, mb: mmToPx(paragraphSpacing) / 96, pl: mmToPx(paragraphIndent) / 96 }}>
                Nationality: {safeResumeData.personalInfo.nationality || ''}
              </Typography>
              <Typography sx={{ fontSize, lineHeight: lineSpacing, mb: mmToPx(paragraphSpacing) / 96, pl: mmToPx(paragraphIndent) / 96 }}>
                Marital Status: {safeResumeData.personalInfo.maritalStatus || ''}
              </Typography>
            </Box>
          </Box>
        </SectionWrapper>
      </Paper>
    </Box>
  );
}

export default ClassicTemplate;
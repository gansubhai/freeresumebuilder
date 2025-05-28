import { Box, Typography, Paper, Divider, Grid, LinearProgress } from '@mui/material';
import SectionWrapper from '../edit/SectionWrapper';
import CreateResumeForm from '../createResumeForm/CreateResumeForm';

function ProfessionalTemplate({
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

  // Reimplement renderProficiencyBars
  const renderProficiencyBars = (proficiency) => {
    const proficiencyLevels = {
      Beginner: 20,
      Intermediate: 40,
      Advanced: 60,
      Expert: 80,
      Master: 100,
    };
    const level = proficiencyLevels[proficiency] || 20;
    return (
      <LinearProgress
        variant="determinate"
        value={level}
        sx={{ width: '100px', height: 8, mt: 0.5 }}
      />
    );
  };

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
        elevation={1}
        sx={{
          p: 3,
          fontFamily: fontStyle,
          mx: mmToPx(sideMargin) / 96,
          border: `1px solid #e0e0e0`,
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
          title="Preview (Professional Template)"
          isOpen={sectionStates.preview}
          toggleSection={() => toggleSection('preview')}
        >
          <Grid container spacing={2}>
            <Grid
              item
              xs={4}
              sx={{
                bgcolor: color,
                color: '#fff',
                p: 2,
                fontFamily: fontStyle,
                mx: mmToPx(sideMargin) / 96,
              }}
            >
              <Box>
                <Typography variant="h6" sx={{ fontSize: headingSize, mb: mmToPx(sectionSpacing) / 96 }}>
                  Contact
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontSize,
                    lineHeight: lineSpacing,
                    mb: mmToPx(paragraphSpacing) / 96,
                    pl: mmToPx(paragraphIndent) / 96,
                  }}
                >
                  {safeResumeData.heading.city || ''}, {safeResumeData.heading.country || ''} {safeResumeData.heading.pincode || ''}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontSize,
                    lineHeight: lineSpacing,
                    mb: mmToPx(paragraphSpacing) / 96,
                    pl: mmToPx(paragraphIndent) / 96,
                  }}
                >
                  Phone: {safeResumeData.heading.phone || ''}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontSize,
                    lineHeight: lineSpacing,
                    mb: mmToPx(paragraphSpacing) / 96,
                    pl: mmToPx(paragraphIndent) / 96,
                  }}
                >
                  Email: {safeResumeData.heading.email || ''}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontSize,
                    lineHeight: lineSpacing,
                    mb: mmToPx(paragraphSpacing) / 96,
                    pl: mmToPx(paragraphIndent) / 96,
                    color: '#fff',
                    textDecoration: 'underline',
                  }}
                >
                  LinkedIn: {safeResumeData.heading.linkedin || ''}
                </Typography>
                <Divider sx={{ my: mmToPx(sectionSpacing) / 96, bgcolor: '#fff' }} />
                <Typography variant="h6" sx={{ fontSize: headingSize, mb: mmToPx(sectionSpacing) / 96 }}>
                  Languages
                </Typography>
                {safeResumeData.languages.map((lang, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      mb: mmToPx(paragraphSpacing) / 96,
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        fontSize,
                        lineHeight: lineSpacing,
                        pl: mmToPx(paragraphIndent) / 96,
                      }}
                    >
                      {lang.name || ''}
                    </Typography>
                    {renderProficiencyBars(lang.proficiency || '')}
                  </Box>
                ))}
                <Divider sx={{ my: mmToPx(sectionSpacing) / 96, bgcolor: '#fff' }} />
                <Typography variant="h6" sx={{ fontSize: headingSize, mb: mmToPx(sectionSpacing) / 96 }}>
                  Skills
                </Typography>
                {safeResumeData.skills.map((skill, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      mb: mmToPx(paragraphSpacing) / 96,
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        fontSize,
                        lineHeight: lineSpacing,
                        pl: mmToPx(paragraphIndent) / 96,
                      }}
                    >
                      {skill.name || ''}
                    </Typography>
                    {renderProficiencyBars(skill.proficiency || '')}
                  </Box>
                ))}
                <Divider sx={{ my: mmToPx(sectionSpacing) / 96, bgcolor: '#fff' }} />
                <Typography variant="h6" sx={{ fontSize: headingSize, mb: mmToPx(sectionSpacing) / 96 }}>
                  Certifications
                </Typography>
                {safeResumeData.certifications.map((cert, index) => (
                  <Typography
                    key={index}
                    variant="body2"
                    sx={{
                      fontSize,
                      lineHeight: lineSpacing,
                      mb: mmToPx(paragraphSpacing) / 96,
                      pl: mmToPx(paragraphIndent) / 96,
                    }}
                  >
                    {cert.name || ''} ({cert.date || ''})
                  </Typography>
                ))}
                <Divider sx={{ my: mmToPx(sectionSpacing) / 96, bgcolor: '#fff' }} />
                <Typography variant="h6" sx={{ fontSize: headingSize, mb: mmToPx(sectionSpacing) / 96 }}>
                  Hobbies
                </Typography>
                {safeResumeData.hobbies.map((hobby, index) => (
                  <Typography
                    key={index}
                    variant="body2"
                    sx={{
                      fontSize,
                      lineHeight: lineSpacing,
                      mb: mmToPx(paragraphSpacing) / 96,
                      pl: mmToPx(paragraphIndent) / 96,
                    }}
                  >
                    • {hobby || ''}
                  </Typography>
                ))}
              </Box>
            </Grid>
            <Grid item xs={8}>
              <Box>
                <Typography variant="h4" sx={{ fontSize: headingSize + 4, mb: mmToPx(paragraphSpacing) / 96 }}>
                  {safeResumeData.heading.firstName || ''} {safeResumeData.heading.lastName || ''}
                </Typography>
                <Typography variant="h6" sx={{ fontSize: headingSize, mb: mmToPx(sectionSpacing) / 96 }}>
                  {safeResumeData.heading.title || ''}
                </Typography>
                <Divider sx={{ my: mmToPx(sectionSpacing) / 96 }} />
                <Box sx={{ mt: mmToPx(sectionSpacing) / 96 }}>
                  <Typography variant="h6" sx={{ fontSize: headingSize, mb: mmToPx(sectionSpacing) / 96 }}>
                    Summary
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize,
                      lineHeight: lineSpacing,
                      mb: mmToPx(paragraphSpacing) / 96,
                      pl: mmToPx(paragraphIndent) / 96,
                    }}
                  >
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
                    Experience
                  </Typography>
                  {safeResumeData.experiences.map((exp, index) => (
                    <Box key={index} sx={{ mb: mmToPx(paragraphSpacing) / 96 }}>
                      <Typography
                        variant="body2"
                        sx={{
                          fontSize,
                          lineHeight: lineSpacing,
                          pl: mmToPx(paragraphIndent) / 96,
                        }}
                      >
                        {exp.jobTitle || ''}, {exp.employer || ''}, {exp.city || ''}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          fontSize,
                          lineHeight: lineSpacing,
                          pl: mmToPx(paragraphIndent) / 96,
                          mb: mmToPx(paragraphSpacing) / 96,
                        }}
                      >
                        {exp.startDate || ''} - {exp.current ? 'Present' : exp.endDate || ''}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          fontSize,
                          lineHeight: lineSpacing,
                          pl: mmToPx(paragraphIndent) / 96,
                        }}
                      >
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
                      <Typography
                        variant="body2"
                        sx={{
                          fontSize,
                          lineHeight: lineSpacing,
                          pl: mmToPx(paragraphIndent) / 96,
                        }}
                      >
                        {edu.degree || ''}, {edu.fieldOfStudy || ''}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          fontSize,
                          lineHeight: lineSpacing,
                          pl: mmToPx(paragraphIndent) / 96,
                        }}
                      >
                        {edu.schoolName || ''}, {edu.schoolLocation || ''}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          fontSize,
                          lineHeight: lineSpacing,
                          pl: mmToPx(paragraphIndent) / 96,
                        }}
                      >
                        {edu.graduationMonth || ''} {edu.graduationYear || ''}
                      </Typography>
                    </Box>
                  ))}
                </Box>
                <Divider sx={{ my: mmToPx(sectionSpacing) / 96 }} />
                <Box sx={{ mt: mmToPx(sectionSpacing) / 96 }}>
                  <Typography variant="h6" sx={{ fontSize: headingSize, mb: mmToPx(sectionSpacing) / 96 }}>
                    Accomplishments
                  </Typography>
                  {safeResumeData.accomplishments.map((acc, index) => (
                    <Typography
                      key={index}
                      variant="body2"
                      sx={{
                        fontSize,
                        lineHeight: lineSpacing,
                        mb: mmToPx(paragraphSpacing) / 96,
                        pl: mmToPx(paragraphIndent) / 96,
                      }}
                    >
                      • {acc || ''}
                    </Typography>
                  ))}
                </Box>
                <Divider sx={{ my: mmToPx(sectionSpacing) / 96 }} />
                <Box sx={{ mt: mmToPx(sectionSpacing) / 96 }}>
                  <Typography variant="h6" sx={{ fontSize: headingSize, mb: mmToPx(sectionSpacing) / 96 }}>
                    Personal Information
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize,
                      lineHeight: lineSpacing,
                      mb: mmToPx(paragraphSpacing) / 96,
                      pl: mmToPx(paragraphIndent) / 96,
                    }}
                  >
                    Date of Birth: {safeResumeData.personalInfo.dateOfBirth || ''}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize,
                      lineHeight: lineSpacing,
                      mb: mmToPx(paragraphSpacing) / 96,
                      pl: mmToPx(paragraphIndent) / 96,
                    }}
                  >
                    Gender: {safeResumeData.personalInfo.gender || ''}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize,
                      lineHeight: lineSpacing,
                      mb: mmToPx(paragraphSpacing) / 96,
                      pl: mmToPx(paragraphIndent) / 96,
                    }}
                  >
                    Nationality: {safeResumeData.personalInfo.nationality || ''}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize,
                      lineHeight: lineSpacing,
                      mb: mmToPx(paragraphSpacing) / 96,
                      pl: mmToPx(paragraphIndent) / 96,
                    }}
                  >
                    Marital Status: {safeResumeData.personalInfo.maritalStatus || ''}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </SectionWrapper>
      </Paper>
    </Box>
  );
}

export default ProfessionalTemplate;
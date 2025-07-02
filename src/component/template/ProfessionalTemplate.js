import { Box, Typography, Paper, Divider, Grid, LinearProgress } from '@mui/material';
import { motion } from 'framer-motion';
import SectionWrapper from '../edit/SectionWrapper';
import CreateResumeForm from '../createResumeForm/CreateResumeForm';

// Animation variants for sections
const sectionVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

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
  handleExpandAll,
  handleCollapseAll,
}) {
  const mmToPx = (mm) => mm * 3.78;

  // Helper to render Slate JSON with bullets and formatting
  const renderSlateJson = (jsonString) => {
    try {
      const nodes = typeof jsonString === 'string' && jsonString.startsWith('[')
        ? JSON.parse(jsonString)
        : [{ type: 'paragraph', children: [{ text: jsonString || '' }] }];
      return nodes.map((node, index) => {
        if (node.type === 'bulleted-list') {
          return (
            <Box key={index} component="ul" sx={{ pl: 4, m: 0, listStyleType: 'disc' }}>
              {node.children.map((child, i) => (
                <Box
                  key={i}
                  component="li"
                  sx={{ fontSize: fontSize, lineHeight: lineSpacing }}
                >
                  {child.children.map((textNode, j) => (
                    <Typography
                      key={j}
                      component="span"
                      sx={{
                        fontSize: fontSize,
                        fontWeight: textNode.bold ? 'bold' : 'normal',
                        fontStyle: textNode.italic ? 'italic' : 'normal',
                        textDecoration: textNode.underline ? 'underline' : 'none',
                        color: '#333333',
                      }}
                    >
                      {textNode.text}
                    </Typography>
                  ))}
                </Box>
              ))}
            </Box>
          );
        }
        return (
          <Typography
            key={index}
            sx={{ fontSize: fontSize, lineHeight: lineSpacing, color: '#333333' }}
          >
            {node.children.map((child, i) => (
              <Typography
                key={i}
                component="span"
                sx={{
                  fontWeight: child.bold ? 'bold' : 'normal',
                  fontStyle: child.italic ? 'italic' : 'normal',
                  textDecoration: child.underline ? 'underline' : 'none',
                }}
              >
                {child.text}
              </Typography>
            ))}
          </Typography>
        );
      });
    } catch (error) {
      console.error('Error parsing Slate JSON:', error);
      return (
        <Typography sx={{ fontSize: fontSize, lineHeight: lineSpacing, color: '#333333' }}>
          {jsonString || ''}
        </Typography>
      );
    }
  };

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
        sx={{
          width: '100px',
          height: 8,
          mt: 0.5,
          backgroundColor: '#e0e0e0',
          '& .MuiLinearProgress-bar': { backgroundColor: '#1e3a8a' },
        }}
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
    customSections: resumeData?.customSections || [],
  };

  // Return loading state if resumeData is not ready
  if (!resumeData) {
    return (
      <Box sx={{ width: '100%', p: 4, overflowY: 'auto', textAlign: 'center' }}>
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
          title="Preview (Professional Template)"
          isOpen={sectionStates.preview}
          toggleSection={() => toggleSection('preview')}
        >
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              md={4}
              sx={{
                bgcolor: color,
                color: '#fff',
                p: 2,
                fontFamily: fontStyle,
              }}
              component={motion.div}
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
            >
              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: headingSize + 2,
                    fontWeight: 'bold',
                    mb: mmToPx(sectionSpacing) / 96,
                  }}
                >
                  Contact
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: fontSize - 2,
                    lineHeight: lineSpacing,
                    mb: mmToPx(paragraphSpacing) / 96,
                    pl: mmToPx(paragraphIndent) / 96,
                  }}
                >
                  {safeResumeData.heading.city || ''}, {safeResumeData.heading.country || ''}{' '}
                  {safeResumeData.heading.pincode || ''}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: fontSize - 2,
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
                    fontSize: fontSize - 2,
                    lineHeight: lineSpacing,
                    mb: mmToPx(paragraphSpacing) / 96,
                    pl: mmToPx(paragraphIndent) / 96,
                  }}
                >
                  <a
                    href={`mailto:${safeResumeData.heading.email || ''}`}
                    style={{ color: '#10b981', textDecoration: 'none' }}
                  >
                    Email: {safeResumeData.heading.email || ''}
                  </a>
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: fontSize - 2,
                    lineHeight: lineSpacing,
                    mb: mmToPx(paragraphSpacing) / 96,
                    pl: mmToPx(paragraphIndent) / 96,
                  }}
                >
                  <a
                    href={safeResumeData.heading.linkedin || ''}
                    style={{ color: '#10b981', textDecoration: 'none' }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn: {safeResumeData.heading.linkedin || ''}
                  </a>
                </Typography>
                <Divider sx={{ my: mmToPx(sectionSpacing) / 96, bgcolor: '#fff' }} />
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: headingSize + 2,
                    fontWeight: 'bold',
                    mb: mmToPx(sectionSpacing) / 96,
                  }}
                >
                  Languages
                </Typography>
                {safeResumeData.languages.map((lang, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      mb: mmToPx(paragraphSpacing) / 96,
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: fontSize - 2,
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
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: headingSize + 2,
                    fontWeight: 'bold',
                    mb: mmToPx(sectionSpacing) / 96,
                  }}
                >
                  Skills
                </Typography>
                {safeResumeData.skills.map((skill, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      mb: mmToPx(paragraphSpacing) / 96,
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: fontSize - 2,
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
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: headingSize + 2,
                    fontWeight: 'bold',
                    mb: mmToPx(sectionSpacing) / 96,
                  }}
                >
                  Certifications
                </Typography>
                {safeResumeData.certifications.map((cert, index) => (
                  <Typography
                    key={index}
                    variant="body2"
                    sx={{
                      fontSize: fontSize - 2,
                      lineHeight: lineSpacing,
                      mb: mmToPx(paragraphSpacing) / 96,
                      pl: mmToPx(paragraphIndent) / 96,
                    }}
                  >
                    • {cert.name || ''} ({cert.date || ''})
                  </Typography>
                ))}
                <Divider sx={{ my: mmToPx(sectionSpacing) / 96, bgcolor: '#fff' }} />
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: headingSize + 2,
                    fontWeight: 'bold',
                    mb: mmToPx(sectionSpacing) / 96,
                  }}
                >
                  Hobbies
                </Typography>
                {safeResumeData.hobbies.map((hobby, index) => (
                  <Typography
                    key={index}
                    variant="body2"
                    sx={{
                      fontSize: fontSize - 2,
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
            <Grid
              item
              xs={12}
              md={8}
              component={motion.div}
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
            >
              <Box>
                <Typography
                  variant="h4"
                  sx={{
                    fontSize: headingSize + 8,
                    fontWeight: 'bold',
                    color: '#1e3a8a',
                    mb: mmToPx(paragraphSpacing) / 96,
                  }}
                >
                  {safeResumeData.heading.firstName || ''} {safeResumeData.heading.lastName || ''}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: headingSize,
                    color: '#333333',
                    mb: mmToPx(sectionSpacing) / 96,
                  }}
                >
                  {safeResumeData.heading.title || ''}
                </Typography>
                <Divider sx={{ my: mmToPx(sectionSpacing) / 96, borderColor: color }} />
                <Box sx={{ mt: mmToPx(sectionSpacing) / 96 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: headingSize + 2,
                      fontWeight: 'bold',
                      color: '#1e3a8a',
                      mb: mmToPx(paragraphSpacing) / 96,
                    }}
                  >
                    Professional Summary
                  </Typography>
                  <Box sx={{ pl: mmToPx(paragraphIndent) / 96 }}>
                    {renderSlateJson(safeResumeData.summary)}
                  </Box>
                </Box>
                <Divider sx={{ my: mmToPx(sectionSpacing) / 96, borderColor: color }} />
                <Box sx={{ mt: mmToPx(sectionSpacing) / 96 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: headingSize + 2,
                      fontWeight: 'bold',
                      color: '#1e3a8a',
                      mb: mmToPx(paragraphSpacing) / 96,
                    }}
                  >
                    Experience
                  </Typography>
                  {safeResumeData.experiences.map((exp, index) => (
                    <Box key={index} sx={{ mb: mmToPx(paragraphSpacing) / 96 }}>
                      <Typography
                        variant="body2"
                        sx={{
                          fontSize: fontSize,
                          fontWeight: 'bold',
                          lineHeight: lineSpacing,
                          pl: mmToPx(paragraphIndent) / 96,
                          color: '#333333',
                        }}
                      >
                        {exp.jobTitle || ''}, {exp.employer || ''}, {exp.city || ''}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          fontSize: fontSize - 2,
                          lineHeight: lineSpacing,
                          pl: mmToPx(paragraphIndent) / 96,
                          mb: mmToPx(paragraphSpacing) / 96,
                          color: '#616161',
                        }}
                      >
                        {exp.startDate || ''} - {exp.current ? 'Present' : exp.endDate || ''}
                      </Typography>
                      <Box sx={{ pl: mmToPx(paragraphIndent) / 96 }}>
                        {renderSlateJson(exp.description)}
                      </Box>
                    </Box>
                  ))}
                </Box>
                <Divider sx={{ my: mmToPx(sectionSpacing) / 96, borderColor: color }} />
                <Box sx={{ mt: mmToPx(sectionSpacing) / 96 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: headingSize + 2,
                      fontWeight: 'bold',
                      color: '#1e3a8a',
                      mb: mmToPx(paragraphSpacing) / 96,
                    }}
                  >
                    Education
                  </Typography>
                  {safeResumeData.educations.map((edu, index) => (
                    <Box key={index} sx={{ mb: mmToPx(paragraphSpacing) / 96 }}>
                      <Typography
                        variant="body2"
                        sx={{
                          fontSize: fontSize,
                          fontWeight: 'bold',
                          lineHeight: lineSpacing,
                          pl: mmToPx(paragraphIndent) / 96,
                          color: '#333333',
                        }}
                      >
                        {edu.degree || ''}, {edu.fieldOfStudy || ''}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          fontSize: fontSize,
                          lineHeight: lineSpacing,
                          pl: mmToPx(paragraphIndent) / 96,
                          color: '#333333',
                        }}
                      >
                        {edu.schoolName || ''}, {edu.schoolLocation || ''}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          fontSize: fontSize - 2,
                          lineHeight: lineSpacing,
                          pl: mmToPx(paragraphIndent) / 96,
                          color: '#616161',
                        }}
                      >
                        {edu.graduationMonth || ''} {edu.graduationYear || ''}
                      </Typography>
                    </Box>
                  ))}
                </Box>
                <Divider sx={{ my: mmToPx(sectionSpacing) / 96, borderColor: color }} />
                <Box sx={{ mt: mmToPx(sectionSpacing) / 96 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: headingSize + 2,
                      fontWeight: 'bold',
                      color: '#1e3a8a',
                      mb: mmToPx(paragraphSpacing) / 96,
                    }}
                  >
                    Accomplishments
                  </Typography>
                  {safeResumeData.accomplishments.map((acc, index) => (
                    <Typography
                      key={index}
                      variant="body2"
                      sx={{
                        fontSize: fontSize,
                        lineHeight: lineSpacing,
                        mb: mmToPx(paragraphSpacing) / 96,
                        pl: mmToPx(paragraphIndent) / 96,
                        color: '#333333',
                      }}
                    >
                      • {acc || ''}
                    </Typography>
                  ))}
                </Box>
                <Divider sx={{ my: mmToPx(sectionSpacing) / 96, borderColor: color }} />
                <Box sx={{ mt: mmToPx(sectionSpacing) / 96 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: headingSize + 2,
                      fontWeight: 'bold',
                      color: '#1e3a8a',
                      mb: mmToPx(paragraphSpacing) / 96,
                    }}
                  >
                    Personal Information
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: fontSize,
                      lineHeight: lineSpacing,
                      mb: mmToPx(paragraphSpacing) / 96,
                      pl: mmToPx(paragraphIndent) / 96,
                      color: '#333333',
                    }}
                  >
                    Date of Birth: {safeResumeData.personalInfo.dateOfBirth || ''}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: fontSize,
                      lineHeight: lineSpacing,
                      mb: mmToPx(paragraphSpacing) / 96,
                      pl: mmToPx(paragraphIndent) / 96,
                      color: '#333333',
                    }}
                  >
                    Gender: {safeResumeData.personalInfo.gender || ''}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: fontSize,
                      lineHeight: lineSpacing,
                      mb: mmToPx(paragraphSpacing) / 96,
                      pl: mmToPx(paragraphIndent) / 96,
                      color: '#333333',
                    }}
                  >
                    Nationality: {safeResumeData.personalInfo.nationality || ''}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: fontSize,
                      lineHeight: lineSpacing,
                      mb: mmToPx(paragraphSpacing) / 96,
                      pl: mmToPx(paragraphIndent) / 96,
                      color: '#333333',
                    }}
                  >
                    Marital Status: {safeResumeData.personalInfo.maritalStatus || ''}
                  </Typography>
                </Box>
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
                        <Box sx={{ pl: mmToPx(paragraphIndent) / 96 }}>
                          {renderSlateJson(section.description)}
                        </Box>
                      </SectionWrapper>
                    </Box>
                  ))}
              </Box>
            </Grid>
          </Grid>
        </SectionWrapper>
      </Paper>
    </Box>
  );
}

export default ProfessionalTemplate;
import { List, ListItem, Box, Typography, Paper } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SectionWrapper from '../edit/SectionWrapper';
import CreateResumeForm from '../createResumeForm/CreateResumeForm';

function ModernTemplate({
  resumeData,
  setResumeData,
  color,
  fontStyle,
  fontSize,
  sectionSpacing,
  paragraphSpacing,
  lineSpacing,
  sideMargin,
  paragraphIndent,
  sectionStates,
  toggleSection,
}) {
  const mmToPx = (mm) => mm * 3.76;

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
                <Box key={i} sx={{}} component="li" sx={{ fontSize: 14, lineHeight: lineSpacing }}>
                  {child.children.map((textNode, j) => (
                    <Typography
                      key={j}
                      component="span"
                      sx={{
                        fontSize: 14,
                        fontWeight: textNode.bold ? 'bold' : 'normal',
                        fontStyle: textNode.italic ? 'italic' : 'normal',
                        textDecoration: textNode.underline ? 'underline' : 'none',
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
            sx={{ fontSize: 14, lineHeight: lineSpacing }}
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
      return <Typography sx={{ fontSize: 14, lineHeight: lineSpacing }}>{jsonString || ''}</Typography>;
    }
  };

  // Safely access resumeData with fallbacks
  const safeResumeData = {
    heading: resumeData?.heading || {},
    summary: resumeData?.summary || JSON.stringify([{ type: 'paragraph', children: [{ text: '' }] }]),
    skills: resumeData?.skills || [],
    experiences: resumeData?.experiences || [],
    educations: resumeData?.educations || [],
    accomplishments: resumeData?.accomplishments || [],
    languages: resumeData?.languages || [],
    personalInfo: resumeData?.personalInfo || {},
  };

  // Log for debugging
  console.log('ModernTemplate: setResumeData is', typeof setResumeData);
  console.log('ModernTemplate: safeResumeData.accomplishments', safeResumeData.accomplishments);

  if (!resumeData) {
    return (
      <Box sx={{ width: '100%', p: 4, overflow: 'auto' }}>
        <Typography>Loading resume data...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', p: 4, overflow: 'auto' }}>
      <Paper
        elevation={0}
        sx={{
          p: 3,
          fontFamily: fontStyle,
          mx: mmToPx(sideMargin) / 96,
          borderRadius: 2,
          overflow: 'auto',
        }}
        aria-label="Resume"
      >
        <CreateResumeForm
          resumeData={resumeData}
          setResumeData={setResumeData}
          color={color}
          fontStyle={fontStyle}
          fontSize={fontSize}
          sectionSpacing={sectionSpacing}
          paragraphSpacing={paragraphSpacing}
          lineSpacing={lineSpacing}
          sideMargin={sideMargin}
          paragraphIndent={paragraphIndent}
          sectionStates={sectionStates}
          toggleSection={toggleSection}
        />
        <SectionWrapper
          title="Preview (Modern Template)"
          isOpen={sectionStates.preview}
          toggleSection={() => toggleSection('preview')}
        >
          <Box id="resume-container" sx={{ fontFamily: fontStyle }}>
            {/* Header and Summary with Background */}
            <Box
              sx={{
                backgroundColor: '#e3f2fd',
                p: 2,
                mb: 2,
                borderRadius: 1,
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontSize: 24,
                  fontWeight: 'bold',
                  color,
                  mb: 0.5,
                }}
              >
                {safeResumeData.heading.firstName || ''} {safeResumeData.heading.lastName || ''}
              </Typography>
              <Typography
                sx={{
                  fontSize: 16,
                  fontWeight: 'medium',
                  mb: 1,
                }}
              >
                {safeResumeData.heading.jobTitle || ''}
              </Typography>
              {renderSlateJson(safeResumeData.summary)}
            </Box>
            {/* Contact Block */}
            <Box
              sx={{
                backgroundColor: '#f5f5f5',
                p: 2,
                mb: 3,
                borderRadius: 1,
                display: 'flex',
                gap: 2,
                alignItems: 'center',
                flexWrap: 'wrap',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <EmailIcon sx={{ fontSize: 18, color }} />
                <Typography sx={{ fontSize: 14, lineHeight: lineSpacing }}>
                  {safeResumeData.heading.email || ''}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <PhoneIcon sx={{ fontSize: 18, color }} />
                <Typography sx={{ fontSize: 14, lineHeight: lineSpacing }}>
                  {safeResumeData.heading.phone || ''}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocationOnIcon sx={{ fontSize: 18, color }} />
                <Typography sx={{ fontSize: 14, lineHeight: lineSpacing }}>
                  {safeResumeData.heading.city || ''}, {safeResumeData.heading.country || ''}
                </Typography>
              </Box>
            </Box>
            {/* Two-Column Layout */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                gap: 4,
                alignItems: 'stretch',
              }}
            >
              {/* Left Column: Work Experience */}
              <Box sx={{ flex: 1, pr: { md: 2 } }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: 18,
                    textTransform: 'uppercase',
                    fontWeight: 'bold',
                    borderBottom: `2px solid ${color}`,
                    mb: 2,
                    color
                  }}
                >
                  Work Experience
                </Typography>
                {safeResumeData.experiences.map((exp, index) => (
                  <Box key={index} sx={{ mb: 3 }}>
                    <Typography
                      sx={{ fontSize: 18, fontWeight: 'bold', lineHeight: lineSpacing }}
                    >
                      {exp.jobTitle || ''}
                    </Typography>
                    <Typography
                      sx={{ fontSize: 16, lineHeight: lineSpacing, mb: 0.5 }}
                    >
                      {exp.employer || ''}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography sx={{ fontSize: 12, lineHeight: lineSpacing }}>
                        {exp.startDate || ''} - {exp.current ? 'Present' : exp.endDate || ''}
                      </Typography>
                      <Typography sx={{ fontSize: 12, lineHeight: lineSpacing }}>
                        {exp.city || ''}
                      </Typography>
                    </Box>
                    {renderSlateJson(exp.description)}
                  </Box>
                ))}
              </Box>
              {/* Right Column: Skills, Education, Achievements, Languages, Personal Info */}
              <Box sx={{ flex: 1 }}>
                {/* Skills */}
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: 18,
                    textTransform: 'uppercase',
                    fontWeight: 'bold',
                    borderBottom: `2px solid ${color}`,
                    mb: 2,
                    color
                  }}
                >
                  Skills
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                  {safeResumeData.skills.map((skill, index) => (
                    <Typography
                      key={index}
                      sx={{
                        fontSize: 14,
                        backgroundColor: '#bbdefb',
                        px: 1.5,
                        py: 0.5,
                        borderRadius: '12px',
                        mr: 1,
                        mb: 1,
                      }}
                    >
                      {skill.name || ''}
                    </Typography>
                  ))}
                </Box>
                {/* Education */}
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: 18,
                    textTransform: 'uppercase',
                    fontWeight: 'bold',
                    borderBottom: `2px solid ${color}`,
                    mb: 2,
                    color
                  }}
                >
                  Education
                </Typography>
                {safeResumeData.educations.map((edu, index) => (
                  <Box key={index} sx={{ mb: 2 }}>
                    <Typography sx={{ fontSize: 14, fontWeight: 'bold', lineHeight: lineSpacing }}>
                      {edu.degree || ''}, {edu.fieldOfStudy || ''}
                    </Typography>
                    <Typography sx={{ fontSize: 14, lineHeight: lineSpacing }}>
                      {edu.schoolName || ''}, {edu.schoolLocation || ''}, {edu.graduationMonth || ''}/{edu.graduationYear || ''}, GPA: {edu.gpa || ''}
                    </Typography>
                  </Box>
                ))}
                {/* Achievements */}
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: 18,
                    textTransform: 'uppercase',
                    fontWeight: 'bold',
                    borderBottom: `2px solid ${color}`,
                    mb: 2,
                    color
                  }}
                >
                  Accomplishments
                </Typography>
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
                {/* Languages */}
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: 18,
                    textTransform: 'uppercase',
                    fontWeight: 'bold',
                    borderBottom: `2px solid ${color}`,
                    mb: 2,
                    color
                  }}
                >
                  Languages
                </Typography>
                {safeResumeData.languages.map((lang, index) => (
                  <Typography key={index} sx={{ fontSize: 14, lineHeight: lineSpacing, mb: 0.5 }}>
                    {lang.name || ''} ({lang.proficiency || ''})
                  </Typography>
                ))}
                {/* Personal Information */}
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: 18,
                    textTransform: 'uppercase',
                    fontWeight: 'bold',
                    borderBottom: `2px solid ${color}`,
                    mb: 2,
                    color
                  }}
                >
                  Personal Information
                </Typography>
                <Typography sx={{ fontSize: 14, lineHeight: lineSpacing, mb: 0.5 }}>
                  Date of Birth: {safeResumeData.personalInfo.dateOfBirth || ''}
                </Typography>
                <Typography sx={{ fontSize: 14, lineHeight: lineSpacing, mb: 0.5 }}>
                  Gender: {safeResumeData.personalInfo.gender || ''}
                </Typography>
                <Typography sx={{ fontSize: 14, lineHeight: lineSpacing, mb: 0.5 }}>
                  Nationality: {safeResumeData.personalInfo.nationality || ''}
                </Typography>
                <Typography sx={{ fontSize: 14, lineHeight: lineSpacing, mb: 0.5 }}>
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

export default ModernTemplate;
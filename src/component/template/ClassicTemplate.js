import { Box, Typography, Paper, Divider, List, ListItem } from '@mui/material';
import SectionWrapper from '../edit/SectionWrapper';
import HeadingSection from '../edit/HeadingSection';
import SummarySection from '../edit/SummarySection';
import SkillsSection from '../edit/SkillsSection';
import ExperienceSection from '../edit/ExperienceSection';
import EducationSection from '../edit/EducationSection';
import HobbiesSection from '../edit/HobbiesSection';
import LanguagesSection from '../edit/LanguagesSection';
import PersonalInfoSection from '../edit/PersonalInfoSection';
import CertificationsSection from '../edit/CertificationsSection';
import AccomplishmentsSection from '../edit/AccomplishmentsSection';
import CustomSection from '../edit/CustomSection';

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

  // Update section in resumeData
  const updateSection = (sectionKey) => (updatedData) => {
    setResumeData({ ...resumeData, [sectionKey]: updatedData });
  };

  const handleAddCustomItem = (sectionIndex) => () => {
    const newCustomSections = [...(resumeData.customSections || [])];
    if (!newCustomSections[sectionIndex]) return;
    newCustomSections[sectionIndex].items = [
      ...(newCustomSections[sectionIndex].items || []),
      { title: '', description: '' },
    ];
    setResumeData({ ...resumeData, customSections: newCustomSections });
  };

  const handleDeleteCustomItem = (sectionIndex) => (itemIndex) => {
    const newCustomSections = [...(resumeData.customSections || [])];
    if (!newCustomSections[sectionIndex]) return;
    newCustomSections[sectionIndex].items = newCustomSections[
      sectionIndex
    ].items.filter((_, i) => i !== itemIndex);
    setResumeData({ ...resumeData, customSections: newCustomSections });
  };

  const handleDeleteCustomSection = (sectionIndex) => () => {
    const newCustomSections = (resumeData.customSections || []).filter(
      (_, i) => i !== sectionIndex
    );
    setResumeData({ ...resumeData, customSections: newCustomSections });
  };

  // Normalize customSections to use 'title' instead of 'heading'
  const normalizedCustomSections = (resumeData.customSections || []).map((section) => ({
    title: section.heading || section.title || 'Untitled Section',
    items: Array.isArray(section.items) ? section.items : [],
  }));

  // Safely access resumeData fields with fallbacks
  const safeResumeData = {
    heading: resumeData.heading || {},
    summary: resumeData.summary || JSON.stringify([{ type: 'paragraph', children: [{ text: '' }] }]),
    skills: resumeData.skills || [],
    experiences: resumeData.experiences || [],
    educations: resumeData.educations || [],
    hobbies: resumeData.hobbies || [],
    languages: resumeData.languages || [],
    personalInfo: resumeData.personalInfo || {},
    certifications: resumeData.certifications || [],
    accomplishments: resumeData.accomplishments || [],
    customSections: resumeData.customSections || [],
  };

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
        <Box sx={{ bgcolor: color, color: '#fff', p: 3, mb: mmToPx(sectionSpacing) / 96 }}>
          <SectionWrapper
            title="Heading"
            isOpen={sectionStates.heading}
            toggleSection={() => toggleSection('heading')}
          >
            <HeadingSection
              heading={safeResumeData.heading}
              setHeading={updateSection('heading')}
              color="#fff"
              fontStyle={fontStyle}
              fontSize={fontSize}
              headingSize={headingSize}
              sectionSpacing={sectionSpacing}
              paragraphSpacing={paragraphSpacing}
              lineSpacing={lineSpacing}
              sideMargin={sideMargin}
              paragraphIndent={paragraphIndent}
            />
          </SectionWrapper>
        </Box>
        <Box sx={{ p: 3 }}>
          <SectionWrapper
            title="Summary"
            isOpen={sectionStates.summary}
            toggleSection={() => toggleSection('summary')}
          >
            <SummarySection
              summary={safeResumeData.summary}
              setSummary={updateSection('summary')}
              color={color}
              fontStyle={fontStyle}
              fontSize={fontSize}
              headingSize={headingSize}
              sectionSpacing={sectionSpacing}
              paragraphSpacing={paragraphSpacing}
              lineSpacing={lineSpacing}
              sideMargin={sideMargin}
              paragraphIndent={paragraphIndent}
            />
          </SectionWrapper>
          <SectionWrapper
            title="Skills"
            isOpen={sectionStates.skills}
            toggleSection={() => toggleSection('skills')}
          >
            <SkillsSection
              skills={safeResumeData.skills}
              setSkills={updateSection('skills')}
              color={color}
              fontStyle={fontStyle}
              fontSize={fontSize}
              headingSize={headingSize}
              sectionSpacing={sectionSpacing}
              paragraphSpacing={paragraphSpacing}
              lineSpacing={lineSpacing}
              sideMargin={sideMargin}
              paragraphIndent={paragraphIndent}
            />
          </SectionWrapper>
          <SectionWrapper
            title="Experience"
            isOpen={sectionStates.experience}
            toggleSection={() => toggleSection('experience')}
          >
            <ExperienceSection
              experiences={safeResumeData.experiences}
              setExperiences={updateSection('experiences')}
              color={color}
              fontStyle={fontStyle}
              fontSize={fontSize}
              headingSize={headingSize}
              sectionSpacing={sectionSpacing}
              paragraphSpacing={paragraphSpacing}
              lineSpacing={lineSpacing}
              sideMargin={sideMargin}
              paragraphIndent={paragraphIndent}
            />
          </SectionWrapper>
          <SectionWrapper
            title="Education"
            isOpen={sectionStates.education}
            toggleSection={() => toggleSection('education')}
          >
            <EducationSection
              educations={safeResumeData.educations}
              setEducations={updateSection('educations')}
              color={color}
              fontStyle={fontStyle}
              fontSize={fontSize}
              headingSize={headingSize}
              sectionSpacing={sectionSpacing}
              paragraphSpacing={paragraphSpacing}
              lineSpacing={lineSpacing}
              sideMargin={sideMargin}
              paragraphIndent={paragraphIndent}
            />
          </SectionWrapper>
          <SectionWrapper
            title="Hobbies and Interests"
            isOpen={sectionStates.hobbies}
            toggleSection={() => toggleSection('hobbies')}
          >
            <HobbiesSection
              hobbies={safeResumeData.hobbies}
              setHobbies={updateSection('hobbies')}
              color={color}
              fontStyle={fontStyle}
              fontSize={fontSize}
              headingSize={headingSize}
              sectionSpacing={sectionSpacing}
              paragraphSpacing={paragraphSpacing}
              lineSpacing={lineSpacing}
              sideMargin={sideMargin}
              paragraphIndent={paragraphIndent}
            />
          </SectionWrapper>
          <SectionWrapper
            title="Languages"
            isOpen={sectionStates.languages}
            toggleSection={() => toggleSection('languages')}
          >
            <LanguagesSection
              languages={safeResumeData.languages}
              setLanguages={updateSection('languages')}
              color={color}
              fontStyle={fontStyle}
              fontSize={fontSize}
              headingSize={headingSize}
              sectionSpacing={sectionSpacing}
              paragraphSpacing={paragraphSpacing}
              lineSpacing={lineSpacing}
              sideMargin={sideMargin}
              paragraphIndent={paragraphIndent}
            />
          </SectionWrapper>
          <SectionWrapper
            title="Personal Information"
            isOpen={sectionStates.personalInfo}
            toggleSection={() => toggleSection('personalInfo')}
          >
            <PersonalInfoSection
              personalInfo={safeResumeData.personalInfo}
              setPersonalInfo={updateSection('personalInfo')}
              color={color}
              fontStyle={fontStyle}
              fontSize={fontSize}
              headingSize={headingSize}
              sectionSpacing={sectionSpacing}
              paragraphSpacing={paragraphSpacing}
              lineSpacing={lineSpacing}
              sideMargin={sideMargin}
              paragraphIndent={paragraphIndent}
            />
          </SectionWrapper>
          <SectionWrapper
            title="Certifications"
            isOpen={sectionStates.certifications}
            toggleSection={() => toggleSection('certifications')}
          >
            <CertificationsSection
              certifications={safeResumeData.certifications}
              setCertifications={updateSection('certifications')}
              color={color}
              fontStyle={fontStyle}
              fontSize={fontSize}
              headingSize={headingSize}
              sectionSpacing={sectionSpacing}
              paragraphSpacing={paragraphSpacing}
              lineSpacing={lineSpacing}
              sideMargin={sideMargin}
              paragraphIndent={paragraphIndent}
            />
          </SectionWrapper>
          <SectionWrapper
            title="Accomplishments"
            isOpen={sectionStates.accomplishments}
            toggleSection={() => toggleSection('accomplishments')}
          >
            <AccomplishmentsSection
              accomplishments={safeResumeData.accomplishments}
              setAccomplishments={updateSection('accomplishments')}
              color={color}
              fontStyle={fontStyle}
              fontSize={fontSize}
              headingSize={headingSize}
              sectionSpacing={sectionSpacing}
              paragraphSpacing={paragraphSpacing}
              lineSpacing={lineSpacing}
              sideMargin={sideMargin}
              paragraphIndent={paragraphIndent}
            />
          </SectionWrapper>
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
                {safeResumeData.heading.title || ''}
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
                      <Typography sx={{ fontSize, lineHeight: lineSpacing }}>{hobby || ''}</Typography>
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
                      <Typography sx={{ fontSize, lineHeight: lineSpacing }}>{acc || ''}</Typography>
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
          {normalizedCustomSections.map((section, index) => (
            <Box key={`custom-section-${index}`} sx={{ mt: mmToPx(sectionSpacing) / 96 }}>
              <SectionWrapper
                title={section.title}
                isOpen={sectionStates.customSections[index]}
                toggleSection={() => toggleSection('customSections', index)}
              >
                <CustomSection
                  section={section}
                  updateSection={(updatedSection) => {
                    const newCustomSections = [...(resumeData.customSections || [])];
                    newCustomSections[index] = { ...updatedSection, heading: updatedSection.title };
                    setResumeData({ ...resumeData, customSections: newCustomSections });
                  }}
                  addItem={handleAddCustomItem(index)}
                  deleteItem={handleDeleteCustomItem(index)}
                  deleteSection={handleDeleteCustomSection(index)}
                  color={color}
                  fontStyle={fontStyle}
                  fontSize={fontSize}
                  headingSize={headingSize}
                  sectionSpacing={sectionSpacing}
                  paragraphSpacing={paragraphSpacing}
                  lineSpacing={lineSpacing}
                  sideMargin={sideMargin}
                  paragraphIndent={paragraphIndent}
                />
              </SectionWrapper>
            </Box>
          ))}
        </Box>
      </Paper>
    </Box>
  );
}

export default ClassicTemplate;
import { Box, Typography, Paper, Grid, Divider } from '@mui/material';
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
import { renderProficiencyBars, renderCustomSections } from '../utils/resumeUtils';

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
}) {
  const mmToPx = (mm) => mm * 3.78;

  return (
    <Box sx={{ width: '75%', p: 4, overflowY: 'auto' }}>
      <Paper
        elevation={3}
        sx={{
          border: `2px solid ${color}`,
          p: 3,
          fontFamily: fontStyle,
          mx: mmToPx(sideMargin) / 96,
        }}
      >
        <Box sx={{ bgcolor: color, color: '#fff', p: 3, mb: mmToPx(sectionSpacing) / 96 }}>
          <HeadingSection heading={resumeData.heading} setResumeData={setResumeData} />
        </Box>
        <Box sx={{ p: 3 }}>
          <SummarySection summary={resumeData.summary} setResumeData={setResumeData} />
          <SkillsSection skills={resumeData.skills} setResumeData={setResumeData} />
          <ExperienceSection experiences={resumeData.experiences} setResumeData={setResumeData} />
          <EducationSection educations={resumeData.educations} setResumeData={setResumeData} />
          <HobbiesSection hobbies={resumeData.hobbies} setResumeData={setResumeData} />
          <LanguagesSection languages={resumeData.languages} setResumeData={setResumeData} />
          <PersonalInfoSection personalInfo={resumeData.personalInfo} setResumeData={setResumeData} />
          <CertificationsSection certifications={resumeData.certifications} setResumeData={setResumeData} />
          <AccomplishmentsSection accomplishments={resumeData.accomplishments} setResumeData={setResumeData} />
          <Box sx={{ mt: mmToPx(sectionSpacing) / 96, fontFamily: fontStyle }}>
            <Typography variant="h6" sx={{ fontSize: headingSize, mb: mmToPx(sectionSpacing) / 96 }}>
              Preview (Professional Template)
            </Typography>
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
                    {resumeData.heading.city}, {resumeData.heading.country} {resumeData.heading.pincode}
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
                    Phone: {resumeData.heading.phone}
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
                    Email: {resumeData.heading.email}
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
                    LinkedIn: {resumeData.heading.linkedin}
                  </Typography>
                  <Divider sx={{ my: mmToPx(sectionSpacing) / 96, bgcolor: '#fff' }} />
                  <Typography variant="h6" sx={{ fontSize: headingSize, mb: mmToPx(sectionSpacing) / 96 }}>
                    Languages
                  </Typography>
                  {resumeData.languages.map((lang, index) => (
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
                        {lang.name}
                      </Typography>
                      {renderProficiencyBars(lang.proficiency)}
                    </Box>
                  ))}
                  <Divider sx={{ my: mmToPx(sectionSpacing) / 96, bgcolor: '#fff' }} />
                  <Typography variant="h6" sx={{ fontSize: headingSize, mb: mmToPx(sectionSpacing) / 96 }}>
                    Skills
                  </Typography>
                  {resumeData.skills.map((skill, index) => (
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
                        {skill.name}
                      </Typography>
                      {renderProficiencyBars(skill.proficiency)}
                    </Box>
                  ))}
                  <Divider sx={{ my: mmToPx(sectionSpacing) / 96, bgcolor: '#fff' }} />
                  <Typography variant="h6" sx={{ fontSize: headingSize, mb: mmToPx(sectionSpacing) / 96 }}>
                    Certifications
                  </Typography>
                  {resumeData.certifications.map((cert, index) => (
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
                      {cert.name} ({cert.date})
                    </Typography>
                  ))}
                  <Divider sx={{ my: mmToPx(sectionSpacing) / 96, bgcolor: '#fff' }} />
                  <Typography variant="h6" sx={{ fontSize: headingSize, mb: mmToPx(sectionSpacing) / 96 }}>
                    Hobbies
                  </Typography>
                  {resumeData.hobbies.map((hobby, index) => (
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
                      • {hobby}
                    </Typography>
                  ))}
                </Box>
              </Grid>
              <Grid item xs={8}>
                <Box>
                  <Typography variant="h4" sx={{ fontSize: headingSize + 4, mb: mmToPx(paragraphSpacing) / 96 }}>
                    {resumeData.heading.firstName} {resumeData.heading.lastName}
                  </Typography>
                  <Typography variant="h6" sx={{ fontSize: headingSize, mb: mmToPx(sectionSpacing) / 96 }}>
                    {resumeData.heading.title}
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
                      {resumeData.summary}
                    </Typography>
                  </Box>
                  <Divider sx={{ my: mmToPx(sectionSpacing) / 96 }} />
                  <Box sx={{ mt: mmToPx(sectionSpacing) / 96 }}>
                    <Typography variant="h6" sx={{ fontSize: headingSize, mb: mmToPx(sectionSpacing) / 96 }}>
                      Experience
                    </Typography>
                    {resumeData.experiences.map((exp, index) => (
                      <Box key={index} sx={{ mb: mmToPx(paragraphSpacing) / 96 }}>
                        <Typography
                          variant="body2"
                          sx={{
                            fontSize,
                            lineHeight: lineSpacing,
                            pl: mmToPx(paragraphIndent) / 96,
                          }}
                        >
                          {exp.jobTitle}, {exp.employer}, {exp.city}
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
                          {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            fontSize,
                            lineHeight: lineSpacing,
                            pl: mmToPx(paragraphIndent) / 96,
                          }}
                        >
                          {exp.description}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                  <Divider sx={{ my: mmToPx(sectionSpacing) / 96 }} />
                  <Box sx={{ mt: mmToPx(sectionSpacing) / 96 }}>
                    <Typography variant="h6" sx={{ fontSize: headingSize, mb: mmToPx(sectionSpacing) / 96 }}>
                      Education
                    </Typography>
                    {resumeData.educations.map((edu, index) => (
                      <Box key={index} sx={{ mb: mmToPx(paragraphSpacing) / 96 }}>
                        <Typography
                          variant="body2"
                          sx={{
                            fontSize,
                            lineHeight: lineSpacing,
                            pl: mmToPx(paragraphIndent) / 96,
                          }}
                        >
                          {edu.degree}, {edu.fieldOfStudy}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            fontSize,
                            lineHeight: lineSpacing,
                            pl: mmToPx(paragraphIndent) / 96,
                          }}
                        >
                          {edu.schoolName}, {edu.schoolLocation}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            fontSize,
                            lineHeight: lineSpacing,
                            pl: mmToPx(paragraphIndent) / 96,
                          }}
                        >
                          {edu.graduationMonth} {edu.graduationYear}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                  <Divider sx={{ my: mmToPx(sectionSpacing) / 96 }} />
                  <Box sx={{ mt: mmToPx(sectionSpacing) / 96 }}>
                    <Typography variant="h6" sx={{ fontSize: headingSize, mb: mmToPx(sectionSpacing) / 96 }}>
                      Accomplishments
                    </Typography>
                    {resumeData.accomplishments.map((acc, index) => (
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
                        • {acc}
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
                      Date of Birth: {resumeData.personalInfo.dateOfBirth}
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
                      Gender: {resumeData.personalInfo.gender}
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
                      Nationality: {resumeData.personalInfo.nationality}
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
                      Marital Status: {resumeData.personalInfo.maritalStatus}
                    </Typography>
                  </Box>
                  {renderCustomSections(resumeData.customSections, fontStyle, fontSize, headingSize, sectionSpacing, paragraphIndent, lineSpacing)}
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

export default ProfessionalTemplate;
import { Box, Typography, Paper, Divider, Grid } from '@mui/material';
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
import { renderCustomSections } from '../utils/resumeUtils';

function ModernTemplate({
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
              Preview (Modern Template)
            </Typography>
            <Typography variant="h5" sx={{ fontSize: headingSize + 4, mb: mmToPx(paragraphSpacing) / 96 }}>
              {resumeData.heading.firstName} {resumeData.heading.lastName}
            </Typography>
            <Typography sx={{ fontSize, lineHeight: lineSpacing, mb: mmToPx(paragraphSpacing) / 96, pl: mmToPx(paragraphIndent) / 96 }}>
              {resumeData.heading.title}
            </Typography>
            <Typography sx={{ fontSize, lineHeight: lineSpacing, mb: mmToPx(paragraphSpacing) / 96, pl: mmToPx(paragraphIndent) / 96 }}>
              {resumeData.heading.city}, {resumeData.heading.country} | {resumeData.heading.pincode}
            </Typography>
            <Typography sx={{ fontSize, lineHeight: lineSpacing, mb: mmToPx(paragraphSpacing) / 96, pl: mmToPx(paragraphIndent) / 96 }}>
              {resumeData.heading.phone} | {resumeData.heading.email}
            </Typography>
            <Typography sx={{ fontSize, lineHeight: lineSpacing, mb: mmToPx(paragraphSpacing) / 96, pl: mmToPx(paragraphIndent) / 96 }}>
              {resumeData.heading.linkedin}
            </Typography>
            <Divider sx={{ my: mmToPx(sectionSpacing) / 96 }} />
            <Box sx={{ mt: mmToPx(sectionSpacing) / 96 }}>
              <Typography variant="h6" sx={{ fontSize: headingSize, mb: mmToPx(sectionSpacing) / 96 }}>
                Summary
              </Typography>
              <Typography sx={{ fontSize, lineHeight: lineSpacing, mb: mmToPx(paragraphSpacing) / 96, pl: mmToPx(paragraphIndent) / 96 }}>
                {resumeData.summary}
              </Typography>
            </Box>
            <Divider sx={{ my: mmToPx(sectionSpacing) / 96 }} />
            <Box sx={{ mt: mmToPx(sectionSpacing) / 96 }}>
              <Typography variant="h6" sx={{ fontSize: headingSize, mb: mmToPx(sectionSpacing) / 96 }}>
                Skills
              </Typography>
              <Grid container spacing={1}>
                {resumeData.skills.map((skill, index) => (
                  <Grid item xs={6} key={index}>
                    <Paper sx={{ p: 1, bgcolor: '#f5f5f5' }}>
                      <Typography sx={{ fontSize, lineHeight: lineSpacing, pl: mmToPx(paragraphIndent) / 96 }}>
                        {skill.name} ({skill.proficiency})
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Box>
            <Divider sx={{ my: mmToPx(sectionSpacing) / 96 }} />
            <Box sx={{ mt: mmToPx(sectionSpacing) / 96 }}>
              <Typography variant="h6" sx={{ fontSize: headingSize, mb: mmToPx(sectionSpacing) / 96 }}>
                Experience
              </Typography>
              <Grid container spacing={1}>
                {resumeData.experiences.map((exp, index) => (
                  <Grid item xs={12} key={index}>
                    <Paper sx={{ p: 1, bgcolor: '#f5f5f5' }}>
                      <Typography sx={{ fontSize, lineHeight: lineSpacing, pl: mmToPx(paragraphIndent) / 96 }}>
                        {exp.jobTitle}, {exp.employer}, {exp.city}
                      </Typography>
                      <Typography sx={{ fontSize, lineHeight: lineSpacing, pl: mmToPx(paragraphIndent) / 96, mb: mmToPx(paragraphSpacing) / 96 }}>
                        {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                      </Typography>
                      <Typography sx={{ fontSize, lineHeight: lineSpacing, pl: mmToPx(paragraphIndent) / 96 }}>
                        {exp.description}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Box>
            <Divider sx={{ my: mmToPx(sectionSpacing) / 96 }} />
            <Box sx={{ mt: mmToPx(sectionSpacing) / 96 }}>
              <Typography variant="h6" sx={{ fontSize: headingSize, mb: mmToPx(sectionSpacing) / 96 }}>
                Education
              </Typography>
              <Grid container spacing={1}>
                {resumeData.educations.map((edu, index) => (
                  <Grid item xs={12} key={index}>
                    <Paper sx={{ p: 1, bgcolor: '#f5f5f5' }}>
                      <Typography sx={{ fontSize, lineHeight: lineSpacing, pl: mmToPx(paragraphIndent) / 96 }}>
                        {edu.degree}, {edu.fieldOfStudy}
                      </Typography>
                      <Typography sx={{ fontSize, lineHeight: lineSpacing, pl: mmToPx(paragraphIndent) / 96 }}>
                        {edu.schoolName}, {edu.schoolLocation}
                      </Typography>
                      <Typography sx={{ fontSize, lineHeight: lineSpacing, pl: mmToPx(paragraphIndent) / 96 }}>
                        {edu.graduationMonth} {edu.graduationYear}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Box>
            <Divider sx={{ my: mmToPx(sectionSpacing) / 96 }} />
            <Box sx={{ mt: mmToPx(sectionSpacing) / 96 }}>
              <Typography variant="h6" sx={{ fontSize: headingSize, mb: mmToPx(sectionSpacing) / 96 }}>
                Hobbies and Interests
              </Typography>
              <Grid container spacing={1}>
                {resumeData.hobbies.map((hobby, index) => (
                  <Grid item xs={6} key={index}>
                    <Paper sx={{ p: 1, bgcolor: '#f5f5f5' }}>
                      <Typography sx={{ fontSize, lineHeight: lineSpacing, pl: mmToPx(paragraphIndent) / 96 }}>
                        {hobby}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Box>
            <Divider sx={{ my: mmToPx(sectionSpacing) / 96 }} />
            <Box sx={{ mt: mmToPx(sectionSpacing) / 96 }}>
              <Typography variant="h6" sx={{ fontSize: headingSize, mb: mmToPx(sectionSpacing) / 96 }}>
                Languages
              </Typography>
              <Grid container spacing={1}>
                {resumeData.languages.map((lang, index) => (
                  <Grid item xs={6} key={index}>
                    <Paper sx={{ p: 1, bgcolor: '#f5f5f5' }}>
                      <Typography sx={{ fontSize, lineHeight: lineSpacing, pl: mmToPx(paragraphIndent) / 96 }}>
                        {lang.name} ({lang.proficiency})
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Box>
            <Divider sx={{ my: mmToPx(sectionSpacing) / 96 }} />
            <Box sx={{ mt: mmToPx(sectionSpacing) / 96 }}>
              <Typography variant="h6" sx={{ fontSize: headingSize, mb: mmToPx(sectionSpacing) / 96 }}>
                Certifications
              </Typography>
              <Grid container spacing={1}>
                {resumeData.certifications.map((cert, index) => (
                  <Grid item xs={6} key={index}>
                    <Paper sx={{ p: 1, bgcolor: '#f5f5f5' }}>
                      <Typography sx={{ fontSize, lineHeight: lineSpacing, pl: mmToPx(paragraphIndent) / 96 }}>
                        {cert.name} ({cert.date})
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Box>
            <Divider sx={{ my: mmToPx(sectionSpacing) / 96 }} />
            <Box sx={{ mt: mmToPx(sectionSpacing) / 96 }}>
              <Typography variant="h6" sx={{ fontSize: headingSize, mb: mmToPx(sectionSpacing) / 96 }}>
                Accomplishments
              </Typography>
              <Grid container spacing={1}>
                {resumeData.accomplishments.map((acc, index) => (
                  <Grid item xs={12} key={index}>
                    <Paper sx={{ p: 1, bgcolor: '#f5f5f5' }}>
                      <Typography sx={{ fontSize, lineHeight: lineSpacing, pl: mmToPx(paragraphIndent) / 96 }}>
                        {acc}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Box>
            <Divider sx={{ my: mmToPx(sectionSpacing) / 96 }} />
            <Box sx={{ mt: mmToPx(sectionSpacing) / 96 }}>
              <Typography variant="h6" sx={{ fontSize: headingSize, mb: mmToPx(sectionSpacing) / 96 }}>
                Personal Information
              </Typography>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <Paper sx={{ p: 1, bgcolor: '#f5f5f5' }}>
                    <Typography sx={{ fontSize, lineHeight: lineSpacing, pl: mmToPx(paragraphIndent) / 96 }}>
                      Date of Birth: {resumeData.personalInfo.dateOfBirth}
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper sx={{ p: 1, bgcolor: '#f5f5f5' }}>
                    <Typography sx={{ fontSize, lineHeight: lineSpacing, pl: mmToPx(paragraphIndent) / 96 }}>
                      Gender: {resumeData.personalInfo.gender}
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper sx={{ p: 1, bgcolor: '#f5f5f5' }}>
                    <Typography sx={{ fontSize, lineHeight: lineSpacing, pl: mmToPx(paragraphIndent) / 96 }}>
                      Nationality: {resumeData.personalInfo.nationality}
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper sx={{ p: 1, bgcolor: '#f5f5f5' }}>
                    <Typography sx={{ fontSize, lineHeight: lineSpacing, pl: mmToPx(paragraphIndent) / 96 }}>
                      Marital Status: {resumeData.personalInfo.maritalStatus}
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            </Box>
            {renderCustomSections(resumeData.customSections, fontStyle, fontSize, headingSize, sectionSpacing, paragraphIndent, lineSpacing)}
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

export default ModernTemplate;
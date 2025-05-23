import { Box, Typography, Paper, Grid, Divider, List, ListItem } from '@mui/material';
import HeadingSection from '../component/edit/HeadingSection';
import SummarySection from '../component/edit/SummarySection';
import SkillsSection from '../component/edit/SkillsSection';
import ExperienceSection from '../component/edit/ExperienceSection';
import EducationSection from '../component/edit/EducationSection';
import HobbiesSection from '../component/edit/HobbiesSection';
import LanguagesSection from '../component/edit/LanguagesSection';
import PersonalInfoSection from '../component/edit/PersonalInfoSection';
import CertificationsSection from '../component/edit/CertificationsSection';
import AccomplishmentsSection from '../component/edit/AccomplishmentsSection';

function ResumePreview({
  template,
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
  const renderProficiencyBars = (proficiency) => {
    const totalBars = 3;
    const filled = proficiency === 'Excellent' ? 3 : proficiency === 'Good' ? 2 : 1;
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        {[...Array(totalBars)].map((_, i) => (
          <Box
            key={i}
            sx={{
              width: 10,
              height: 4,
              backgroundColor: i < filled ? '#fff' : '#d3d3d3',
            }}
          />
        ))}
      </Box>
    );
  };

  // Convert mm to px (assuming 1mm ≈ 3.78px at 96 DPI)
  const mmToPx = (mm) => mm * 3.78;

  return (
    <Box sx={{ width: '75%', p: 4, overflowY: 'auto' }}>
      <Paper
        elevation={3}
        sx={{
          border: `2px solid ${color}`,
          p: 3,
          fontFamily: fontStyle,
          mx: mmToPx(sideMargin) / 96, // Convert mm to inches (96 DPI)
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
          {template === 'template1' ? (
            <Box sx={{ mt: mmToPx(sectionSpacing) / 96, fontFamily: fontStyle }}>
              <Typography variant="h6" sx={{ fontSize: headingSize, mb: mmToPx(sectionSpacing) / 96 }}>
                Preview (Classic Template)
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
                <List>
                  {resumeData.skills.map((skill, index) => (
                    <ListItem key={index} sx={{ py: mmToPx(paragraphSpacing) / 96 / 2, pl: mmToPx(paragraphIndent) / 96 }}>
                      <Typography sx={{ fontSize, lineHeight: lineSpacing }}>
                        {skill.name} ({skill.proficiency})
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
                {resumeData.experiences.map((exp, index) => (
                  <Box key={index} sx={{ mb: mmToPx(paragraphSpacing) / 96 }}>
                    <Typography sx={{ fontSize, lineHeight: lineSpacing, pl: mmToPx(paragraphIndent) / 96 }}>
                      {exp.jobTitle}, {exp.employer}, {exp.city}
                    </Typography>
                    <Typography sx={{ fontSize, lineHeight: lineSpacing, pl: mmToPx(paragraphIndent) / 96, mb: mmToPx(paragraphSpacing) / 96 }}>
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </Typography>
                    <Typography sx={{ fontSize, lineHeight: lineSpacing, pl: mmToPx(paragraphIndent) / 96 }}>
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
                    <Typography sx={{ fontSize, lineHeight: lineSpacing, pl: mmToPx(paragraphIndent) / 96 }}>
                      {edu.degree}, {edu.fieldOfStudy}
                    </Typography>
                    <Typography sx={{ fontSize, lineHeight: lineSpacing, pl: mmToPx(paragraphIndent) / 96 }}>
                      {edu.schoolName}, {edu.schoolLocation}
                    </Typography>
                    <Typography sx={{ fontSize, lineHeight: lineSpacing, pl: mmToPx(paragraphIndent) / 96 }}>
                      {edu.graduationMonth} {edu.graduationYear}
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
                  {resumeData.hobbies.map((hobby, index) => (
                    <ListItem key={index} sx={{ py: mmToPx(paragraphSpacing) / 96 / 2, pl: mmToPx(paragraphIndent) / 96 }}>
                      <Typography sx={{ fontSize, lineHeight: lineSpacing }}>{hobby}</Typography>
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
                  {resumeData.languages.map((lang, index) => (
                    <ListItem key={index} sx={{ py: mmToPx(paragraphSpacing) / 96 / 2, pl: mmToPx(paragraphIndent) / 96 }}>
                      <Typography sx={{ fontSize, lineHeight: lineSpacing }}>
                        {lang.name} ({lang.proficiency})
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
                  {resumeData.certifications.map((cert, index) => (
                    <ListItem key={index} sx={{ py: mmToPx(paragraphSpacing) / 96 / 2, pl: mmToPx(paragraphIndent) / 96 }}>
                      <Typography sx={{ fontSize, lineHeight: lineSpacing }}>
                        {cert.name} ({cert.date})
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
                  {resumeData.accomplishments.map((acc, index) => (
                    <ListItem key={index} sx={{ py: mmToPx(paragraphSpacing) / 96 / 2, pl: mmToPx(paragraphIndent) / 96 }}>
                      <Typography sx={{ fontSize, lineHeight: lineSpacing }}>{acc}</Typography>
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
                  Date of Birth: {resumeData.personalInfo.dateOfBirth}
                </Typography>
                <Typography sx={{ fontSize, lineHeight: lineSpacing, mb: mmToPx(paragraphSpacing) / 96, pl: mmToPx(paragraphIndent) / 96 }}>
                  Gender: {resumeData.personalInfo.gender}
                </Typography>
                <Typography sx={{ fontSize, lineHeight: lineSpacing, mb: mmToPx(paragraphSpacing) / 96, pl: mmToPx(paragraphIndent) / 96 }}>
                  Nationality: {resumeData.personalInfo.nationality}
                </Typography>
                <Typography sx={{ fontSize, lineHeight: lineSpacing, mb: mmToPx(paragraphSpacing) / 96, pl: mmToPx(paragraphIndent) / 96 }}>
                  Marital Status: {resumeData.personalInfo.maritalStatus}
                </Typography>
              </Box>
            </Box>
          ) : template === 'template2' ? (
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
            </Box>
          ) : (
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
                    <Typography variant="h4" sx={{ fontSize: headingSize + 4, mb: mmToPx(sectionSpacing) / 96 }}>
                      {resumeData.heading.firstName} {resumeData.heading.lastName}
                    </Typography>
                    <Typography variant="h6" sx={{ fontSize: headingSize, mb: mmToPx(sectionSpacing) / 96 }}>
                      {resumeData.heading.title}
                    </Typography>
                    <Divider sx={{ my: mmToPx(sectionSpacing) / 96 }} />
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
                    <Divider sx={{ my: mmToPx(sectionSpacing) / 96 }} />
                    <Typography variant="h6" sx={{ fontSize: headingSize, mb: mmToPx(sectionSpacing) / 96 }}>
                      Experience
                    </Typography>
                    {resumeData.experiences.map((exp, index) => (
                      <Box key={index} sx={{ mb: mmToPx(paragraphSpacing) / 96 }}>
                        <Typography
                          variant="subtitle1"
                          sx={{
                            fontSize,
                            lineHeight: lineSpacing,
                            pl: mmToPx(paragraphIndent) / 96,
                          }}
                        >
                          {exp.jobTitle}, {exp.employer}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          sx={{
                            fontSize,
                            lineHeight: lineSpacing,
                            mb: mmToPx(paragraphSpacing) / 96,
                            pl: mmToPx(paragraphIndent) / 96,
                          }}
                        >
                          {exp.city} | {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
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
                    <Divider sx={{ my: mmToPx(sectionSpacing) / 96 }} />
                    <Typography variant="h6" sx={{ fontSize: headingSize, mb: mmToPx(sectionSpacing) / 96 }}>
                      Education
                    </Typography>
                    {resumeData.educations.map((edu, index) => (
                      <Box key={index} sx={{ mb: mmToPx(paragraphSpacing) / 96 }}>
                        <Typography
                          variant="subtitle1"
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
                          color="textSecondary"
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
                    <Divider sx={{ my: mmToPx(sectionSpacing) / 96 }} />
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
                </Grid>
              </Grid>
            </Box>
          )}
        </Box>
      </Paper>
    </Box>
  );
}

export default ResumePreview;
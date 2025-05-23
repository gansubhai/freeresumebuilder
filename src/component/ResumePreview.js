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

function ResumePreview({ template, resumeData, setResumeData, color }) {
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

  return (
    <Box sx={{ width: '75%', p: 4, overflowY: 'auto' }}>
      <Paper elevation={3} sx={{ border: `2px solid ${color}`, p: 3 }}>
        <Box sx={{ bgcolor: color, color: '#fff', p: 3, mb: 3 }}>
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
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" gutterBottom>
                Preview (Classic Template)
              </Typography>
              <Typography variant="h5" gutterBottom>
                {resumeData.heading.firstName} {resumeData.heading.lastName}
              </Typography>
              <Typography>{resumeData.heading.title}</Typography>
              <Typography>
                {resumeData.heading.city}, {resumeData.heading.country} | {resumeData.heading.pincode}
              </Typography>
              <Typography>{resumeData.heading.phone} | {resumeData.heading.email}</Typography>
              <Typography>{resumeData.heading.linkedin}</Typography>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ mt: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Summary
                </Typography>
                <Typography>{resumeData.summary}</Typography>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ mt: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Skills
                </Typography>
                <List>
                  {resumeData.skills.map((skill, index) => (
                    <ListItem key={index}>
                      {skill.name} ({skill.proficiency})
                    </ListItem>
                  ))}
                </List>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ mt: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Experience
                </Typography>
                {resumeData.experiences.map((exp, index) => (
                  <Box key={index} sx={{ mb: 1 }}>
                    <Typography variant="subtitle1">
                      {exp.jobTitle}, {exp.employer}, {exp.city}
                    </Typography>
                    <Typography>
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </Typography>
                    <Typography>{exp.description}</Typography>
                  </Box>
                ))}
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ mt: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Education
                </Typography>
                {resumeData.educations.map((edu, index) => (
                  <Box key={index} sx={{ mb: 1 }}>
                    <Typography variant="subtitle1">
                      {edu.degree}, {edu.fieldOfStudy}
                    </Typography>
                    <Typography>
                      {edu.schoolName}, {edu.schoolLocation}
                    </Typography>
                    <Typography>
                      {edu.graduationMonth} {edu.graduationYear}
                    </Typography>
                  </Box>
                ))}
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ mt: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Hobbies and Interests
                </Typography>
                <List>
                  {resumeData.hobbies.map((hobby, index) => (
                    <ListItem key={index}>{hobby}</ListItem>
                  ))}
                </List>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ mt: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Languages
                </Typography>
                <List>
                  {resumeData.languages.map((lang, index) => (
                    <ListItem key={index}>
                      {lang.name} ({lang.proficiency})
                    </ListItem>
                  ))}
                </List>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ mt: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Certifications
                </Typography>
                <List>
                  {resumeData.certifications.map((cert, index) => (
                    <ListItem key={index}>
                      {cert.name} ({cert.date})
                    </ListItem>
                  ))}
                </List>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ mt: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Accomplishments
                </Typography>
                <List>
                  {resumeData.accomplishments.map((acc, index) => (
                    <ListItem key={index}>{acc}</ListItem>
                  ))}
                </List>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ mt: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Personal Information
                </Typography>
                <Typography>Date of Birth: {resumeData.personalInfo.dateOfBirth}</Typography>
                <Typography>Gender: {resumeData.personalInfo.gender}</Typography>
                <Typography>Nationality: {resumeData.personalInfo.nationality}</Typography>
                <Typography>Marital Status: {resumeData.personalInfo.maritalStatus}</Typography>
              </Box>
            </Box>
          ) : template === 'template2' ? (
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" gutterBottom>
                Preview (Modern Template)
              </Typography>
              <Typography variant="h5" gutterBottom>
                {resumeData.heading.firstName} {resumeData.heading.lastName}
              </Typography>
              <Typography>{resumeData.heading.title}</Typography>
              <Typography>
                {resumeData.heading.city}, {resumeData.heading.country} | {resumeData.heading.pincode}
              </Typography>
              <Typography>{resumeData.heading.phone} | {resumeData.heading.email}</Typography>
              <Typography>{resumeData.heading.linkedin}</Typography>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ mt: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Summary
                </Typography>
                <Typography>{resumeData.summary}</Typography>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ mt: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Skills
                </Typography>
                <Grid container spacing={1}>
                  {resumeData.skills.map((skill, index) => (
                    <Grid item xs={6} key={index}>
                      <Paper sx={{ p: 1, bgcolor: '#f5f5f5' }}>
                        {skill.name} ({skill.proficiency})
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ mt: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Experience
                </Typography>
                <Grid container spacing={1}>
                  {resumeData.experiences.map((exp, index) => (
                    <Grid item xs={12} key={index}>
                      <Paper sx={{ p: 1, bgcolor: '#f5f5f5' }}>
                        <Typography variant="subtitle1">
                          {exp.jobTitle}, {exp.employer}, {exp.city}
                        </Typography>
                        <Typography>
                          {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                        </Typography>
                        <Typography>{exp.description}</Typography>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ mt: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Education
                </Typography>
                <Grid container spacing={1}>
                  {resumeData.educations.map((edu, index) => (
                    <Grid item xs={12} key={index}>
                      <Paper sx={{ p: 1, bgcolor: '#f5f5f5' }}>
                        <Typography variant="subtitle1">
                          {edu.degree}, {edu.fieldOfStudy}
                        </Typography>
                        <Typography>
                          {edu.schoolName}, {edu.schoolLocation}
                        </Typography>
                        <Typography>
                          {edu.graduationMonth} {edu.graduationYear}
                        </Typography>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ mt: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Hobbies and Interests
                </Typography>
                <Grid container spacing={1}>
                  {resumeData.hobbies.map((hobby, index) => (
                    <Grid item xs={6} key={index}>
                      <Paper sx={{ p: 1, bgcolor: '#f5f5f5' }}>{hobby}</Paper>
                    </Grid>
                  ))}
                </Grid>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ mt: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Languages
                </Typography>
                <Grid container spacing={1}>
                  {resumeData.languages.map((lang, index) => (
                    <Grid item xs={6} key={index}>
                      <Paper sx={{ p: 1, bgcolor: '#f5f5f5' }}>
                        {lang.name} ({lang.proficiency})
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ mt: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Certifications
                </Typography>
                <Grid container spacing={1}>
                  {resumeData.certifications.map((cert, index) => (
                    <Grid item xs={6} key={index}>
                      <Paper sx={{ p: 1, bgcolor: '#f5f5f5' }}>
                        {cert.name} ({cert.date})
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ mt: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Accomplishments
                </Typography>
                <Grid container spacing={1}>
                  {resumeData.accomplishments.map((acc, index) => (
                    <Grid item xs={12} key={index}>
                      <Paper sx={{ p: 1, bgcolor: '#f5f5f5' }}>{acc}</Paper>
                    </Grid>
                  ))}
                </Grid>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ mt: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Personal Information
                </Typography>
                <Grid container spacing={1}>
                  <Grid item xs={6}>
                    <Paper sx={{ p: 1, bgcolor: '#f5f5f5' }}>
                      Date of Birth: {resumeData.personalInfo.dateOfBirth}
                    </Paper>
                  </Grid>
                  <Grid item xs={6}>
                    <Paper sx={{ p: 1, bgcolor: '#f5f5f5' }}>
                      Gender: {resumeData.personalInfo.gender}
                    </Paper>
                  </Grid>
                  <Grid item xs={6}>
                    <Paper sx={{ p: 1, bgcolor: '#f5f5f5' }}>
                      Nationality: {resumeData.personalInfo.nationality}
                    </Paper>
                  </Grid>
                  <Grid item xs={6}>
                    <Paper sx={{ p: 1, bgcolor: '#f5f5f5' }}>
                      Marital Status: {resumeData.personalInfo.maritalStatus}
                    </Paper>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          ) : (
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" gutterBottom>
                Preview (Professional Template)
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={4} sx={{ bgcolor: color, color: '#fff', p: 2 }}>
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      Contact
                    </Typography>
                    <Typography variant="body2">
                      {resumeData.heading.city}, {resumeData.heading.country} {resumeData.heading.pincode}
                    </Typography>
                    <Typography variant="body2">Phone: {resumeData.heading.phone}</Typography>
                    <Typography variant="body2">Email: {resumeData.heading.email}</Typography>
                    <Typography variant="body2" sx={{ color: '#fff', textDecoration: 'underline' }}>
                      LinkedIn: {resumeData.heading.linkedin}
                    </Typography>
                    <Divider sx={{ my: 2, bgcolor: '#fff' }} />
                    <Typography variant="h6" gutterBottom>
                      Languages
                    </Typography>
                    {resumeData.languages.map((lang, index) => (
                      <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2">{lang.name}</Typography>
                        {renderProficiencyBars(lang.proficiency)}
                      </Box>
                    ))}
                    <Divider sx={{ my: 2, bgcolor: '#fff' }} />
                    <Typography variant="h6" gutterBottom>
                      Skills
                    </Typography>
                    {resumeData.skills.map((skill, index) => (
                      <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2">{skill.name}</Typography>
                        {renderProficiencyBars(skill.proficiency)}
                      </Box>
                    ))}
                    <Divider sx={{ my: 2, bgcolor: '#fff' }} />
                    <Typography variant="h6" gutterBottom>
                      Certifications
                    </Typography>
                    {resumeData.certifications.map((cert, index) => (
                      <Typography key={index} variant="body2">
                        {cert.name} ({cert.date})
                      </Typography>
                    ))}
                    <Divider sx={{ my: 2, bgcolor: '#fff' }} />
                    <Typography variant="h6" gutterBottom>
                      Hobbies
                    </Typography>
                    {resumeData.hobbies.map((hobby, index) => (
                      <Typography key={index} variant="body2">
                        • {hobby}
                      </Typography>
                    ))}
                  </Box>
                </Grid>
                <Grid item xs={8}>
                  <Box>
                    <Typography variant="h4" gutterBottom>
                      {resumeData.heading.firstName} {resumeData.heading.lastName}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                      {resumeData.heading.title}
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="h6" gutterBottom>
                      Summary
                    </Typography>
                    <Typography variant="body2">{resumeData.summary}</Typography>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="h6" gutterBottom>
                      Experience
                    </Typography>
                    {resumeData.experiences.map((exp, index) => (
                      <Box key={index} sx={{ mb: 2 }}>
                        <Typography variant="subtitle1">
                          {exp.jobTitle}, {exp.employer}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {exp.city} | {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                        </Typography>
                        <Typography variant="body2">{exp.description}</Typography>
                      </Box>
                    ))}
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="h6" gutterBottom>
                      Education
                    </Typography>
                    {resumeData.educations.map((edu, index) => (
                      <Box key={index} sx={{ mb: 2 }}>
                        <Typography variant="subtitle1">
                          {edu.degree}, {edu.fieldOfStudy}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {edu.schoolName}, {edu.schoolLocation}
                        </Typography>
                        <Typography variant="body2">
                          {edu.graduationMonth} {edu.graduationYear}
                        </Typography>
                      </Box>
                    ))}
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="h6" gutterBottom>
                      Accomplishments
                    </Typography>
                    {resumeData.accomplishments.map((acc, index) => (
                      <Typography key={index} variant="body2">
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
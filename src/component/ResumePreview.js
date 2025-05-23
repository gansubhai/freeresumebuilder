import { Box, Typography, Paper, List, ListItem, Grid, Divider } from '@mui/material';
import HeadingSection from '../component/edit/HeadingSection';
import SummarySection from '../component/edit/SummarySection';
import SkillsSection from '../component/edit/SkillsSection';
import ExperienceSection from '../component/edit/ExperienceSection';
import EducationSection from '../component/edit/EducationSection';
import HobbiesSection from '../component/edit/HobbiesSection';
import LanguagesSection from '../component/edit/LanguagesSection';
import PersonalInfoSection from '../component/edit/PersonalInfoSection';

function ResumePreview({ template, resumeData, setResumeData, color }) {
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
          {template === 'template1' ? (
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" gutterBottom>
                Preview (Classic Template)
              </Typography>
              <Typography variant="h5" gutterBottom>
                {resumeData.heading.firstName} {resumeData.heading.lastName}
              </Typography>
              <Typography>
                {resumeData.heading.city}, {resumeData.heading.country} | {resumeData.heading.pincode}
              </Typography>
              <Typography>{resumeData.heading.phone} | {resumeData.heading.email}</Typography>
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
                    <ListItem key={index}>{skill}</ListItem>
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
                      {exp.jobTitle} at {exp.employer}, {exp.city}
                    </Typography>
                    <Typography>
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </Typography>
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
                  {resumeData.languages.map((language, index) => (
                    <ListItem key={index}>{language}</ListItem>
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
          ) : (
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" gutterBottom>
                Preview (Modern Template)
              </Typography>
              <Typography variant="h5" gutterBottom>
                {resumeData.heading.firstName} {resumeData.heading.lastName}
              </Typography>
              <Typography>
                {resumeData.heading.city}, {resumeData.heading.country} | {resumeData.heading.pincode}
              </Typography>
              <Typography>{resumeData.heading.phone} | {resumeData.heading.email}</Typography>
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
                      <Paper sx={{ p: 1, bgcolor: '#f5f5f5' }}>{skill}</Paper>
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
                          {exp.jobTitle} at {exp.employer}, {exp.city}
                        </Typography>
                        <Typography>
                          {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                        </Typography>
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
                  {resumeData.languages.map((language, index) => (
                    <Grid item xs={6} key={index}>
                      <Paper sx={{ p: 1, bgcolor: '#f5f5f5' }}>{language}</Paper>
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
          )}
        </Box>
      </Paper>
    </Box>
  );
}

export default ResumePreview;
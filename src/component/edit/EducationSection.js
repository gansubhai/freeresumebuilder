import { Box, Typography, Button, Grid } from '@mui/material';
import EditableSection from '../EditableSection';
import { useState, useEffect } from 'react';

function EducationSection({ educations, setResumeData }) {
  const [expanded, setExpanded] = useState(educations.length > 0 ? 0 : null);

  useEffect(() => {
    if (educations.length === 0) {
      setResumeData((prev) => ({
        ...prev,
        educations: [
          {
            schoolName: '',
            schoolLocation: '',
            degree: '',
            fieldOfStudy: '',
            graduationMonth: '',
            graduationYear: '',
          },
        ],
      }));
      setExpanded(0);
    }
  }, [educations.length, setResumeData]);

  const addEducation = () => {
    const newIndex = educations.length;
    setResumeData((prev) => ({
      ...prev,
      educations: [
        ...prev.educations,
        {
          schoolName: '',
          schoolLocation: '',
          degree: '',
          fieldOfStudy: '',
          graduationMonth: '',
          graduationYear: '',
        },
      ],
    }));
    setExpanded(newIndex);
  };

  const updateEducation = (index, field, value) => {
    setResumeData((prev) => {
      const newEducations = [...prev.educations];
      newEducations[index] = { ...newEducations[index], [field]: value };
      return { ...prev, educations: newEducations };
    });
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Education
      </Typography>
      {educations.map((edu, index) => (
        <Box key={index} sx={{ mb: 2, p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
          <Typography
            variant="subtitle1"
            onClick={() => setExpanded(expanded === index ? null : index)}
            sx={{ cursor: 'pointer', mb: 1 }}
          >
            {edu.schoolName || `Education ${index + 1}`}
          </Typography>
          {expanded === index && (
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <EditableSection
                  label="School Name"
                  value={edu.schoolName}
                  onChange={(value) => updateEducation(index, 'schoolName', value)}
                />
              </Grid>
              <Grid item xs={6}>
                <EditableSection
                  label="School Location"
                  value={edu.schoolLocation}
                  onChange={(value) => updateEducation(index, 'schoolLocation', value)}
                />
              </Grid>
              <Grid item xs={6}>
                <EditableSection
                  label="Degree"
                  value={edu.degree}
                  onChange={(value) => updateEducation(index, 'degree', value)}
                />
              </Grid>
              <Grid item xs={6}>
                <EditableSection
                  label="Field of Study"
                  value={edu.fieldOfStudy}
                  onChange={(value) => updateEducation(index, 'fieldOfStudy', value)}
                />
              </Grid>
              <Grid item xs={6}>
                <EditableSection
                  label="Graduation Month"
                  value={edu.graduationMonth}
                  onChange={(value) => updateEducation(index, 'graduationMonth', value)}
                />
              </Grid>
              <Grid item xs={6}>
                <EditableSection
                  label="Graduation Year"
                  value={edu.graduationYear}
                  onChange={(value) => updateEducation(index, 'graduationYear', value)}
                />
              </Grid>
            </Grid>
          )}
        </Box>
      ))}
      <Button variant="contained" onClick={addEducation}>
        Add Education
      </Button>
    </Box>
  );
}

export default EducationSection;
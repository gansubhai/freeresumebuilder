import { Box, Typography, Button, Grid, IconButton } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import EditableSection from '../EditableSection';
import { useState, useEffect } from 'react';

function EducationSection({ educations, setResumeData }) {
  const [expanded, setExpanded] = useState(educations.length > 0 ? 0 : null);

  // Debug: Log educations prop
  useEffect(() => {
    console.log('Educations prop:', educations);
  }, [educations]);

  // Ensure one education entry
  useEffect(() => {
    if (educations.length === 0) {
      setResumeData((prev) => {
        console.log('Adding initial education');
        return {
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
        };
      });
      setExpanded(0);
    }
  }, [educations.length, setResumeData]);

  const addEducation = () => {
    const newEducation = {
      schoolName: '',
      schoolLocation: '',
      degree: '',
      fieldOfStudy: '',
      graduationMonth: '',
      graduationYear: '',
    };
    setResumeData((prev) => {
      const updatedEducations = [...(prev.educations || []), newEducation];
      console.log('Added education:', updatedEducations);
      return { ...prev, educations: updatedEducations };
    });
    setExpanded(educations.length);
  };

  const deleteEducation = (index) => {
    if (educations.length <= 1) return;
    setResumeData((prev) => {
      const updatedEducations = prev.educations.filter((_, i) => i !== index);
      console.log('Deleted education:', updatedEducations);
      return { ...prev, educations: updatedEducations };
    });
    setExpanded((prev) => {
      if (prev === index) return null;
      if (prev > index) return prev - 1;
      return prev;
    });
  };

  const updateEducation = (index, field, value) => {
    setResumeData((prev) => {
      const newEducations = [...prev.educations];
      newEducations[index] = { ...newEducations[index], [field]: value };
      console.log('Updated education:', newEducations);
      return { ...prev, educations: newEducations };
    });
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Education
      </Typography>
      {educations.map((edu, index) => (
        <Box
          key={index}
          sx={{ mb: 2, p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography
              variant="h6"
              onClick={() => setExpanded(expanded === index ? null : index)}
              sx={{ cursor: 'pointer', mb: 1 }}
            >
              {edu.schoolName || `Education ${index + 1}`}
            </Typography>
            <IconButton
              onClick={() => deleteEducation(index)}
              disabled={educations.length <= 1}
              aria-label="Delete education"
              size="small"
            >
              <DeleteIcon />
            </IconButton>
          </Box>
          {expanded === index && (
            <>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <EditableSection
                    label="School Name"
                    value={edu.schoolName || ''}
                    onChange={(value) => updateEducation(index, 'schoolName', value)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <EditableSection
                    label="School Location"
                    value={edu.schoolLocation || ''}
                    onChange={(value) => updateEducation(index, 'schoolLocation', value)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <EditableSection
                    label="Degree"
                    value={edu.degree || ''}
                    onChange={(value) => updateEducation(index, 'degree', value)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <EditableSection
                    label="Field of Study"
                    value={edu.fieldOfStudy || ''}
                    onChange={(value) => updateEducation(index, 'fieldOfStudy', value)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <EditableSection
                    label="Graduation Month"
                    value={edu.graduationMonth || ''}
                    onChange={(value) => updateEducation(index, 'graduationMonth', value)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <EditableSection
                    label="Graduation Year"
                    value={edu.graduationYear || ''}
                    onChange={(value) => updateEducation(index, 'graduationYear', value)}
                  />
                </Grid>
              </Grid>
            </>
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
import { Box, Typography, Button, Grid, Checkbox, FormControlLabel } from '@mui/material';
import EditableSection from '../EditableSection';
import { useState, useEffect } from 'react';

function ExperienceSection({ experiences, setResumeData }) {
  const [expanded, setExpanded] = useState(experiences.length > 0 ? 0 : null);

  useEffect(() => {
    if (experiences.length === 0) {
      setResumeData((prev) => ({
        ...prev,
        experiences: [
          {
            jobTitle: '',
            employer: '',
            city: '',
            startDate: '',
            endDate: '',
            current: false,
          },
        ],
      }));
      setExpanded(0);
    }
  }, [experiences.length, setResumeData]);

  const addExperience = () => {
    const newIndex = experiences.length;
    setResumeData((prev) => ({
      ...prev,
      experiences: [
        ...prev.experiences,
        {
          jobTitle: '',
          employer: '',
          city: '',
          startDate: '',
          endDate: '',
          current: false,
        },
      ],
    }));
    setExpanded(newIndex);
  };

  const updateExperience = (index, field, value) => {
    setResumeData((prev) => {
      const newExperiences = [...prev.experiences];
      newExperiences[index] = { ...newExperiences[index], [field]: value };
      return { ...prev, experiences: newExperiences };
    });
  };

  const toggleCurrent = (index) => {
    setResumeData((prev) => {
      const newExperiences = [...prev.experiences];
      newExperiences[index] = {
        ...newExperiences[index],
        current: !newExperiences[index].current,
        endDate: newExperiences[index].current ? '' : newExperiences[index].endDate,
      };
      return { ...prev, experiences: newExperiences };
    });
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Experience
      </Typography>
      {experiences.map((exp, index) => (
        <Box key={index} sx={{ mb: 2, p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
          <Typography
            variant="subtitle1"
            onClick={() => setExpanded(expanded === index ? null : index)}
            sx={{ cursor: 'pointer', mb: 1 }}
          >
            {exp.jobTitle || `Experience ${index + 1}`}
          </Typography>
          {expanded === index && (
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <EditableSection
                  label="Job Title"
                  value={exp.jobTitle}
                  onChange={(value) => updateExperience(index, 'jobTitle', value)}
                />
              </Grid>
              <Grid item xs={6}>
                <EditableSection
                  label="Employer"
                  value={exp.employer}
                  onChange={(value) => updateExperience(index, 'employer', value)}
                />
              </Grid>
              <Grid item xs={6}>
                <EditableSection
                  label="City"
                  value={exp.city}
                  onChange={(value) => updateExperience(index, 'city', value)}
                />
              </Grid>
              <Grid item xs={6}>
                <EditableSection
                  label="Start Date"
                  value={exp.startDate}
                  onChange={(value) => updateExperience(index, 'startDate', value)}
                  type="month"
                />
              </Grid>
              <Grid item xs={6}>
                <EditableSection
                  label="End Date"
                  value={exp.endDate}
                  onChange={(value) => updateExperience(index, 'endDate', value)}
                  type="month"
                  disabled={exp.current}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={exp.current}
                      onChange={() => toggleCurrent(index)}
                    />
                  }
                  label="I currently work here"
                />
              </Grid>
            </Grid>
          )}
        </Box>
      ))}
      <Button variant="contained" onClick={addExperience}>
        Add Experience
      </Button>
    </Box>
  );
}

export default ExperienceSection;
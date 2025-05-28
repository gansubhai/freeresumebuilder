import { Box, Typography, Button, Grid, Checkbox, FormControlLabel } from '@mui/material';
import EditableSection from '../EditableSection';
import RichTextEditor from './RichTextEditor';
import { useState, useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

function ExperienceSection({
  experiences,
  setResumeData,
  fontStyle,
  fontSize,
  color,
  lineSpacing,
  sideMargin,
}) {
  const [expanded, setExpanded] = useState(experiences.length > 0 ? 0 : null);

  useEffect(() => {
    // Migrate existing experiences to include description
    if (experiences.some((exp) => !exp.description)) {
      setResumeData((prev) => ({
        ...prev,
        experiences: prev.experiences.map((exp) => ({
          ...exp,
          description: exp.description || JSON.stringify([{ type: 'paragraph', children: [{ text: '' }] }]),
        })),
      }));
    }
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
            description: JSON.stringify([{ type: 'paragraph', children: [{ text: '' }] }]),
          },
        ],
      }));
      setExpanded(0);
    }
  }, [experiences, setResumeData]);

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
          description: JSON.stringify([{ type: 'paragraph', children: [{ text: '' }] }]),
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

  const deleteExperience = (index) => {
    if (experiences.length <= 1) return; // Prevent deleting the last experience
    setResumeData((prev) => {
      const newExperiences = prev.experiences.filter((_, i) => i !== index);
      return { ...prev, experiences: newExperiences };
    });
    setExpanded((prev) => {
      if (prev === index) return null; // Close if deleted experience was expanded
      if (prev > index) return prev - 1; // Adjust index if higher
      return prev;
    });
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h6" gutterBottom sx={{ color }}>
        Experience
      </Typography>
      {experiences.map((exp, index) => (
        <Box key={index} sx={{ mb: 2, p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography
              variant="subtitle1"
              onClick={() => setExpanded(expanded === index ? null : index)}
              sx={{ cursor: 'pointer', mb: 1, color }}
            >
              {exp.jobTitle || `Experience ${index + 1}`}
            </Typography>
            <Button
              variant="outlined"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={() => deleteExperience(index)}
              disabled={experiences.length <= 1}
              size="small"
              sx={{ borderRadius: '20px' }}
            >
              Delete
            </Button>
          </Box>
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
              <Grid item xs={12} sx={{ mt: 2 }}>
                <Typography variant="body1" gutterBottom sx={{ color }}>
                  Job Description
                </Typography>
                <RichTextEditor
                  value={exp.description}
                  onChange={(value) => updateExperience(index, 'description', value)}
                  fontStyle={fontStyle}
                  fontSize={fontSize}
                  color={color}
                  lineSpacing={lineSpacing}
                  sideMargin={sideMargin}
                  placeholder="Enter job description..."
                />
              </Grid>
            </Grid>
          )}
        </Box>
      ))}
      <Button variant="contained" onClick={addExperience} sx={{ backgroundColor: color }}>
        Add Experience
      </Button>
    </Box>
  );
}

export default ExperienceSection;
import { Box, Typography, Button, Grid, Checkbox, FormControlLabel } from '@mui/material';
import EditableSection from '../EditableSection';
import RichTextEditor from './RichTextEditor';
import { useState, useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { motion } from 'framer-motion';
import { Tooltip } from '@mui/material';

// Animation variants for inputs, buttons, and cards
const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, delay: index * 0.1 },
  }),
  hover: { scale: 1.02, boxShadow: '0 4px 12px rgba(16, 185, 129, 0.2)' },
  focus: { borderColor: '#10b981', boxShadow: '0 0 8px rgba(16, 185, 129, 0.3)' },
};

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

  const mmToPx = (mm) => mm * 3.78;

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
    <Box
      sx={{
        fontFamily: fontStyle,
        fontSize: `${fontSize}px`,
        lineHeight: lineSpacing,
        ml: mmToPx(sideMargin) / 96,
        mr: mmToPx(sideMargin) / 96,
        bgcolor: '#f5f5f5',
        p: 2,
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        mb: 3,
      }}
      component={motion.div}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
      }}
    >
      <Typography
        variant="h6"
        sx={{
          color: '#1e3a8a',
          fontWeight: 'bold',
          mb: 2,
        }}
      >
        Experience
      </Typography>
      {experiences.map((exp, index) => (
        <Box
          key={index}
          sx={{
            mb: 2,
            p: 2,
            bgcolor: '#ffffff',
            borderRadius: '8px',
            border: '1px solid #e0e0e0',
            '&:hover': { borderColor: '#10b981' },
          }}
          component={motion.div}
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          custom={index}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Tooltip title={expanded === index ? 'Click to collapse' : 'Click to expand'} placement="top" arrow>
              <Typography
                variant="subtitle1"
                onClick={() => setExpanded(expanded === index ? null : index)}
                sx={{
                  cursor: 'pointer',
                  color: '#1e3a8a',
                  fontWeight: 'medium',
                }}
                component={motion.div}
                whileHover={{ scale: 1.02, color: '#10b981' }}
              >
                {exp.jobTitle || `Experience ${index + 1}`}
              </Typography>
            </Tooltip>
            <Tooltip title={experiences.length <= 1 ? 'Cannot delete the last experience' : 'Delete this experience'} placement="top" arrow>
              <Button
                variant="outlined"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={() => deleteExperience(index)}
                disabled={experiences.length <= 1}
                size="small"
                sx={{
                  borderRadius: '20px',
                  color: '#dc2626',
                  borderColor: '#dc2626',
                  '&:hover': { borderColor: '#b91c1c', bgcolor: '#fef2f2' },
                }}
                component={motion.div}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                Delete
              </Button>
            </Tooltip>
          </Box>
          {expanded === index && (
            <Box sx={{ mt: 2 }}>
              <Grid container spacing={2}>
                {[
                  { label: 'Job Title', field: 'jobTitle', value: exp.jobTitle, tooltip: 'Enter your job title' },
                  { label: 'Employer', field: 'employer', value: exp.employer, tooltip: 'Enter your employer name' },
                  { label: 'City', field: 'city', value: exp.city, tooltip: 'Enter the city' },
                  { label: 'Start Date', field: 'startDate', value: exp.startDate, type: 'month', tooltip: 'Select start date' },
                  {
                    label: 'End Date',
                    field: 'endDate',
                    value: exp.endDate,
                    type: 'month',
                    disabled: exp.current,
                    tooltip: exp.current ? 'Disabled for current job' : 'Select end date',
                  },
                ].map(({ label, field, value, type, disabled, tooltip }, fieldIndex) => (
                  <Grid item xs={12} sm={6} key={field}>
                    <Tooltip title={tooltip} placement="top" arrow>
                      <Box
                        sx={{
                          '& .MuiTextField-root': {
                            bgcolor: '#ffffff',
                            borderRadius: '6px',
                            '& .MuiInputLabel-root': { color: '#1e3a8a' },
                            '& .MuiInputLabel-root.Mui-focused': { color: '#10b981' },
                            '& .MuiOutlinedInput-root': {
                              '&:hover fieldset': { borderColor: '#10b981' },
                              '&.Mui-focused fieldset': { borderColor: '#10b981' },
                            },
                          },
                        }}
                        component={motion.div}
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        whileHover="hover"
                        whileFocus="focus"
                        custom={index * 5 + fieldIndex + 1} // Unique index for fields
                      >
                        <EditableSection
                          label={label}
                          value={value}
                          onChange={(value) => updateExperience(index, field, value)}
                          type={type}
                          disabled={disabled}
                        />
                      </Box>
                    </Tooltip>
                  </Grid>
                ))}
                <Grid item xs={12}>
                  <Tooltip title="Check if you currently work here" placement="top" arrow>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={exp.current}
                          onChange={() => toggleCurrent(index)}
                          sx={{
                            color: '#1e3a8a',
                            '&.Mui-checked': { color: '#10b981' },
                          }}
                          component={motion.div}
                          variants={itemVariants}
                          initial="hidden"
                          animate="visible"
                          whileHover="hover"
                          custom={index * 5 + 5} // Unique index for checkbox
                        />
                      }
                      label="I currently work here"
                      sx={{ color: '#1e3a8a' }}
                    />
                  </Tooltip>
                </Grid>
              </Grid>
              <Typography
                variant="body1"
                sx={{ color: '#1e3a8a', mt: 2, mb: 1, fontWeight: 'medium' }}
              >
                Job Description
              </Typography>
              <Tooltip title="Enter your job responsibilities and achievements" placement="top" arrow>
                <Box
                  sx={{
                    bgcolor: '#ffffff',
                    borderRadius: '6px',
                    border: '1px solid #e0e0e0',
                    '&:hover': { borderColor: '#10b981' },
                    '&:focus-within': { borderColor: '#10b981' },
                  }}
                  component={motion.div}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  whileFocus="focus"
                  custom={index * 5 + 6} // Unique index for RichTextEditor
                >
                  <RichTextEditor
                    value={exp.description}
                    onChange={(value) => updateExperience(index, 'description', value)}
                    fontStyle={fontStyle}
                    fontSize={fontSize}
                    color={color}
                    lineSpacing={lineSpacing}
                    sideMargin={0} // Managed by parent Box
                    placeholder="Enter job description..."
                  />
                </Box>
              </Tooltip>
            </Box>
          )}
        </Box>
      ))}
      <Tooltip title="Add a new work experience" placement="top" arrow>
        <Button
          variant="contained"
          onClick={addExperience}
          sx={{
            bgcolor: '#1e3a8a',
            '&:hover': { bgcolor: '#1565c0' },
            borderRadius: '8px',
            textTransform: 'none',
            mt: 2,
          }}
          component={motion.div}
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          whileHover={{ scale: 1.05 }}
          custom={experiences.length + 1} // Unique index for button
        >
          Add Experience
        </Button>
      </Tooltip>
    </Box>
  );
}

export default ExperienceSection;
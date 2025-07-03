import { Box, Grid, Typography } from '@mui/material';
import EditableSection from '../EditableSection';
import { motion } from 'framer-motion';
import { Tooltip } from '@mui/material';

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

function PersonalInfoSection({ personalInfo, setResumeData }) {
  const mmToPx = (mm) => mm * 3.78;
  const defaultSideMargin = 10; // Default side margin in mm

  const updateField = (field, value) => {
    setResumeData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value },
    }));
  };

  return (
    <Box
      sx={{
        ml: mmToPx(defaultSideMargin) / 96,
        mr: mmToPx(defaultSideMargin) / 96,
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
        Personal Information
      </Typography>
      <Grid container spacing={2}>
        {[
          { label: 'Date of Birth', field: 'dateOfBirth', value: personalInfo.dateOfBirth, type: 'date', tooltip: 'Enter your date of birth' },
          { label: 'Gender', field: 'gender', value: personalInfo.gender, tooltip: 'Enter your gender' },
          { label: 'Nationality', field: 'nationality', value: personalInfo.nationality, tooltip: 'Enter your nationality' },
          { label: 'Marital Status', field: 'maritalStatus', value: personalInfo.maritalStatus, tooltip: 'Enter your marital status' },
        ].map(({ label, field, value, type, tooltip }, index) => (
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
                custom={index}
              >
                <EditableSection
                  label={label}
                  value={value || ''}
                  onChange={(value) => updateField(field, value)}
                  type={type}
                  aria-label={`${label} input`}
                />
              </Box>
            </Tooltip>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default PersonalInfoSection;
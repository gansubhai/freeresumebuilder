import { Box, Grid, TextField } from '@mui/material';
import EditableSection from '../EditableSection';

function PersonalInfoSection({ personalInfo, setResumeData }) {
  const updateField = (field, value) => {
    setResumeData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value },
    }));
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <EditableSection
            label="Date of Birth"
            value={personalInfo.dateOfBirth}
            onChange={(value) => updateField('dateOfBirth', value)}
            type="date"
          />
        </Grid>
        <Grid item xs={6}>
          <EditableSection
            label="Gender"
            value={personalInfo.gender}
            onChange={(value) => updateField('gender', value)}
          />
        </Grid>
        <Grid item xs={6}>
          <EditableSection
            label="Nationality"
            value={personalInfo.nationality}
            onChange={(value) => updateField('nationality', value)}
          />
        </Grid>
        <Grid item xs={6}>
          <EditableSection
            label="Marital Status"
            value={personalInfo.maritalStatus}
            onChange={(value) => updateField('maritalStatus', value)}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default PersonalInfoSection;
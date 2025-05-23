import { Box, TextField, Grid } from '@mui/material';
import EditableSection from '../EditableSection';

function HeadingSection({ heading, setResumeData }) {
  const updateField = (field, value) => {
    setResumeData((prev) => ({
      ...prev,
      heading: { ...prev.heading, [field]: value },
    }));
  };

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <EditableSection
            label="First Name"
            value={heading.firstName}
            onChange={(value) => updateField('firstName', value)}
          />
        </Grid>
        <Grid item xs={6}>
          <EditableSection
            label="Last Name"
            value={heading.lastName}
            onChange={(value) => updateField('lastName', value)}
          />
        </Grid>
        <Grid item xs={6}>
          <EditableSection
            label="City"
            value={heading.city}
            onChange={(value) => updateField('city', value)}
          />
        </Grid>
        <Grid item xs={6}>
          <EditableSection
            label="Country"
            value={heading.country}
            onChange={(value) => updateField('country', value)}
          />
        </Grid>
        <Grid item xs={6}>
          <EditableSection
            label="Pincode"
            value={heading.pincode}
            onChange={(value) => updateField('pincode', value)}
          />
        </Grid>
        <Grid item xs={6}>
          <EditableSection
            label="Phone"
            value={heading.phone}
            onChange={(value) => updateField('phone', value)}
          />
        </Grid>
        <Grid item xs={12}>
          <EditableSection
            label="Email"
            value={heading.email}
            onChange={(value) => updateField('email', value)}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default HeadingSection;
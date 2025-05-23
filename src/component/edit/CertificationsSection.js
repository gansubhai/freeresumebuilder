import { Box, Typography, Button, Grid } from '@mui/material';
import EditableSection from '../EditableSection';
import { useState } from 'react';

function CertificationsSection({ certifications, setResumeData }) {
  const [expanded, setExpanded] = useState(certifications.length > 0 ? 0 : null);

  const addCertification = () => {
    const newIndex = certifications.length;
    setResumeData((prev) => ({
      ...prev,
      certifications: [
        ...prev.certifications,
        { name: '', date: '' },
      ],
    }));
    setExpanded(newIndex);
  };

  const updateCertification = (index, field, value) => {
    setResumeData((prev) => {
      const newCertifications = [...prev.certifications];
      newCertifications[index] = { ...newCertifications[index], [field]: value };
      return { ...prev, certifications: newCertifications };
    });
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Certifications
      </Typography>
      {certifications.map((cert, index) => (
        <Box key={index} sx={{ mb: 2, p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
          <Typography
            variant="subtitle1"
            onClick={() => setExpanded(expanded === index ? null : index)}
            sx={{ cursor: 'pointer', mb: 1 }}
          >
            {cert.name || `Certification ${index + 1}`}
          </Typography>
          {expanded === index && (
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <EditableSection
                  label="Certification Name"
                  value={cert.name}
                  onChange={(value) => updateCertification(index, 'name', value)}
                />
              </Grid>
              <Grid item xs={6}>
                <EditableSection
                  label="Date"
                  value={cert.date}
                  onChange={(value) => updateCertification(index, 'date', value)}
                  type="month"
                />
              </Grid>
            </Grid>
          )}
        </Box>
      ))}
      <Button variant="contained" onClick={addCertification}>
        Add Certification
      </Button>
    </Box>
  );
}

export default CertificationsSection;
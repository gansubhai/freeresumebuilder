import { Box, Typography, Button, Grid, IconButton } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import EditableSection from '../EditableSection';
import { useState, useEffect } from 'react';

function CertificationsSection({ certifications, setResumeData }) {
  const [expanded, setExpanded] = useState(certifications.length > 0 ? 0 : null);

  // Debug: Log certifications prop
  useEffect(() => {
    console.log('Certifications prop:', certifications);
  }, [certifications]);

  // Ensure one certification entry
  useEffect(() => {
    if (certifications.length === 0) {
      setResumeData((prev) => {
        console.log('Adding initial certification');
        return {
          ...prev,
          certifications: [{ name: '', date: '' }],
        };
      });
      setExpanded(0);
    }
  }, [certifications.length, setResumeData]);

  const addCertification = () => {
    const newCertification = { name: '', date: '' };
    setResumeData((prev) => {
      const updatedCertifications = [...(prev.certifications || []), newCertification];
      console.log('Added certification:', updatedCertifications);
      return { ...prev, certifications: updatedCertifications };
    });
    setExpanded(certifications.length);
  };

  const deleteCertification = (index) => {
    if (certifications.length <= 1) return;
    setResumeData((prev) => {
      const updatedCertifications = prev.certifications.filter((_, i) => i !== index);
      console.log('Deleted certification:', updatedCertifications);
      return { ...prev, certifications: updatedCertifications };
    });
    setExpanded((prev) => {
      if (prev === index) return null;
      if (prev > index) return prev - 1;
      return prev;
    });
  };

  const updateCertification = (index, field, value) => {
    setResumeData((prev) => {
      const newCertifications = [...prev.certifications];
      newCertifications[index] = { ...newCertifications[index], [field]: value };
      console.log('Updated certification:', newCertifications);
      return { ...prev, certifications: newCertifications };
    });
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Certifications
      </Typography>
      {certifications.map((cert, index) => (
        <Box
          key={index}
          sx={{ mb: 2, p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography
              variant="subtitle1"
              onClick={() => setExpanded(expanded === index ? null : index)}
              sx={{ cursor: 'pointer', mb: 1 }}
            >
              {cert.name || `Certification ${index + 1}`}
            </Typography>
            <IconButton
              onClick={() => deleteCertification(index)}
              disabled={certifications.length <= 1}
              aria-label="Delete certification"
              size="small"
            >
              <DeleteIcon />
            </IconButton>
          </Box>
          {expanded === index && (
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <EditableSection
                  label="Certification Name"
                  value={cert.name || ''}
                  onChange={(value) => updateCertification(index, 'name', value)}
                />
              </Grid>
              <Grid item xs={6}>
                <EditableSection
                  label="Date"
                  value={cert.date || ''}
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
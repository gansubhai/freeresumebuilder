import { Box, Typography, Button, Grid, IconButton } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import EditableSection from '../EditableSection';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

function CertificationsSection({ certifications, setResumeData }) {
  const [expanded, setExpanded] = useState(certifications.length > 0 ? 0 : null);

  const mmToPx = (mm) => mm * 3.78;
  const defaultSideMargin = 10; // Default side margin in mm

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
        Certifications
      </Typography>
      <AnimatePresence>
        {certifications.map((cert, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
            custom={index}
          >
            <Box
              sx={{
                mb: 2,
                p: 2,
                bgcolor: '#ffffff',
                borderRadius: '8px',
                border: '1px solid #e0e0e0',
                '&:hover': { borderColor: '#10b981' },
              }}
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
                    {cert.name || `Certification ${index + 1}`}
                  </Typography>
                </Tooltip>
                <Tooltip title={certifications.length <= 1 ? 'Cannot delete the last certification' : 'Delete this certification'} placement="top" arrow>
                  <IconButton
                    onClick={() => deleteCertification(index)}
                    disabled={certifications.length <= 1}
                    aria-label="Delete certification"
                    size="small"
                    sx={{
                      color: '#dc2626',
                      '&:hover': { color: '#b91c1c', bgcolor: '#fef2f2' },
                    }}
                    component={motion.div}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </Box>
              {expanded === index && (
                <Grid container spacing={2}>
                  {[
                    { label: 'Certification Name', field: 'name', value: cert.name || '', tooltip: 'Enter the certification name' },
                    { label: 'Date', field: 'date', value: cert.date || '', type: 'month', tooltip: 'Select the certification date' },
                  ].map(({ label, field, value, type, tooltip }, fieldIndex) => (
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
                          custom={index * 2 + fieldIndex + 1} // Unique index for fields
                        >
                          <EditableSection
                            label={label}
                            value={value}
                            onChange={(value) => updateCertification(index, field, value)}
                            type={type}
                            aria-label={`${label} input`}
                          />
                        </Box>
                      </Tooltip>
                    </Grid>
                  ))}
                </Grid>
              )}
            </Box>
          </motion.div>
        ))}
      </AnimatePresence>
      <Tooltip title="Add a new certification" placement="top" arrow>
        <Button
          variant="contained"
          onClick={addCertification}
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
          custom={certifications.length + 1} // Unique index for button
        >
          Add Certification
        </Button>
      </Tooltip>
    </Box>
  );
}

export default CertificationsSection;
import { Box, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// Value card component for reusable value blocks
const ValueCard = ({ title, description, icon }) => (
  <motion.div
    className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
    whileHover={{ scale: 1.05 }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="text-4xl mb-4">{icon}</div>
    <Typography variant="h6" className="font-bold mb-2">
      {title}
    </Typography>
    <Typography variant="body2" color="text.secondary">
      {description}
    </Typography>
  </motion.div>
);

function AboutPage() {
  const navigate = useNavigate();

  // Values data
  const values = [
    {
      title: 'Free for All',
      description: 'Our platform is completely free, designed to help college students and beginners without the burden of subscription costs.',
      icon: '🌟',
    },
    {
      title: 'ATS-Optimized',
      description: 'Our resumes are crafted to pass Applicant Tracking Systems, ensuring your application reaches hiring managers.',
      icon: '✅',
    },
    {
      title: 'User-Friendly',
      description: 'Intuitive tools make it easy for anyone to create a professional resume, no experience required.',
      icon: '🛠️',
    },
  ];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f4f7fa', mt: 8, p: 4 }}>
      {/* Hero Section */}
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', color: '#1e3a8a' }}>
            About FreeResume
          </Typography>
          <Typography variant="h6" sx={{ maxWidth: '700px', mx: 'auto', mb: 4, color: 'text.secondary' }}>
            Empowering college students and beginners to land their dream jobs with free, ATS-optimized resumes.
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/create-resume')}
            sx={{
              bgcolor: '#10b981',
              '&:hover': { bgcolor: '#059669' },
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
            }}
          >
            <motion.span
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              Start Building Your Resume
            </motion.span>
          </Button>
        </motion.div>
      </Box>

      {/* Mission Section */}
      <Box sx={{ maxWidth: '900px', mx: 'auto', mb: 8 }}>
        <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', color: '#1e3a8a' }}>
          Our Mission
        </Typography>
        <Typography variant="body1" sx={{ textAlign: 'center', color: 'text.secondary', lineHeight: 1.8 }}>
          At FreeResume, we believe everyone deserves a chance to shine. That’s why we created a platform specifically for college students and early-career professionals who may not have the resources for expensive resume-building services. Our goal is to provide free, high-quality tools that create professional, ATS-friendly resumes to help you stand out in the job market and land the opportunities you deserve.
        </Typography>
      </Box>

      {/* Values Section */}
      <Box sx={{ maxWidth: '1200px', mx: 'auto', mb: 8 }}>
        <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', color: '#1e3a8a', mb: 6 }}>
          Our Core Values
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
            gap: 4,
          }}
        >
          {values.map((value, index) => (
            <ValueCard
              key={index}
              title={value.title}
              description={value.description}
              icon={value.icon}
            />
          ))}
        </Box>
      </Box>

      {/* Call to Action Section */}
      <Box sx={{ textAlign: 'center', bgcolor: '#e5e7eb', py: 8, borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom sx={{ color: '#1e3a8a' }}>
          Ready to Kickstart Your Career?
        </Typography>
        <Typography variant="body1" sx={{ maxWidth: '600px', mx: 'auto', mb: 4, color: 'text.secondary' }}>
          Join thousands of students and beginners who have built their resumes with FreeResume. Create a resume that gets noticed by employers today!
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate('/create-resume')}
          sx={{
            bgcolor: '#1e3a8a',
            '&:hover': { bgcolor: '#1e40af' },
            px: 4,
            py: 1.5,
          }}
        >
          Create Your Resume Now
        </Button>
      </Box>
    </Box>
  );
}

export default AboutPage;
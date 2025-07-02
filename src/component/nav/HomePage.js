import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';

// Feature card component for reusable feature blocks
const FeatureCard = ({ title, description, icon }) => (
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

function HomePage() {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  // Features data
  const features = [
    {
      title: 'Easy to Use',
      description: 'Create a professional resume in minutes with our intuitive builder.',
      icon: '🚀',
    },
    {
      title: 'Customizable Templates',
      description: 'Choose from a variety of modern templates to suit your style.',
      icon: '🎨',
    },
    {
      title: 'Free Forever',
      description: 'Build and download your resume for free, no hidden fees.',
      icon: '💸',
    },
  ];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f4f7fa' }}>
      {/* Hero Section */}
      <Box
        sx={{
          mt: 8,
          p: 4,
          textAlign: 'center',
          bgcolor: 'linear-gradient(135deg, #6b7280 0%, #1e3a8a 100%)',
          color: 'white',
          py: 12,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography variant="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
            Build Your Perfect Resume
          </Typography>
          <Typography variant="h5" sx={{ mb: 4, maxWidth: '600px', mx: 'auto' }}>
            Create a professional resume for free with our easy-to-use builder. Stand out and land your dream job!
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/create-resume')}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            sx={{
              bgcolor: '#10b981',
              '&:hover': { bgcolor: '#059669' },
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
            }}
          >
            <motion.span
              animate={{ scale: isHovered ? 1.1 : 1 }}
              transition={{ duration: 0.2 }}
            >
              Get Started Now
            </motion.span>
          </Button>
        </motion.div>
      </Box>

      {/* Features Section */}
      <Box sx={{ p: 4, maxWidth: '1200px', mx: 'auto' }}>
        <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', mb: 6 }}>
          Why Choose FreeResume?
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
            gap: 4,
          }}
        >
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
            />
          ))}
        </Box>
      </Box>

      {/* CTA Section */}
      <Box sx={{ p: 4, textAlign: 'center', bgcolor: '#e5e7eb', py: 8 }}>
        <Typography variant="h4" gutterBottom>
          Ready to Land Your Dream Job?
        </Typography>
        <Typography variant="body1" sx={{ mb: 4, maxWidth: '600px', mx: 'auto' }}>
          Join thousands of users who have created stunning resumes with FreeResume. Start now and take the first step towards your career goals!
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
          Create Your Resume
        </Button>
      </Box>
    </Box>
  );
}

export default HomePage;
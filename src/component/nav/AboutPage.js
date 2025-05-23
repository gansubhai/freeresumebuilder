import { Box, Typography } from '@mui/material';

function AboutPage() {
  return (
    <Box sx={{ mt: 8, p: 4 }}>
      <Typography variant="h4" gutterBottom>
        About FreeResume
      </Typography>
      <Typography variant="body1">
        We are free for all! Create professional resumes easily with our intuitive builder.
      </Typography>
    </Box>
  );
}

export default AboutPage;
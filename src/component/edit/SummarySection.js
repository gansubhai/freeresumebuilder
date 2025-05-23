import { Box, TextField, Typography } from '@mui/material';

function SummarySection({ summary, setResumeData }) {
  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Summary
      </Typography>
      <TextField
        label="Summary"
        value={summary}
        onChange={(e) => setResumeData((prev) => ({ ...prev, summary: e.target.value }))}
        multiline
        rows={4}
        fullWidth
        variant="outlined"
      />
    </Box>
  );
}

export default SummarySection;
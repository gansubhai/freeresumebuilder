import { Box, Typography, Autocomplete, Chip, TextField } from '@mui/material';

function SkillsSection({ skills, setResumeData }) {
  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Skills
      </Typography>
      <Autocomplete
        multiple
        freeSolo
        value={skills}
        onChange={(event, newValue) => setResumeData((prev) => ({ ...prev, skills: newValue }))}
        options={[]}
        renderInput={(params) => (
          <TextField {...params} label="Add a skill and press Enter" variant="outlined" />
        )}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip label={option} {...getTagProps({ index })} />
          ))
        }
        fullWidth
      />
    </Box>
  );
}

export default SkillsSection;
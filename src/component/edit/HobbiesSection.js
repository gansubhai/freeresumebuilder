import { Box, Typography, Autocomplete, Chip, TextField } from '@mui/material';

function HobbiesSection({ hobbies, setResumeData }) {
  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Hobbies and Interests
      </Typography>
      <Autocomplete
        multiple
        freeSolo
        value={hobbies}
        onChange={(event, newValue) => setResumeData((prev) => ({ ...prev, hobbies: newValue }))}
        options={[]}
        renderInput={(params) => (
          <TextField {...params} label="Add a hobby and press Enter" variant="outlined" />
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

export default HobbiesSection;
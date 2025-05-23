import { Box, Typography, Autocomplete, Chip, TextField } from '@mui/material';

function LanguagesSection({ languages, setResumeData }) {
  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Languages
      </Typography>
      <Autocomplete
        multiple
        freeSolo
        value={languages}
        onChange={(event, newValue) => setResumeData((prev) => ({ ...prev, languages: newValue }))}
        options={[]}
        renderInput={(params) => (
          <TextField {...params} label="Add a language and press Enter" variant="outlined" />
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

export default LanguagesSection;
import { Box, Grid, TextField } from '@mui/material';

function HeadingSection({
  heading,
  setHeading,
  color,
  fontStyle,
  fontSize,
  headingSize,
  sectionSpacing,
  paragraphSpacing,
  lineSpacing,
  sideMargin,
  paragraphIndent,
}) {
  const handleChange = (field) => (event) => {
    setHeading({ ...heading, [field]: event.target.value });
  };

  const fields = [
    { label: 'First Name', field: 'firstName', value: heading.firstName },
    { label: 'Last Name', field: 'lastName', value: heading.lastName },
    { label: 'Title', field: 'title', value: heading.title },
    { label: 'City', field: 'city', value: heading.city },
    { label: 'Country', field: 'country', value: heading.country },
    { label: 'Pincode', field: 'pincode', value: heading.pincode },
    { label: 'Phone', field: 'phone', value: heading.phone },
    { label: 'Email', field: 'email', value: heading.email },
    { label: 'LinkedIn', field: 'linkedin', value: heading.linkedin },
  ];

  return (
    <Box
      sx={{
        fontFamily: fontStyle,
        fontSize: `${fontSize}px`,
        lineHeight: lineSpacing,
        marginLeft: `${sideMargin}px`,
        marginRight: `${sideMargin}px`,
        textIndent: `${paragraphIndent}px`,
      }}
    >
      <Grid container spacing={2}>
        {fields.map(({ label, field, value }) => (
          <Grid item xs={12} sm={6} key={field}>
            <TextField
              label={label}
              value={value}
              onChange={handleChange(field)}
              fullWidth
              size="small"
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default HeadingSection;
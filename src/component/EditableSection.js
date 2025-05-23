import { TextField, Typography } from '@mui/material';

function EditableSection({ label, value, onChange, type = 'text', disabled = false }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <Typography variant="body2" gutterBottom>
        {label}
      </Typography>
      <TextField
        fullWidth
        value={value}
        onChange={(e) => onChange(e.target.value)}
        variant="outlined"
        type={type}
        disabled={disabled}
      />
    </div>
  );
}

export default EditableSection;
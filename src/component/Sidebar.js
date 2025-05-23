import { Box, Typography, Button, TextField } from '@mui/material';

function Sidebar({ templates, selectedTemplate, setSelectedTemplate, setColor }) {
  return (
    <Box
      sx={{
        width: '25%',
        bgcolor: '#f5f5f5',
        p: 2,
        height: '100vh',
        overflowY: 'auto',
      }}
    >
      <Typography variant="h6" gutterBottom>
        Customize Resume
      </Typography>
      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle1" gutterBottom>
          Select Template
        </Typography>
        {templates.map((template) => (
          <Button
            key={template.id}
            onClick={() => setSelectedTemplate(template.id)}
            variant={selectedTemplate === template.id ? 'contained' : 'outlined'}
            fullWidth
            sx={{ mb: 1 }}
          >
            {template.name}
          </Button>
        ))}
      </Box>
      <Box>
        <Typography variant="subtitle1" gutterBottom>
          Choose Color
        </Typography>
        <TextField
          type="color"
          onChange={(e) => setColor(e.target.value)}
          fullWidth
          InputProps={{ style: { height: 40 } }}
        />
      </Box>
    </Box>
  );
}

export default Sidebar;
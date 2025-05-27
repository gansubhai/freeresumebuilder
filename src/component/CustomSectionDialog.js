import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
  } from '@mui/material';
  import TextareaAutosize from '@mui/material/TextareaAutosize';
  
  function CustomSectionDialog({
    open,
    onClose,
    customSection,
    setCustomSection,
    editIndex,
    handleSave,
    handleDelete,
    fontStyle,
    fontSize,
  }) {
    console.log("CustomSectionDialog");
    return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>{editIndex !== null ? 'Edit Custom Section' : 'Add Custom Section'}</DialogTitle>
        <DialogContent>
          <TextField
            label="Section Heading"
            value={customSection.heading}
            onChange={(e) => setCustomSection({ ...customSection, heading: e.target.value })}
            fullWidth
            margin="dense"
          />
          <TextareaAutosize
            minRows={4}
            placeholder="Description"
            value={customSection.description}
            onChange={(e) => setCustomSection({ ...customSection, description: e.target.value })}
            style={{ width: '100%', marginTop: '16px', padding: '8px', fontFamily: fontStyle, fontSize }}
          />
        </DialogContent>
        <DialogActions>
          {editIndex !== null && (
            <Button
              onClick={() => {
                handleDelete(editIndex);
                onClose();
              }}
              color="error"
            >
              Delete
            </Button>
          )}
          <Button onClick={onClose}>Cancel</Button>
          <Button
            onClick={handleSave}
            disabled={!customSection.heading || !customSection.description}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
  
  export default CustomSectionDialog;
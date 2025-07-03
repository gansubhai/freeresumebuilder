import { Box, Typography, Tooltip } from '@mui/material';
import { motion } from 'framer-motion';
import RichTextEditor from './RichTextEditor';

// Animation variants for the RichTextEditor
const editorVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  hover: { scale: 1.02, boxShadow: '0 4px 12px rgba(16, 185, 129, 0.2)' },
  focus: { borderColor: '#10b981', boxShadow: '0 0 8px rgba(16, 185, 129, 0.3)' },
};

function SummarySection({
  summary,
  setSummary,
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
  const mmToPx = (mm) => mm * 3.78;

  return (
    <Box
      sx={{
        fontFamily: fontStyle,
        fontSize: `${fontSize}px`,
        lineHeight: lineSpacing,
        ml: mmToPx(sideMargin) / 96,
        mr: mmToPx(sideMargin) / 96,
        textIndent: `${mmToPx(paragraphIndent)}px`,
        bgcolor: '#f5f5f5',
        p: 2,
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      }}
      component={motion.div}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
      }}
    >
      <Typography
        variant="h6"
        sx={{
          color: '#1e3a8a',
          fontWeight: 'bold',
          mb: mmToPx(paragraphSpacing) / 96,
          fontSize: headingSize,
        }}
      >
        Professional Summary
      </Typography>
      <Tooltip title="Write a brief professional summary" placement="top" arrow>
        <Box
          sx={{
            bgcolor: '#ffffff',
            borderRadius: '6px',
            border: '1px solid #e0e0e0',
            '&:hover': { borderColor: '#10b981' },
            '&:focus-within': { borderColor: '#10b981' },
          }}
          component={motion.div}
          variants={editorVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          whileFocus="focus"
        >
          <RichTextEditor
            value={summary}
            onChange={setSummary}
            fontStyle={fontStyle}
            fontSize={fontSize}
            color={color}
            lineSpacing={lineSpacing}
            sideMargin={0} // Managed by parent Box
            placeholder="Enter your professional summary..."
          />
        </Box>
      </Tooltip>
    </Box>
  );
}

export default SummarySection;
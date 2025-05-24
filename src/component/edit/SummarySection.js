import { Box } from '@mui/material';
import RichTextEditor from './RichTextEditor';

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
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: `${paragraphSpacing}px`,
        textIndent: `${paragraphIndent}px`,
      }}
    >
      <RichTextEditor
        value={summary}
        onChange={setSummary}
        fontStyle={fontStyle}
        fontSize={fontSize}
        color={color}
        lineSpacing={lineSpacing}
        sideMargin={sideMargin}
        placeholder="Enter your professional summary..."
      />
    </Box>
  );
}

export default SummarySection;
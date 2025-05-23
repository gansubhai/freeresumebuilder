import ClassicTemplate from '../component/template/ClassicTemplate';
import ModernTemplate from '../component/template/ModernTemplate';
import ProfessionalTemplate from '../component/template/ProfessionalTemplate';

function ResumePreview({
  template,
  resumeData,
  setResumeData,
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
  const templateComponents = {
    template1: ClassicTemplate,
    template2: ModernTemplate,
    template3: ProfessionalTemplate,
  };

  const TemplateComponent = templateComponents[template] || ClassicTemplate;

  return (
    <TemplateComponent
      resumeData={resumeData}
      setResumeData={setResumeData}
      color={color}
      fontStyle={fontStyle}
      fontSize={fontSize}
      headingSize={headingSize}
      sectionSpacing={sectionSpacing}
      paragraphSpacing={paragraphSpacing}
      lineSpacing={lineSpacing}
      sideMargin={sideMargin}
      paragraphIndent={paragraphIndent}
    />
  );
}

export default ResumePreview;
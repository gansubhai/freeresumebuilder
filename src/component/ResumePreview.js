// src/components/ResumePreview.js
import { useState, useEffect, Component } from 'react';
import { Box } from '@mui/material';
import ModernTemplate from '../component/template/ModernTemplate';
import ClassicTemplate from '../component/template/ClassicTemplate';
import ProfessionalTemplate from '../component/template/ProfessionalTemplate';

class ErrorBoundary extends Component {
  state = { hasError: false, error: null };
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  render() {
    if (this.state.hasError) {
      return (
        <Box sx={{ p: 2, color: 'red' }}>
          <h3>Error rendering resume</h3>
          <pre>{this.state.error?.message}</pre>
        </Box>
      );
    }
    return this.props.children;
  }
}

function ResumePreview({ resumeData, template, setResumeData, color, fontStyle, fontSize, headingSize, sectionSpacing, paragraphSpacing, lineSpacing, sideMargin, paragraphIndent }) {
  console.log('ResumePreview props:', { resumeData, template });

  const templateComponents = {
    template1: ClassicTemplate,
    template2: ModernTemplate,
    template3: ProfessionalTemplate,
  };

  const [sectionStates, setSectionStates] = useState({
    heading: true,
    summary: true,
    skills: true,
    experience: true,
    education: true,
    hobbies: true,
    languages: true,
    personalInfo: true,
    certifications: true,
    accomplishments: true,
    customSections: (resumeData?.customSections || []).map(() => true),
  });

  useEffect(() => {
    setSectionStates((prev) => ({
      ...prev,
      customSections: (resumeData?.customSections || []).map(() => true),
    }));
  }, [resumeData?.customSections]);

  const toggleSection = (section, index = null) => {
    setSectionStates((prev) => {
      if (index !== null) {
        const newCustomSections = [...prev.customSections];
        newCustomSections[index] = !newCustomSections[index];
        return { ...prev, customSections: newCustomSections };
      }
      return { ...prev, [section]: !prev[section] };
    });
  };

  if (!resumeData || !template) {
    console.warn('ResumePreview: Missing resumeData or template');
    return <Box>Missing resume data or template</Box>;
  }

  const TemplateComponent = templateComponents[template] || ModernTemplate;
  console.log('Selected TemplateComponent:', TemplateComponent.name);

  return (
    <ErrorBoundary>
      <Box sx={{ width: '100%', height: '100vh', overflowY: 'auto' }}>
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
          sectionStates={sectionStates}
          toggleSection={toggleSection}
        />
      </Box>
    </ErrorBoundary>
  );
}

export default ResumePreview;
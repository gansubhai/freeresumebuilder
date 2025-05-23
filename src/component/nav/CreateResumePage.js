import { useState, useRef, useEffect } from 'react';
import { Box } from '@mui/material';
import Sidebar from '../Sidebar';
import ResumePreview from '../ResumePreview';
import RightSidebar from '../RightSidebar';
import CustomSectionDialog from '../CustomSectionDialog';
import { generatePDF } from '../utils/pdfGenerator';

function CreateResumePage() {
  const templates = [
    { id: 'template1', name: 'Classic Template' },
    { id: 'template2', name: 'Modern Template' },
    { id: 'template3', name: 'Professional Template' },
  ];

  const [selectedTemplate, setSelectedTemplate] = useState(templates[0].id);
  const [color, setColor] = useState('#1976d2');
  const [fontStyle, setFontStyle] = useState('Arial');
  const [fontSize, setFontSize] = useState(10);
  const [headingSize, setHeadingSize] = useState(16);
  const [sectionSpacing, setSectionSpacing] = useState(6);
  const [paragraphSpacing, setParagraphSpacing] = useState(2);
  const [lineSpacing, setLineSpacing] = useState(1.15);
  const [sideMargin, setSideMargin] = useState(10);
  const [paragraphIndent, setParagraphIndent] = useState(0);
  const [resumeData, setResumeData] = useState({
    heading: {
      firstName: 'John',
      lastName: 'Doe',
      title: 'Software Engineer',
      city: 'New York',
      country: 'USA',
      pincode: '10001',
      phone: '123-456-7890',
      email: 'john.doe@example.com',
      linkedin: 'https://linkedin.com/in/johndoe',
    },
    summary: 'Experienced professional with a passion for technology...',
    skills: [
      { name: 'JavaScript', proficiency: 'Excellent' },
      { name: 'React', proficiency: 'Excellent' },
      { name: 'Material UI', proficiency: 'Good' },
    ],
    experiences: [
      {
        jobTitle: 'Software Engineer',
        employer: 'Tech Corp',
        city: 'San Francisco',
        startDate: '2020-01',
        endDate: '2022-12',
        current: false,
        description: 'Developed robust solutions to meet client requirements.',
      },
    ],
    educations: [
      {
        schoolName: 'State University',
        schoolLocation: 'Boston',
        degree: 'B.Sc.',
        fieldOfStudy: 'Computer Science',
        graduationMonth: 'May',
        graduationYear: '2019',
      },
    ],
    hobbies: ['Reading', 'Hiking'],
    languages: [
      { name: 'English', proficiency: 'Excellent' },
      { name: 'Spanish', proficiency: 'Good' },
    ],
    personalInfo: {
      dateOfBirth: '1990-01-01',
      gender: 'Male',
      nationality: 'American',
      maritalStatus: 'Single',
    },
    certifications: [
      { name: 'OCJP', date: '2012-08' },
      { name: 'AWS Architect', date: '2019-02' },
    ],
    accomplishments: [
      'Key contributor in new product deployment pipelines.',
      'Received Individual Performance Award in 2013.',
    ],
    customSections: [],
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [customSection, setCustomSection] = useState({ heading: '', description: '' });
  const [editIndex, setEditIndex] = useState(null);

  const previewRef = useRef(null);

  useEffect(() => {
    if (previewRef.current) {
      previewRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [selectedTemplate]);

  const handleOpenDialog = (section = null, index = null) => {
    setCustomSection(section || { heading: '', description: '' });
    setEditIndex(index);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setCustomSection({ heading: '', description: '' });
    setEditIndex(null);
  };

  const handleSaveSection = () => {
    const newCustomSections = [...resumeData.customSections];
    if (editIndex !== null) {
      newCustomSections[editIndex] = customSection;
    } else {
      newCustomSections.push(customSection);
    }
    setResumeData({ ...resumeData, customSections: newCustomSections });
    handleCloseDialog();
  };

  const handleDeleteSection = (index) => {
    const newCustomSections = resumeData.customSections.filter((_, i) => i !== index);
    setResumeData({ ...resumeData, customSections: newCustomSections });
  };

  const handlePrint = () => {
    window.print();
  };

  const handleEmail = () => {
    const subject = 'My Resume';
    const body = 'Please find my resume attached.';
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <Box sx={{ mt: 8, display: 'flex', height: 'calc(100vh - 64px)' }}>
      <Sidebar
        templates={templates}
        selectedTemplate={selectedTemplate}
        setSelectedTemplate={setSelectedTemplate}
        color={color}
        setColor={setColor}
        fontStyle={fontStyle}
        setFontStyle={setFontStyle}
        fontSize={fontSize}
        setFontSize={setFontSize}
        headingSize={headingSize}
        setHeadingSize={setHeadingSize}
        sectionSpacing={sectionSpacing}
        setSectionSpacing={setSectionSpacing}
        paragraphSpacing={paragraphSpacing}
        setParagraphSpacing={setParagraphSpacing}
        lineSpacing={lineSpacing}
        setLineSpacing={setLineSpacing}
        sideMargin={sideMargin}
        setSideMargin={setSideMargin}
        paragraphIndent={paragraphIndent}
        setParagraphIndent={setParagraphIndent}
      />
      <Box sx={{ flexGrow: 1, display: 'flex', p: 2 }}>
        <Box ref={previewRef} sx={{ width: '75%', pr: 2 }}>
          <ResumePreview
            template={selectedTemplate}
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
        </Box>
        <RightSidebar
          color={color}
          resumeData={resumeData}
          setResumeData={setResumeData}
          generatePDF={generatePDF}
          handlePrint={handlePrint}
          handleEmail={handleEmail}
          handleOpenDialog={handleOpenDialog}
          handleDeleteSection={handleDeleteSection}
          selectedTemplate={selectedTemplate}
          fontStyle={fontStyle}
          fontSize={fontSize}
          headingSize={headingSize}
          sectionSpacing={sectionSpacing}
          paragraphSpacing={paragraphSpacing}
          lineSpacing={lineSpacing}
          sideMargin={sideMargin}
          paragraphIndent={paragraphIndent}
        />
      </Box>
      <CustomSectionDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        customSection={customSection}
        setCustomSection={setCustomSection}
        editIndex={editIndex}
        handleSave={handleSaveSection}
        handleDelete={handleDeleteSection}
        fontStyle={fontStyle}
        fontSize={fontSize}
      />
    </Box>
  );
}

export default CreateResumePage;
import { useState } from 'react';
import { Box, Button } from '@mui/material';
import Sidebar from '../Sidebar';
import ResumePreview from '../ResumePreview';
import jsPDF from 'jspdf';

function CreateResumePage() {
  const templates = [
    { id: 'template1', name: 'Classic Template' },
    { id: 'template2', name: 'Modern Template' },
  ];

  const [selectedTemplate, setSelectedTemplate] = useState(templates[0].id);
  const [color, setColor] = useState('#1976d2');
  const [resumeData, setResumeData] = useState({
    heading: {
      firstName: 'John',
      lastName: 'Doe',
      city: 'New York',
      country: 'USA',
      pincode: '10001',
      phone: '123-456-7890',
      email: 'john.doe@example.com',
    },
    summary: 'Experienced professional with a passion for technology...',
    skills: ['JavaScript', 'React', 'Material UI'],
    experiences: [
      {
        jobTitle: 'Software Engineer',
        employer: 'Tech Corp',
        city: 'San Francisco',
        startDate: '2020-01',
        endDate: '2022-12',
        current: false,
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
    languages: ['English', 'Spanish'],
    personalInfo: {
      dateOfBirth: '1990-01-01',
      gender: 'Male',
      nationality: 'American',
      maritalStatus: 'Single',
    },
  });

  const generatePDF = () => {
    const doc = new jsPDF();
    let y = 10;

    // Heading
    doc.setFontSize(16);
    doc.text(`${resumeData.heading.firstName} ${resumeData.heading.lastName}`, 10, y);
    y += 10;
    doc.setFontSize(12);
    doc.text(`${resumeData.heading.city}, ${resumeData.heading.country} | ${resumeData.heading.pincode}`, 10, y);
    y += 6;
    doc.text(`${resumeData.heading.phone} | ${resumeData.heading.email}`, 10, y);
    y += 10;
    doc.line(10, y, 200, y);
    y += 10;

    // Summary
    doc.setFontSize(14);
    doc.text('Summary', 10, y);
    y += 8;
    doc.setFontSize(12);
    doc.text(resumeData.summary, 10, y, { maxWidth: 190 });
    y += doc.getTextDimensions(resumeData.summary, { maxWidth: 190 }).h + 8;
    doc.line(10, y, 200, y);
    y += 10;

    // Skills
    doc.setFontSize(14);
    doc.text('Skills', 10, y);
    y += 8;
    doc.setFontSize(12);
    resumeData.skills.forEach((skill) => {
      doc.text(`• ${skill}`, 10, y);
      y += 6;
    });
    y += 2;
    doc.line(10, y, 200, y);
    y += 10;

    // Experience
    doc.setFontSize(14);
    doc.text('Experience', 10, y);
    y += 8;
    doc.setFontSize(12);
    resumeData.experiences.forEach((exp) => {
      doc.text(`${exp.jobTitle} at ${exp.employer}, ${exp.city}`, 10, y);
      y += 6;
      doc.text(`${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}`, 10, y);
      y += 8;
    });
    doc.line(10, y, 200, y);
    y += 10;

    // Education
    doc.setFontSize(14);
    doc.text('Education', 10, y);
    y += 8;
    doc.setFontSize(12);
    resumeData.educations.forEach((edu) => {
      doc.text(`${edu.degree}, ${edu.fieldOfStudy}`, 10, y);
      y += 6;
      doc.text(`${edu.schoolName}, ${edu.schoolLocation}`, 10, y);
      y += 6;
      doc.text(`${edu.graduationMonth} ${edu.graduationYear}`, 10, y);
      y += 8;
    });
    doc.line(10, y, 200, y);
    y += 10;

    // Hobbies
    doc.setFontSize(14);
    doc.text('Hobbies and Interests', 10, y);
    y += 8;
    doc.setFontSize(12);
    resumeData.hobbies.forEach((hobby) => {
      doc.text(`• ${hobby}`, 10, y);
      y += 6;
    });
    y += 2;
    doc.line(10, y, 200, y);
    y += 10;

    // Languages
    doc.setFontSize(14);
    doc.text('Languages', 10, y);
    y += 8;
    doc.setFontSize(12);
    resumeData.languages.forEach((language) => {
      doc.text(`• ${language}`, 10, y);
      y += 6;
    });
    y += 2;
    doc.line(10, y, 200, y);
    y += 10;

    // Personal Information
    doc.setFontSize(14);
    doc.text('Personal Information', 10, y);
    y += 8;
    doc.setFontSize(12);
    doc.text(`Date of Birth: ${resumeData.personalInfo.dateOfBirth}`, 10, y);
    y += 6;
    doc.text(`Gender: ${resumeData.personalInfo.gender}`, 10, y);
    y += 6;
    doc.text(`Nationality: ${resumeData.personalInfo.nationality}`, 10, y);
    y += 6;
    doc.text(`Marital Status: ${resumeData.personalInfo.maritalStatus}`, 10, y);

    // Save the PDF
    doc.save('resume.pdf');
  };

  return (
    <Box sx={{ mt: 8, display: 'flex', height: 'calc(100vh - 64px)' }}>
      <Sidebar
        templates={templates}
        selectedTemplate={selectedTemplate}
        setSelectedTemplate={setSelectedTemplate}
        setColor={setColor}
      />
      <Box sx={{ flexGrow: 1, p: 2 }}>
        <Button variant="contained" onClick={generatePDF} sx={{ mb: 2 }}>
          Download PDF
        </Button>
        <ResumePreview
          template={selectedTemplate}
          resumeData={resumeData}
          setResumeData={setResumeData}
          color={color}
        />
      </Box>
    </Box>
  );
}

export default CreateResumePage;
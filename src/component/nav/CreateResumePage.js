import { useState } from 'react';
import { Box, Button } from '@mui/material';
import Sidebar from '../Sidebar';
import ResumePreview from '../ResumePreview';
import jsPDF from 'jspdf';

function CreateResumePage() {
  const templates = [
    { id: 'template1', name: 'Classic Template' },
    { id: 'template2', name: 'Modern Template' },
    { id: 'template3', name: 'Professional Template' },
  ];

  const [selectedTemplate, setSelectedTemplate] = useState(templates[0].id);
  const [color, setColor] = useState('#1976d2');
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
  });

  const generatePDF = () => {
    const doc = new jsPDF();
    let y = 10;

    if (selectedTemplate === 'template3') {
      // Two-column layout: 30% left (~60mm), 70% right (~140mm)
      const leftX = 10;
      const rightX = 70;
      let leftY = y;
      let rightY = y;

      // Background color for left column
      const rgb = hexToRgb(color);
      doc.setFillColor(rgb.r, rgb.g, rgb.b);
      doc.rect(0, 0, 60, 297, 'F'); // Left column: 60mm wide, A4 height

      // Left Column: Contact, Languages, Skills, Certifications, Hobbies
      doc.setFontSize(12);
      doc.setTextColor(255, 255, 255); // White text
      doc.text('Contact', leftX, leftY);
      leftY += 8;
      doc.setFontSize(10);
      doc.text(`${resumeData.heading.city}, ${resumeData.heading.country} ${resumeData.heading.pincode}`, leftX, leftY, { maxWidth: 45 });
      leftY += doc.getTextDimensions(`${resumeData.heading.city}, ${resumeData.heading.country} ${resumeData.heading.pincode}`, { maxWidth: 45 }).h + 2;
      doc.text(`Phone: ${resumeData.heading.phone}`, leftX, leftY);
      leftY += 6;
      doc.text(`Email: ${resumeData.heading.email}`, leftX, leftY, { maxWidth: 45 });
      leftY += doc.getTextDimensions(`Email: ${resumeData.heading.email}`, { maxWidth: 45 }).h + 2;
      doc.text(`LinkedIn: ${resumeData.heading.linkedin}`, leftX, leftY, { maxWidth: 45 });
      leftY += doc.getTextDimensions(`LinkedIn: ${resumeData.heading.linkedin}`, { maxWidth: 45 }).h + 6;

      doc.setFontSize(12);
      doc.text('Languages', leftX, leftY);
      leftY += 8;
      doc.setFontSize(10);
      resumeData.languages.forEach((lang) => {
        doc.text(lang.name, leftX, leftY, { maxWidth: 30 });
        // Draw proficiency bars
        const filled = lang.proficiency === 'Excellent' ? 3 : lang.proficiency === 'Good' ? 2 : 1;
        for (let i = 0; i < 3; i++) {
          doc.setFillColor(i < filled ? 255 : 211, i < filled ? 255 : 211, i < filled ? 255 : 211); // White or light grey
          doc.rect(leftX + 35 + i * 4, leftY - 2, 3, 1, 'F');
        }
        leftY += 6;
      });
      leftY += 6;

      doc.setFontSize(12);
      doc.text('Skills', leftX, leftY);
      leftY += 8;
      doc.setFontSize(10);
      resumeData.skills.forEach((skill) => {
        doc.text(skill.name, leftX, leftY, { maxWidth: 30 });
        // Draw proficiency bars
        const filled = skill.proficiency === 'Excellent' ? 3 : skill.proficiency === 'Good' ? 2 : 1;
        for (let i = 0; i < 3; i++) {
          doc.setFillColor(i < filled ? 255 : 211, i < filled ? 255 : 211, i < filled ? 255 : 211);
          doc.rect(leftX + 35 + i * 4, leftY - 2, 3, 1, 'F');
        }
        leftY += 6;
      });
      leftY += 6;

      doc.setFontSize(12);
      doc.text('Certifications', leftX, leftY);
      leftY += 8;
      doc.setFontSize(10);
      resumeData.certifications.forEach((cert) => {
        doc.text(`${cert.name} (${cert.date})`, leftX, leftY, { maxWidth: 45 });
        leftY += doc.getTextDimensions(`${cert.name} (${cert.date})`, { maxWidth: 45 }).h + 2;
      });
      leftY += 6;

      doc.setFontSize(12);
      doc.text('Hobbies', leftX, leftY);
      leftY += 8;
      doc.setFontSize(10);
      resumeData.hobbies.forEach((hobby) => {
        doc.text(`• ${hobby}`, leftX, leftY, { maxWidth: 45 });
        leftY += doc.getTextDimensions(`• ${hobby}`, { maxWidth: 45 }).h + 2;
      });

      // Right Column: Heading, Summary, Experience, Education, Accomplishments
      doc.setTextColor(0, 0, 0); // Black text
      doc.setFontSize(16);
      doc.text(`${resumeData.heading.firstName} ${resumeData.heading.lastName}`, rightX, rightY);
      rightY += 8;
      doc.setFontSize(12);
      doc.text(resumeData.heading.title, rightX, rightY);
      rightY += 10;

      doc.setFontSize(12);
      doc.text('Summary', rightX, rightY);
      rightY += 8;
      doc.setFontSize(10);
      doc.text(resumeData.summary, rightX, rightY, { maxWidth: 130 });
      rightY += doc.getTextDimensions(resumeData.summary, { maxWidth: 130 }).h + 8;

      doc.setFontSize(12);
      doc.text('Experience', rightX, rightY);
      rightY += 8;
      doc.setFontSize(10);
      resumeData.experiences.forEach((exp) => {
        doc.text(`${exp.jobTitle}, ${exp.employer}, ${exp.city}`, rightX, rightY, { maxWidth: 130 });
        rightY += doc.getTextDimensions(`${exp.jobTitle}, ${exp.employer}, ${exp.city}`, { maxWidth: 130 }).h + 2;
        doc.text(`${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}`, rightX, rightY);
        rightY += 6;
        doc.text(exp.description, rightX, rightY, { maxWidth: 130 });
        rightY += doc.getTextDimensions(exp.description, { maxWidth: 130 }).h + 6;
      });

      doc.setFontSize(12);
      doc.text('Education', rightX, rightY);
      rightY += 8;
      doc.setFontSize(10);
      resumeData.educations.forEach((edu) => {
        doc.text(`${edu.degree}, ${edu.fieldOfStudy}`, rightX, rightY, { maxWidth: 130 });
        rightY += doc.getTextDimensions(`${edu.degree}, ${edu.fieldOfStudy}`, { maxWidth: 130 }).h + 2;
        doc.text(`${edu.schoolName}, ${edu.schoolLocation}`, rightX, rightY, { maxWidth: 130 });
        rightY += doc.getTextDimensions(`${edu.schoolName}, ${edu.schoolLocation}`, { maxWidth: 130 }).h + 2;
        doc.text(`${edu.graduationMonth} ${edu.graduationYear}`, rightX, rightY);
        rightY += 8;
      });

      doc.setFontSize(12);
      doc.text('Accomplishments', rightX, rightY);
      rightY += 8;
      doc.setFontSize(10);
      resumeData.accomplishments.forEach((acc) => {
        doc.text(`• ${acc}`, rightX, rightY, { maxWidth: 130 });
        rightY += doc.getTextDimensions(`• ${acc}`, { maxWidth: 130 }).h + 6;
      });
    } else {
      // Single-column for Classic and Modern Templates
      doc.setFontSize(16);
      doc.text(`${resumeData.heading.firstName} ${resumeData.heading.lastName}`, 10, y);
      y += 10;
      doc.setFontSize(12);
      doc.text(resumeData.heading.title, 10, y);
      y += 6;
      doc.text(`${resumeData.heading.city}, ${resumeData.heading.country} | ${resumeData.heading.pincode}`, 10, y);
      y += 6;
      doc.text(`${resumeData.heading.phone} | ${resumeData.heading.email}`, 10, y);
      y += 6;
      doc.text(`LinkedIn: ${resumeData.heading.linkedin}`, 10, y);
      y += 10;
      doc.line(10, y, 200, y);
      y += 10;

      doc.setFontSize(14);
      doc.text('Summary', 10, y);
      y += 8;
      doc.setFontSize(12);
      doc.text(resumeData.summary, 10, y, { maxWidth: 190 });
      y += doc.getTextDimensions(resumeData.summary, { maxWidth: 190 }).h + 8;
      doc.line(10, y, 200, y);
      y += 10;

      doc.setFontSize(14);
      doc.text('Skills', 10, y);
      y += 8;
      doc.setFontSize(12);
      resumeData.skills.forEach((skill) => {
        doc.text(`• ${skill.name} (${skill.proficiency})`, 10, y);
        y += 6;
      });
      y += 2;
      doc.line(10, y, 200, y);
      y += 10;

      doc.setFontSize(14);
      doc.text('Experience', 10, y);
      y += 8;
      doc.setFontSize(12);
      resumeData.experiences.forEach((exp) => {
        doc.text(`${exp.jobTitle}, ${exp.employer}, ${exp.city}`, 10, y);
        y += 6;
        doc.text(`${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}`, 10, y);
        y += 6;
        doc.text(exp.description, 10, y, { maxWidth: 190 });
        y += doc.getTextDimensions(exp.description, { maxWidth: 190 }).h + 6;
      });
      doc.line(10, y, 200, y);
      y += 10;

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

      doc.setFontSize(14);
      doc.text('Languages', 10, y);
      y += 8;
      doc.setFontSize(12);
      resumeData.languages.forEach((lang) => {
        doc.text(`• ${lang.name} (${lang.proficiency})`, 10, y);
        y += 6;
      });
      y += 2;
      doc.line(10, y, 200, y);
      y += 10;

      doc.setFontSize(14);
      doc.text('Certifications', 10, y);
      y += 8;
      doc.setFontSize(12);
      resumeData.certifications.forEach((cert) => {
        doc.text(`• ${cert.name} (${cert.date})`, 10, y);
        y += 6;
      });
      y += 2;
      doc.line(10, y, 200, y);
      y += 10;

      doc.setFontSize(14);
      doc.text('Accomplishments', 10, y);
      y += 8;
      doc.setFontSize(12);
      resumeData.accomplishments.forEach((acc) => {
        doc.text(`• ${acc}`, 10, y);
        y += 6;
      });
      y += 2;
      doc.line(10, y, 200, y);
      y += 10;

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
    }

    doc.save('resume.pdf');
  };

  // Helper function to convert hex color to RGB
  const hexToRgb = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return { r, g, b };
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
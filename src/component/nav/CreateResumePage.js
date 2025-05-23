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
  const [fontStyle, setFontStyle] = useState('Arial');
  const [fontSize, setFontSize] = useState(10); // px
  const [headingSize, setHeadingSize] = useState(16); // px
  const [sectionSpacing, setSectionSpacing] = useState(6); // mm
  const [paragraphSpacing, setParagraphSpacing] = useState(2); // mm
  const [lineSpacing, setLineSpacing] = useState(1.15); // unitless
  const [sideMargin, setSideMargin] = useState(10); // mm
  const [paragraphIndent, setParagraphIndent] = useState(0); // mm

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
    let y = sideMargin; // Top margin = sideMargin
    const fontMap = { Arial: 'Helvetica', 'Times New Roman': 'Times' };
    doc.setFont(fontMap[fontStyle]);

    if (selectedTemplate === 'template3') {
      // Two-column layout: 30% left (~60mm), 70% right (~140mm)
      const leftX = sideMargin;
      const rightX = sideMargin + 60;
      let leftY = y;
      let rightY = y;

      // Background color for left column
      const rgb = hexToRgb(color);
      doc.setFillColor(rgb.r, rgb.g, rgb.b);
      doc.rect(0, 0, 60, 297, 'F'); // Left column: 60mm wide, A4 height

      // Left Column: Contact, Languages, Skills, Certifications, Hobbies
      doc.setFontSize(headingSize);
      doc.setTextColor(255, 255, 255); // White text
      doc.text('Contact', leftX, leftY);
      leftY += sectionSpacing;
      doc.setFontSize(fontSize);
      doc.text(`${resumeData.heading.city}, ${resumeData.heading.country} ${resumeData.heading.pincode}`, leftX + paragraphIndent, leftY, { maxWidth: 45, lineHeightFactor: lineSpacing });
      leftY += doc.getTextDimensions(`${resumeData.heading.city}, ${resumeData.heading.country} ${resumeData.heading.pincode}`, { maxWidth: 45 }).h + paragraphSpacing;
      doc.text(`Phone: ${resumeData.heading.phone}`, leftX + paragraphIndent, leftY, { lineHeightFactor: lineSpacing });
      leftY += doc.getTextDimensions(`Phone: ${resumeData.heading.phone}`, { maxWidth: 45 }).h + paragraphSpacing;
      doc.text(`Email: ${resumeData.heading.email}`, leftX + paragraphIndent, leftY, { maxWidth: 45, lineHeightFactor: lineSpacing });
      leftY += doc.getTextDimensions(`Email: ${resumeData.heading.email}`, { maxWidth: 45 }).h + paragraphSpacing;
      doc.text(`LinkedIn: ${resumeData.heading.linkedin}`, leftX + paragraphIndent, leftY, { maxWidth: 45, lineHeightFactor: lineSpacing });
      leftY += doc.getTextDimensions(`LinkedIn: ${resumeData.heading.linkedin}`, { maxWidth: 45 }).h + sectionSpacing;

      doc.setFontSize(headingSize);
      doc.text('Languages', leftX, leftY);
      leftY += sectionSpacing;
      doc.setFontSize(fontSize);
      resumeData.languages.forEach((lang) => {
        doc.text(lang.name, leftX + paragraphIndent, leftY, { maxWidth: 30, lineHeightFactor: lineSpacing });
        // Draw proficiency bars
        const filled = lang.proficiency === 'Excellent' ? 3 : lang.proficiency === 'Good' ? 2 : 1;
        for (let i = 0; i < 3; i++) {
          doc.setFillColor(i < filled ? 255 : 211, i < filled ? 255 : 211, i < filled ? 255 : 211); // White or light grey
          doc.rect(leftX + 35 + i * 4, leftY - 2, 3, 1, 'F');
        }
        leftY += 6 + paragraphSpacing;
      });
      leftY += sectionSpacing;

      doc.setFontSize(headingSize);
      doc.text('Skills', leftX, leftY);
      leftY += sectionSpacing;
      doc.setFontSize(fontSize);
      resumeData.skills.forEach((skill) => {
        doc.text(skill.name, leftX + paragraphIndent, leftY, { maxWidth: 30, lineHeightFactor: lineSpacing });
        // Draw proficiency bars
        const filled = skill.proficiency === 'Excellent' ? 3 : skill.proficiency === 'Good' ? 2 : 1;
        for (let i = 0; i < 3; i++) {
          doc.setFillColor(i < filled ? 255 : 211, i < filled ? 255 : 211, i < filled ? 255 : 211);
          doc.rect(leftX + 35 + i * 4, leftY - 2, 3, 1, 'F');
        }
        leftY += 6 + paragraphSpacing;
      });
      leftY += sectionSpacing;

      doc.setFontSize(headingSize);
      doc.text('Certifications', leftX, leftY);
      leftY += sectionSpacing;
      doc.setFontSize(fontSize);
      resumeData.certifications.forEach((cert) => {
        doc.text(`${cert.name} (${cert.date})`, leftX + paragraphIndent, leftY, { maxWidth: 45, lineHeightFactor: lineSpacing });
        leftY += doc.getTextDimensions(`${cert.name} (${cert.date})`, { maxWidth: 45 }).h + paragraphSpacing;
      });
      leftY += sectionSpacing;

      doc.setFontSize(headingSize);
      doc.text('Hobbies', leftX, leftY);
      leftY += sectionSpacing;
      doc.setFontSize(fontSize);
      resumeData.hobbies.forEach((hobby) => {
        doc.text(`• ${hobby}`, leftX + paragraphIndent, leftY, { maxWidth: 45, lineHeightFactor: lineSpacing });
        leftY += doc.getTextDimensions(`• ${hobby}`, { maxWidth: 45 }).h + paragraphSpacing;
      });

      // Right Column: Heading, Summary, Experience, Education, Accomplishments
      doc.setTextColor(0, 0, 0); // Black text
      doc.setFontSize(headingSize + 4); // Larger for name
      doc.text(`${resumeData.heading.firstName} ${resumeData.heading.lastName}`, rightX, rightY);
      rightY += sectionSpacing;
      doc.setFontSize(headingSize);
      doc.text(resumeData.heading.title, rightX, rightY);
      rightY += sectionSpacing;

      doc.setFontSize(headingSize);
      doc.text('Summary', rightX, rightY);
      rightY += sectionSpacing;
      doc.setFontSize(fontSize);
      doc.text(resumeData.summary, rightX + paragraphIndent, rightY, { maxWidth: 130, lineHeightFactor: lineSpacing });
      rightY += doc.getTextDimensions(resumeData.summary, { maxWidth: 130 }).h + sectionSpacing;

      doc.setFontSize(headingSize);
      doc.text('Experience', rightX, rightY);
      rightY += sectionSpacing;
      doc.setFontSize(fontSize);
      resumeData.experiences.forEach((exp) => {
        doc.text(`${exp.jobTitle}, ${exp.employer}, ${exp.city}`, rightX + paragraphIndent, rightY, { maxWidth: 130, lineHeightFactor: lineSpacing });
        rightY += doc.getTextDimensions(`${exp.jobTitle}, ${exp.employer}, ${exp.city}`, { maxWidth: 130 }).h + paragraphSpacing;
        doc.text(`${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}`, rightX + paragraphIndent, rightY, { lineHeightFactor: lineSpacing });
        rightY += doc.getTextDimensions(`${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}`, { maxWidth: 130 }).h + paragraphSpacing;
        doc.text(exp.description, rightX + paragraphIndent, rightY, { maxWidth: 130, lineHeightFactor: lineSpacing });
        rightY += doc.getTextDimensions(exp.description, { maxWidth: 130 }).h + paragraphSpacing;
      });

      doc.setFontSize(headingSize);
      doc.text('Education', rightX, rightY);
      rightY += sectionSpacing;
      doc.setFontSize(fontSize);
      resumeData.educations.forEach((edu) => {
        doc.text(`${edu.degree}, ${edu.fieldOfStudy}`, rightX + paragraphIndent, rightY, { maxWidth: 130, lineHeightFactor: lineSpacing });
        rightY += doc.getTextDimensions(`${edu.degree}, ${edu.fieldOfStudy}`, { maxWidth: 130 }).h + paragraphSpacing;
        doc.text(`${edu.schoolName}, ${edu.schoolLocation}`, rightX + paragraphIndent, rightY, { maxWidth: 130, lineHeightFactor: lineSpacing });
        rightY += doc.getTextDimensions(`${edu.schoolName}, ${edu.schoolLocation}`, { maxWidth: 130 }).h + paragraphSpacing;
        doc.text(`${edu.graduationMonth} ${edu.graduationYear}`, rightX + paragraphIndent, rightY, { lineHeightFactor: lineSpacing });
        rightY += doc.getTextDimensions(`${edu.graduationMonth} ${edu.graduationYear}`, { maxWidth: 130 }).h + paragraphSpacing;
      });

      doc.setFontSize(headingSize);
      doc.text('Accomplishments', rightX, rightY);
      rightY += sectionSpacing;
      doc.setFontSize(fontSize);
      resumeData.accomplishments.forEach((acc) => {
        doc.text(`• ${acc}`, rightX + paragraphIndent, rightY, { maxWidth: 130, lineHeightFactor: lineSpacing });
        rightY += doc.getTextDimensions(`• ${acc}`, { maxWidth: 130 }).h + paragraphSpacing;
      });
    } else {
      // Single-column for Classic and Modern Templates
      doc.setFontSize(headingSize + 4);
      doc.text(`${resumeData.heading.firstName} ${resumeData.heading.lastName}`, sideMargin, y);
      y += sectionSpacing;
      doc.setFontSize(headingSize);
      doc.text(resumeData.heading.title, sideMargin, y);
      y += sectionSpacing;
      doc.setFontSize(fontSize);
      doc.text(`${resumeData.heading.city}, ${resumeData.heading.country} | ${resumeData.heading.pincode}`, sideMargin + paragraphIndent, y, { lineHeightFactor: lineSpacing });
      y += doc.getTextDimensions(`${resumeData.heading.city}, ${resumeData.heading.country} | ${resumeData.heading.pincode}`, { maxWidth: 190 }).h + paragraphSpacing;
      doc.text(`${resumeData.heading.phone} | ${resumeData.heading.email}`, sideMargin + paragraphIndent, y, { lineHeightFactor: lineSpacing });
      y += doc.getTextDimensions(`${resumeData.heading.phone} | ${resumeData.heading.email}`, { maxWidth: 190 }).h + paragraphSpacing;
      doc.text(`LinkedIn: ${resumeData.heading.linkedin}`, sideMargin + paragraphIndent, y, { lineHeightFactor: lineSpacing });
      y += doc.getTextDimensions(`LinkedIn: ${resumeData.heading.linkedin}`, { maxWidth: 190 }).h + sectionSpacing;
      doc.line(sideMargin, y, 210 - sideMargin, y);
      y += sectionSpacing;

      doc.setFontSize(headingSize);
      doc.text('Summary', sideMargin, y);
      y += sectionSpacing;
      doc.setFontSize(fontSize);
      doc.text(resumeData.summary, sideMargin + paragraphIndent, y, { maxWidth: 190 - 2 * sideMargin, lineHeightFactor: lineSpacing });
      y += doc.getTextDimensions(resumeData.summary, { maxWidth: 190 - 2 * sideMargin }).h + sectionSpacing;
      doc.line(sideMargin, y, 210 - sideMargin, y);
      y += sectionSpacing;

      doc.setFontSize(headingSize);
      doc.text('Skills', sideMargin, y);
      y += sectionSpacing;
      doc.setFontSize(fontSize);
      resumeData.skills.forEach((skill) => {
        doc.text(`• ${skill.name} (${skill.proficiency})`, sideMargin + paragraphIndent, y, { lineHeightFactor: lineSpacing });
        y += doc.getTextDimensions(`• ${skill.name} (${skill.proficiency})`, { maxWidth: 190 - 2 * sideMargin }).h + paragraphSpacing;
      });
      doc.line(sideMargin, y, 210 - sideMargin, y);
      y += sectionSpacing;

      doc.setFontSize(headingSize);
      doc.text('Experience', sideMargin, y);
      y += sectionSpacing;
      doc.setFontSize(fontSize);
      resumeData.experiences.forEach((exp) => {
        doc.text(`${exp.jobTitle}, ${exp.employer}, ${exp.city}`, sideMargin + paragraphIndent, y, { lineHeightFactor: lineSpacing });
        y += doc.getTextDimensions(`${exp.jobTitle}, ${exp.employer}, ${exp.city}`, { maxWidth: 190 - 2 * sideMargin }).h + paragraphSpacing;
        doc.text(`${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}`, sideMargin + paragraphIndent, y, { lineHeightFactor: lineSpacing });
        y += doc.getTextDimensions(`${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}`, { maxWidth: 190 - 2 * sideMargin }).h + paragraphSpacing;
        doc.text(exp.description, sideMargin + paragraphIndent, y, { maxWidth: 190 - 2 * sideMargin, lineHeightFactor: lineSpacing });
        y += doc.getTextDimensions(exp.description, { maxWidth: 190 - 2 * sideMargin }).h + paragraphSpacing;
      });
      doc.line(sideMargin, y, 210 - sideMargin, y);
      y += sectionSpacing;

      doc.setFontSize(headingSize);
      doc.text('Education', sideMargin, y);
      y += sectionSpacing;
      doc.setFontSize(fontSize);
      resumeData.educations.forEach((edu) => {
        doc.text(`${edu.degree}, ${edu.fieldOfStudy}`, sideMargin + paragraphIndent, y, { maxWidth: 190 - 2 * sideMargin, lineHeightFactor: lineSpacing });
        y += doc.getTextDimensions(`${edu.degree}, ${edu.fieldOfStudy}`, { maxWidth: 190 - 2 * sideMargin }).h + paragraphSpacing;
        doc.text(`${edu.schoolName}, ${edu.schoolLocation}`, sideMargin + paragraphIndent, y, { maxWidth: 190 - 2 * sideMargin, lineHeightFactor: lineSpacing });
        y += doc.getTextDimensions(`${edu.schoolName}, ${edu.schoolLocation}`, { maxWidth: 190 - 2 * sideMargin }).h + paragraphSpacing;
        doc.text(`${edu.graduationMonth} ${edu.graduationYear}`, sideMargin + paragraphIndent, y, { lineHeightFactor: lineSpacing });
        y += doc.getTextDimensions(`${edu.graduationMonth} ${edu.graduationYear}`, { maxWidth: 190 - 2 * sideMargin }).h + paragraphSpacing;
      });
      doc.line(sideMargin, y, 210 - sideMargin, y);
      y += sectionSpacing;

      doc.setFontSize(headingSize);
      doc.text('Hobbies and Interests', sideMargin, y);
      y += sectionSpacing;
      doc.setFontSize(fontSize);
      resumeData.hobbies.forEach((hobby) => {
        doc.text(`• ${hobby}`, sideMargin + paragraphIndent, y, { lineHeightFactor: lineSpacing });
        y += doc.getTextDimensions(`• ${hobby}`, { maxWidth: 190 - 2 * sideMargin }).h + paragraphSpacing;
      });
      doc.line(sideMargin, y, 210 - sideMargin, y);
      y += sectionSpacing;

      doc.setFontSize(headingSize);
      doc.text('Languages', sideMargin, y);
      y += sectionSpacing;
      doc.setFontSize(fontSize);
      resumeData.languages.forEach((lang) => {
        doc.text(`• ${lang.name} (${lang.proficiency})`, sideMargin + paragraphIndent, y, { lineHeightFactor: lineSpacing });
        y += doc.getTextDimensions(`• ${lang.name} (${lang.proficiency})`, { maxWidth: 190 - 2 * sideMargin }).h + paragraphSpacing;
      });
      doc.line(sideMargin, y, 210 - sideMargin, y);
      y += sectionSpacing;

      doc.setFontSize(headingSize);
      doc.text('Certifications', sideMargin, y);
      y += sectionSpacing;
      doc.setFontSize(fontSize);
      resumeData.certifications.forEach((cert) => {
        doc.text(`• ${cert.name} (${cert.date})`, sideMargin + paragraphIndent, y, { lineHeightFactor: lineSpacing });
        y += doc.getTextDimensions(`• ${cert.name} (${cert.date})`, { maxWidth: 190 - 2 * sideMargin }).h + paragraphSpacing;
      });
      doc.line(sideMargin, y, 210 - sideMargin, y);
      y += sectionSpacing;

      doc.setFontSize(headingSize);
      doc.text('Accomplishments', sideMargin, y);
      y += sectionSpacing;
      doc.setFontSize(fontSize);
      resumeData.accomplishments.forEach((acc) => {
        doc.text(`• ${acc}`, sideMargin + paragraphIndent, y, { lineHeightFactor: lineSpacing });
        y += doc.getTextDimensions(`• ${acc}`, { maxWidth: 190 - 2 * sideMargin }).h + paragraphSpacing;
      });
      doc.line(sideMargin, y, 210 - sideMargin, y);
      y += sectionSpacing;

      doc.setFontSize(headingSize);
      doc.text('Personal Information', sideMargin, y);
      y += sectionSpacing;
      doc.setFontSize(fontSize);
      doc.text(`Date of Birth: ${resumeData.personalInfo.dateOfBirth}`, sideMargin + paragraphIndent, y, { lineHeightFactor: lineSpacing });
      y += doc.getTextDimensions(`Date of Birth: ${resumeData.personalInfo.dateOfBirth}`, { maxWidth: 190 - 2 * sideMargin }).h + paragraphSpacing;
      doc.text(`Gender: ${resumeData.personalInfo.gender}`, sideMargin + paragraphIndent, y, { lineHeightFactor: lineSpacing });
      y += doc.getTextDimensions(`Gender: ${resumeData.personalInfo.gender}`, { maxWidth: 190 - 2 * sideMargin }).h + paragraphSpacing;
      doc.text(`Nationality: ${resumeData.personalInfo.nationality}`, sideMargin + paragraphIndent, y, { lineHeightFactor: lineSpacing });
      y += doc.getTextDimensions(`Nationality: ${resumeData.personalInfo.nationality}`, { maxWidth: 190 - 2 * sideMargin }).h + paragraphSpacing;
      doc.text(`Marital Status: ${resumeData.personalInfo.maritalStatus}`, sideMargin + paragraphIndent, y, { lineHeightFactor: lineSpacing });
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
      <Box sx={{ flexGrow: 1, p: 2 }}>
        <Button variant="contained" onClick={generatePDF} sx={{ mb: 2 }}>
          Download PDF
        </Button>
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
    </Box>
  );
}

export default CreateResumePage;
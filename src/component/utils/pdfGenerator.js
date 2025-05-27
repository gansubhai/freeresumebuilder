import jsPDF from 'jspdf';

function transformSlateJSON(slateJSON) {
  try {
    const nodes = typeof slateJSON === 'string' ? JSON.parse(slateJSON) : slateJSON;
    if (!Array.isArray(nodes)) return '';

    const lines = [];
    nodes.forEach((node) => {
      if (node.type === 'paragraph') {
        const text = node.children.map((child) => child.text).join('');
        lines.push(text);
      } else if (node.type === 'bulleted-list') {
        node.children.forEach((listItem) => {
          if (listItem.type === 'list-item') {
            const text = listItem.children.map((child) => child.text).join('');
            lines.push(`• ${text}`);
          }
        });
      }
    });
    return lines.join('\n');
  } catch (e) {
    console.warn('Invalid Slate JSON:', e);
    return '';
  }
}

export const hexToRgb = (hex) => {
  const validHex = typeof hex === 'string' && hex.startsWith('#') ? hex : '#000000';
  const r = parseInt(validHex.slice(1, 3), 16);
  const g = parseInt(validHex.slice(3, 5), 16);
  const b = parseInt(validHex.slice(5, 7), 16);
  return { r, g, b };
};

export const generatePDF = (
  resumeData = {},
  color = '#000000',
  selectedTemplate = 'template1',
  fontStyle = 'Helvetica',
  fontSize = 10,
  headingSize = 16,
  sectionSpacing = 6,
  paragraphSpacing = 2,
  lineSpacing = 1.15,
  sideMargin = 10,
  paragraphIndent = 0
) => {
  const doc = new jsPDF();
  let y = sideMargin;
  const fontMap = { Arial: 'Helvetica', 'Times New Roman': 'Times', Helvetica: 'Helvetica' };
  doc.setFont(fontMap[fontStyle] || 'Helvetica');

  // Validate resumeData structure
  const safeResumeData = {
    heading: resumeData.heading || {
      firstName: '',
      lastName: '',
      title: '',
      city: '',
      country: '',
      pincode: '',
      phone: '',
      email: '',
      linkedin: '',
    },
    summary: resumeData.summary || '',
    skills: Array.isArray(resumeData.skills) ? resumeData.skills : [],
    experiences: Array.isArray(resumeData.experiences) ? resumeData.experiences : [],
    educations: Array.isArray(resumeData.educations) ? resumeData.educations : [],
    hobbies: Array.isArray(resumeData.hobbies) ? resumeData.hobbies : [],
    languages: Array.isArray(resumeData.languages) ? resumeData.languages : [],
    personalInfo: resumeData.personalInfo || {
      dateOfBirth: '',
      gender: '',
      nationality: '',
      maritalStatus: '',
    },
    certifications: Array.isArray(resumeData.certifications) ? resumeData.certifications : [],
    accomplishments: Array.isArray(resumeData.accomplishments) ? resumeData.accomplishments : [],
    customSections: Array.isArray(resumeData.customSections) ? resumeData.customSections : [],
  };

  // Safe text rendering function
  const safeText = (text, x, y, options = {}) => {
    const validText = typeof text === 'string' ? text : '';
    if (validText && typeof x === 'number' && typeof y === 'number') {
      doc.text(validText, x, y, options);
      return doc.getTextDimensions(validText, options).h;
    }
    return 0;
  };

  if (selectedTemplate === 'template3') {
    const leftX = sideMargin;
    const rightX = sideMargin + 60;
    let leftY = y;
    let rightY = y;

    const rgb = hexToRgb(color);
    doc.setFillColor(rgb.r, rgb.g, rgb.b);
    doc.rect(0, 0, 60, 297, 'F');

    doc.setFontSize(headingSize);
    doc.setTextColor(255, 255, 255);
    leftY += safeText('Contact', leftX, leftY) + sectionSpacing;
    doc.setFontSize(fontSize);
    leftY += safeText(
      `${safeResumeData.heading.city}, ${safeResumeData.heading.country} ${safeResumeData.heading.pincode}`,
      leftX + paragraphIndent,
      leftY,
      { maxWidth: 45, lineHeightFactor: lineSpacing }
    ) + paragraphSpacing;
    leftY += safeText(`Phone: ${safeResumeData.heading.phone}`, leftX + paragraphIndent, leftY, {
      maxWidth: 45,
      lineHeightFactor: lineSpacing,
    }) + paragraphSpacing;
    leftY += safeText(`Email: ${safeResumeData.heading.email}`, leftX + paragraphIndent, leftY, {
      maxWidth: 45,
      lineHeightFactor: lineSpacing,
    }) + paragraphSpacing;
    leftY += safeText(`LinkedIn: ${safeResumeData.heading.linkedin}`, leftX + paragraphIndent, leftY, {
      maxWidth: 45,
      lineHeightFactor: lineSpacing,
    }) + sectionSpacing;

    doc.setFontSize(headingSize);
    leftY += safeText('Languages', leftX, leftY) + sectionSpacing;
    doc.setFontSize(fontSize);
    safeResumeData.languages.forEach((lang) => {
      leftY += safeText(lang.name || '', leftX + paragraphIndent, leftY, {
        maxWidth: 30,
        lineHeightFactor: lineSpacing,
      });
      const filled = lang.proficiency === 'Excellent' ? 3 : lang.proficiency === 'Good' ? 2 : 1;
      for (let i = 0; i < 3; i++) {
        doc.setFillColor(i < filled ? 255 : 211, i < filled ? 255 : 211, i < filled ? 255 : 211);
        doc.rect(leftX + 35 + i * 4, leftY - 2, 3, 1, 'F');
      }
      leftY += 6 + paragraphSpacing;
    });
    leftY += sectionSpacing;

    doc.setFontSize(headingSize);
    leftY += safeText('Skills', leftX, leftY) + sectionSpacing;
    doc.setFontSize(fontSize);
    safeResumeData.skills.forEach((skill) => {
      leftY += safeText(skill.name || '', leftX + paragraphIndent, leftY, {
        maxWidth: 30,
        lineHeightFactor: lineSpacing,
      });
      const filled = skill.proficiency === 'Excellent' ? 3 : skill.proficiency === 'Good' ? 2 : 1;
      for (let i = 0; i < 3; i++) {
        doc.setFillColor(i < filled ? 255 : 211, i < filled ? 255 : 211, i < filled ? 255 : 211);
        doc.rect(leftX + 35 + i * 4, leftY - 2, 3, 1, 'F');
      }
      leftY += 6 + paragraphSpacing;
    });
    leftY += sectionSpacing;

    doc.setFontSize(headingSize);
    leftY += safeText('Certifications', leftX, leftY) + sectionSpacing;
    doc.setFontSize(fontSize);
    safeResumeData.certifications.forEach((cert) => {
      leftY += safeText(`${cert.name || ''} (${cert.date || ''})`, leftX + paragraphIndent, leftY, {
        maxWidth: 45,
        lineHeightFactor: lineSpacing,
      }) + paragraphSpacing;
    });
    leftY += sectionSpacing;

    doc.setFontSize(headingSize);
    leftY += safeText('Hobbies', leftX, leftY) + sectionSpacing;
    doc.setFontSize(fontSize);
    safeResumeData.hobbies.forEach((hobby) => {
      leftY += safeText(`• ${hobby || ''}`, leftX + paragraphIndent, leftY, {
        maxWidth: 45,
        lineHeightFactor: lineSpacing,
      }) + paragraphSpacing;
    });

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(headingSize + 4);
    rightY += safeText(
      `${safeResumeData.heading.firstName} ${safeResumeData.heading.lastName}`,
      rightX,
      rightY
    ) + sectionSpacing;
    doc.setFontSize(headingSize);
    rightY += safeText(safeResumeData.heading.title, rightX, rightY) + sectionSpacing;

    doc.setFontSize(headingSize);
    rightY += safeText('Summary', rightX, rightY) + sectionSpacing;
    doc.setFontSize(fontSize);
    rightY += safeText(transformSlateJSON(safeResumeData.summary), rightX + paragraphIndent, rightY, {
      maxWidth: 130,
      lineHeightFactor: lineSpacing,
    }) + sectionSpacing;

    doc.setFontSize(headingSize);
    rightY += safeText('Experience', rightX, rightY) + sectionSpacing;
    doc.setFontSize(fontSize);
    safeResumeData.experiences.forEach((exp) => {
      rightY += safeText(
        `${exp.jobTitle || ''}, ${exp.employer || ''}, ${exp.city || ''}`,
        rightX + paragraphIndent,
        rightY,
        { maxWidth: 130, lineHeightFactor: lineSpacing }
      ) + paragraphSpacing;
      rightY += safeText(
        `${exp.startDate || ''} - ${exp.current ? 'Present' : exp.endDate || ''}`,
        rightX + paragraphIndent,
        rightY,
        { maxWidth: 130, lineHeightFactor: lineSpacing }
      ) + paragraphSpacing;
      rightY += safeText(exp.description || '', rightX + paragraphIndent, rightY, {
        maxWidth: 130,
        lineHeightFactor: lineSpacing,
      }) + paragraphSpacing;
    });

    doc.setFontSize(headingSize);
    rightY += safeText('Education', rightX, rightY) + sectionSpacing;
    doc.setFontSize(fontSize);
    safeResumeData.educations.forEach((edu) => {
      rightY += safeText(
        `${edu.degree || ''}, ${edu.fieldOfStudy || ''}`,
        rightX + paragraphIndent,
        rightY,
        { maxWidth: 130, lineHeightFactor: lineSpacing }
      ) + paragraphSpacing;
      rightY += safeText(
        `${edu.schoolName || ''}, ${edu.schoolLocation || ''}`,
        rightX + paragraphIndent,
        rightY,
        { maxWidth: 130, lineHeightFactor: lineSpacing }
      ) + paragraphSpacing;
      rightY += safeText(
        `${edu.graduationMonth || ''} ${edu.graduationYear || ''}`,
        rightX + paragraphIndent,
        rightY,
        { maxWidth: 130, lineHeightFactor: lineSpacing }
      ) + paragraphSpacing;
    });

    doc.setFontSize(headingSize);
    rightY += safeText('Accomplishments', rightX, rightY) + sectionSpacing;
    doc.setFontSize(fontSize);
    safeResumeData.accomplishments.forEach((acc) => {
      rightY += safeText(`• ${acc || ''}`, rightX + paragraphIndent, rightY, {
        maxWidth: 130,
        lineHeightFactor: lineSpacing,
      }) + paragraphSpacing;
    });

    safeResumeData.customSections.forEach((section) => {
      doc.setFontSize(headingSize);
      rightY += safeText(section.heading || '', rightX, rightY) + sectionSpacing;
      doc.setFontSize(fontSize);
      rightY += safeText(section.description || '', rightX + paragraphIndent, rightY, {
        maxWidth: 130,
        lineHeightFactor: lineSpacing,
      }) + sectionSpacing;
    });
  } else {
    doc.setFontSize(headingSize + 4);
    y += safeText(
      `${safeResumeData.heading.firstName} ${safeResumeData.heading.lastName}`,
      sideMargin,
      y
    ) + sectionSpacing;
    doc.setFontSize(headingSize);
    y += safeText(safeResumeData.heading.title, sideMargin, y) + sectionSpacing;
    doc.setFontSize(fontSize);
    y += safeText(
      `${safeResumeData.heading.city}, ${safeResumeData.heading.country} | ${safeResumeData.heading.pincode}`,
      sideMargin + paragraphIndent,
      y,
      { maxWidth: 190, lineHeightFactor: lineSpacing }
    ) + paragraphSpacing;
    y += safeText(
      `${safeResumeData.heading.phone} | ${safeResumeData.heading.email}`,
      sideMargin + paragraphIndent,
      y,
      { maxWidth: 190, lineHeightFactor: lineSpacing }
    ) + paragraphSpacing;
    y += safeText(`LinkedIn: ${safeResumeData.heading.linkedin}`, sideMargin + paragraphIndent, y, {
      maxWidth: 190,
      lineHeightFactor: lineSpacing,
    }) + sectionSpacing;
    doc.line(sideMargin, y, 210 - sideMargin, y);
    y += sectionSpacing;

    doc.setFontSize(headingSize);
    y += safeText('Summary', sideMargin, y) + sectionSpacing;
    doc.setFontSize(fontSize);
    y += safeText(safeResumeData.summary, sideMargin + paragraphIndent, y, {
      maxWidth: 190 - 2 * sideMargin,
      lineHeightFactor: lineSpacing,
    }) + sectionSpacing;
    doc.line(sideMargin, y, 210 - sideMargin, y);
    y += sectionSpacing;

    doc.setFontSize(headingSize);
    y += safeText('Skills', sideMargin, y) + sectionSpacing;
    doc.setFontSize(fontSize);
    safeResumeData.skills.forEach((skill) => {
      y += safeText(
        `• ${skill.name || ''} (${skill.proficiency || ''})`,
        sideMargin + paragraphIndent,
        y,
        { maxWidth: 190 - 2 * sideMargin, lineHeightFactor: lineSpacing }
      ) + paragraphSpacing;
    });
    doc.line(sideMargin, y, 210 - sideMargin, y);
    y += sectionSpacing;

    doc.setFontSize(headingSize);
    y += safeText('Experience', sideMargin, y) + sectionSpacing;
    doc.setFontSize(fontSize);
    safeResumeData.experiences.forEach((exp) => {
      y += safeText(
        `${exp.jobTitle || ''}, ${exp.employer || ''}, ${exp.city || ''}`,
        sideMargin + paragraphIndent,
        y,
        { maxWidth: 190 - 2 * sideMargin, lineHeightFactor: lineSpacing }
      ) + paragraphSpacing;
      y += safeText(
        `${exp.startDate || ''} - ${exp.current ? 'Present' : exp.endDate || ''}`,
        sideMargin + paragraphIndent,
        y,
        { maxWidth: 190 - 2 * sideMargin, lineHeightFactor: lineSpacing }
      ) + paragraphSpacing;
      y += safeText(exp.description || '', sideMargin + paragraphIndent, y, {
        maxWidth: 190 - 2 * sideMargin,
        lineHeightFactor: lineSpacing,
      }) + paragraphSpacing;
    });
    doc.line(sideMargin, y, 210 - sideMargin, y);
    y += sectionSpacing;

    doc.setFontSize(headingSize);
    y += safeText('Education', sideMargin, y) + sectionSpacing;
    doc.setFontSize(fontSize);
    safeResumeData.educations.forEach((edu) => {
      y += safeText(
        `${edu.degree || ''}, ${edu.fieldOfStudy || ''}`,
        sideMargin + paragraphIndent,
        y,
        { maxWidth: 190 - 2 * sideMargin, lineHeightFactor: lineSpacing }
      ) + paragraphSpacing;
      y += safeText(
        `${edu.schoolName || ''}, ${edu.schoolLocation || ''}`,
        sideMargin + paragraphIndent,
        y,
        { maxWidth: 190 - 2 * sideMargin, lineHeightFactor: lineSpacing }
      ) + paragraphSpacing;
      y += safeText(
        `${edu.graduationMonth || ''} ${edu.graduationYear || ''}`,
        sideMargin + paragraphIndent,
        y,
        { maxWidth: 190 - 2 * sideMargin, lineHeightFactor: lineSpacing }
      ) + paragraphSpacing;
    });
    doc.line(sideMargin, y, 210 - sideMargin, y);
    y += sectionSpacing;

    doc.setFontSize(headingSize);
    y += safeText('Hobbies and Interests', sideMargin, y) + sectionSpacing;
    doc.setFontSize(fontSize);
    safeResumeData.hobbies.forEach((hobby) => {
      y += safeText(`• ${hobby || ''}`, sideMargin + paragraphIndent, y, {
        maxWidth: 190 - 2 * sideMargin,
        lineHeightFactor: lineSpacing,
      }) + paragraphSpacing;
    });
    doc.line(sideMargin, y, 210 - sideMargin, y);
    y += sectionSpacing;

    doc.setFontSize(headingSize);
    y += safeText('Languages', sideMargin, y) + sectionSpacing;
    doc.setFontSize(fontSize);
    safeResumeData.languages.forEach((lang) => {
      y += safeText(
        `• ${lang.name || ''} (${lang.proficiency || ''})`,
        sideMargin + paragraphIndent,
        y,
        { maxWidth: 190 - 2 * sideMargin, lineHeightFactor: lineSpacing }
      ) + paragraphSpacing;
    });
    doc.line(sideMargin, y, 210 - sideMargin, y);
    y += sectionSpacing;

    doc.setFontSize(headingSize);
    y += safeText('Certifications', sideMargin, y) + sectionSpacing;
    doc.setFontSize(fontSize);
    safeResumeData.certifications.forEach((cert) => {
      y += safeText(
        `• ${cert.name || ''} (${cert.date || ''})`,
        sideMargin + paragraphIndent,
        y,
        { maxWidth: 190 - 2 * sideMargin, lineHeightFactor: lineSpacing }
      ) + paragraphSpacing;
    });
    doc.line(sideMargin, y, 210 - sideMargin, y);
    y += sectionSpacing;

    doc.setFontSize(headingSize);
    y += safeText('Accomplishments', sideMargin, y) + sectionSpacing;
    doc.setFontSize(fontSize);
    safeResumeData.accomplishments.forEach((acc) => {
      y += safeText(`• ${acc || ''}`, sideMargin + paragraphIndent, y, {
        maxWidth: 190 - 2 * sideMargin,
        lineHeightFactor: lineSpacing,
      }) + paragraphSpacing;
    });
    doc.line(sideMargin, y, 210 - sideMargin, y);
    y += sectionSpacing;

    safeResumeData.customSections.forEach((section) => {
      doc.setFontSize(headingSize);
      y += safeText(section.heading || '', sideMargin, y) + sectionSpacing;
      doc.setFontSize(fontSize);
      y += safeText(section.description || '', sideMargin + paragraphIndent, y, {
        maxWidth: 190 - 2 * sideMargin,
        lineHeightFactor: lineSpacing,
      }) + sectionSpacing;
      doc.line(sideMargin, y, 210 - sideMargin, y);
      y += sectionSpacing;
    });
  }

  doc.save('resume.pdf');
};
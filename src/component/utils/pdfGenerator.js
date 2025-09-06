import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';

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
  const validHex = typeof hex === 'string' && hex.startsWith('#') ? hex : '#1e3a8a';
  const r = parseInt(validHex.slice(1, 3), 16);
  const g = parseInt(validHex.slice(3, 5), 16);
  const b = parseInt(validHex.slice(5, 7), 16);
  return { r, g, b };
};

// Main PDF generation function that routes to template-specific functions
const generateDirectPDF = async (resumeData, color, selectedTemplate, fontStyle, fontSize, headingSize, sectionSpacing, paragraphSpacing, lineSpacing, sideMargin, paragraphIndent) => {
  console.log('Generating PDF for template:', selectedTemplate);
  console.log('Template type:', typeof selectedTemplate);
  
  // Route to appropriate template-specific function
  switch (selectedTemplate) {
    case 'template1':
    case 'classic':
      console.log('Using Classic template for PDF generation');
      await generateClassicPDF(resumeData, color, fontStyle, fontSize, headingSize, sectionSpacing, paragraphSpacing, lineSpacing, sideMargin, paragraphIndent);
      break;
    case 'template2':
    case 'modern':
      console.log('Using Modern template for PDF generation');
      await generateModernPDF(resumeData, color, fontStyle, fontSize, headingSize, sectionSpacing, paragraphSpacing, lineSpacing, sideMargin, paragraphIndent);
      break;
    case 'template3':
    case 'professional':
      console.log('Using Professional template for PDF generation');
      await generateProfessionalPDF(resumeData, color, fontStyle, fontSize, headingSize, sectionSpacing, paragraphSpacing, lineSpacing, sideMargin, paragraphIndent);
      break;
    default:
      console.log('Unknown template:', selectedTemplate, 'using Classic as default');
      await generateClassicPDF(resumeData, color, fontStyle, fontSize, headingSize, sectionSpacing, paragraphSpacing, lineSpacing, sideMargin, paragraphIndent);
  }
};

// Classic Template PDF Generation
const generateClassicPDF = async (resumeData, color, fontStyle, fontSize, headingSize, sectionSpacing, paragraphSpacing, lineSpacing, sideMargin, paragraphIndent) => {
  console.log('Classic PDF generation started');
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  // Set up colors
  const colorRgb = hexToRgb(color);
  doc.setDrawColor(colorRgb.r, colorRgb.g, colorRgb.b);
  doc.setTextColor(colorRgb.r, colorRgb.g, colorRgb.b);

  let yPosition = sideMargin;
  const pageWidth = doc.internal.pageSize.getWidth();
  const contentWidth = pageWidth - 2 * sideMargin;

  // Helper function to add text with word wrapping
  const addText = (text, x, y, options = {}) => {
    const { fontSize: textSize = fontSize, fontStyle: textFontStyle = 'helvetica', color: textColor = '#000000', align = 'left' } = options;
    
    // Use only built-in fonts to avoid font loading issues
    const safeFont = textFontStyle === 'Arial' ? 'helvetica' : 'helvetica';
    doc.setFont(safeFont, 'normal');
    doc.setFontSize(textSize);
    
    // Set text color safely
    if (textColor === '#000000') {
      doc.setTextColor(0, 0, 0); // Black
    } else if (textColor === colorRgb) {
      doc.setTextColor(colorRgb.r, colorRgb.g, colorRgb.b);
    } else {
      doc.setTextColor(0, 0, 0); // Default to black
    }
    
    const lines = doc.splitTextToSize(text, contentWidth - x + sideMargin);
    doc.text(lines, x, y);
    return y + (lines.length * textSize * 0.35) + paragraphSpacing;
  };

  // Helper function to add a section header
  const addSectionHeader = (title, y) => {
    y = addText(title, sideMargin, y, { fontSize: headingSize, color: colorRgb, fontStyle: 'helvetica' });
    // Add underline
    doc.setDrawColor(colorRgb.r, colorRgb.g, colorRgb.b);
    doc.line(sideMargin, y - 2, pageWidth - sideMargin, y - 2);
    return y + sectionSpacing;
  };

  // Safe data access
  const safeResumeData = {
    heading: resumeData.heading || {},
    summary: resumeData.summary || '',
    skills: Array.isArray(resumeData.skills) ? resumeData.skills : [],
    experiences: Array.isArray(resumeData.experiences) ? resumeData.experiences : [],
    educations: Array.isArray(resumeData.educations) ? resumeData.educations : [],
    hobbies: Array.isArray(resumeData.hobbies) ? resumeData.hobbies : [],
    languages: Array.isArray(resumeData.languages) ? resumeData.languages : [],
    personalInfo: resumeData.personalInfo || {},
    certifications: Array.isArray(resumeData.certifications) ? resumeData.certifications : [],
    accomplishments: Array.isArray(resumeData.accomplishments) ? resumeData.accomplishments : [],
    customSections: Array.isArray(resumeData.customSections) ? resumeData.customSections : [],
  };

  // Header Section
  const fullName = `${safeResumeData.heading.firstName || ''} ${safeResumeData.heading.lastName || ''}`.trim();
  if (fullName) {
    yPosition = addText(fullName, sideMargin, yPosition, { fontSize: headingSize + 4, fontStyle: 'helvetica', align: 'center' });
  }

  const title = safeResumeData.heading.title || '';
  if (title) {
    yPosition = addText(title, sideMargin, yPosition, { fontSize: fontSize + 2, fontStyle: 'helvetica', align: 'center' });
  }

  // Contact Information
  const contactInfo = [];
  if (safeResumeData.heading.city || safeResumeData.heading.country) {
    contactInfo.push(`${safeResumeData.heading.city || ''}, ${safeResumeData.heading.country || ''}`.replace(/^,\s*|,\s*$/g, ''));
  }
  if (safeResumeData.heading.phone) contactInfo.push(safeResumeData.heading.phone);
  if (safeResumeData.heading.email) contactInfo.push(safeResumeData.heading.email);
  if (safeResumeData.heading.linkedin) contactInfo.push(safeResumeData.heading.linkedin);

  if (contactInfo.length > 0) {
    yPosition = addText(contactInfo.join(' • '), sideMargin, yPosition, { align: 'center' });
  }

  yPosition += sectionSpacing;

  // Professional Summary
  if (safeResumeData.summary) {
    yPosition = addSectionHeader('PROFESSIONAL SUMMARY', yPosition);
    const summaryText = typeof safeResumeData.summary === 'string' && safeResumeData.summary.startsWith('[{')
      ? JSON.parse(safeResumeData.summary).map(node => node.children.map(child => child.text).join('')).join(' ')
      : safeResumeData.summary;
    yPosition = addText(summaryText, sideMargin, yPosition);
  }

  // Skills
  if (safeResumeData.skills.length > 0) {
    yPosition = addSectionHeader('SKILLS', yPosition);
    const skillsText = safeResumeData.skills.map(skill => `${skill.name || ''} (${skill.proficiency || ''})`).join(' • ');
    yPosition = addText(skillsText, sideMargin, yPosition);
  }

  // Work Experience
  if (safeResumeData.experiences.length > 0) {
    yPosition = addSectionHeader('WORK EXPERIENCE', yPosition);
    safeResumeData.experiences.forEach(exp => {
      const jobTitle = exp.jobTitle || '';
      const employer = exp.employer || '';
      const location = exp.city || '';
      const dates = `${exp.startDate || ''} - ${exp.current ? 'Present' : exp.endDate || ''}`;
      
      if (jobTitle) {
        yPosition = addText(jobTitle, sideMargin, yPosition, { fontSize: fontSize + 1, fontStyle: 'helvetica' });
      }
      if (employer || location) {
        yPosition = addText(`${employer}${location ? `, ${location}` : ''}`, sideMargin, yPosition);
      }
      if (dates) {
        yPosition = addText(dates, sideMargin, yPosition, { align: 'right' });
      }
      if (exp.description) {
        yPosition = addText(exp.description, sideMargin, yPosition);
      }
      yPosition += paragraphSpacing;
    });
  }

  // Education
  if (safeResumeData.educations.length > 0) {
    yPosition = addSectionHeader('EDUCATION', yPosition);
    safeResumeData.educations.forEach(edu => {
      const degree = edu.degree || '';
      const field = edu.fieldOfStudy || '';
      const school = edu.schoolName || '';
      const location = edu.schoolLocation || '';
      const graduation = `${edu.graduationMonth || ''} ${edu.graduationYear || ''}`.trim();
      
      if (degree || field) {
        yPosition = addText(`${degree}${field ? `, ${field}` : ''}`, sideMargin, yPosition, { fontSize: fontSize + 1, fontStyle: 'helvetica' });
      }
      if (school || location) {
        yPosition = addText(`${school}${location ? `, ${location}` : ''}`, sideMargin, yPosition);
      }
      if (graduation) {
        yPosition = addText(graduation, sideMargin, yPosition, { align: 'right' });
      }
      yPosition += paragraphSpacing;
    });
  }

  // Languages
  if (safeResumeData.languages.length > 0) {
    yPosition = addSectionHeader('LANGUAGES', yPosition);
    const languagesText = safeResumeData.languages.map(lang => `${lang.name || ''} (${lang.proficiency || ''})`).join(' • ');
    yPosition = addText(languagesText, sideMargin, yPosition);
  }

  // Certifications
  if (safeResumeData.certifications.length > 0) {
    yPosition = addSectionHeader('CERTIFICATIONS', yPosition);
    safeResumeData.certifications.forEach(cert => {
      const certText = `${cert.name || ''}${cert.date ? ` (${cert.date})` : ''}`;
      yPosition = addText(`• ${certText}`, sideMargin, yPosition);
    });
  }

  // Accomplishments
  if (safeResumeData.accomplishments.length > 0) {
    yPosition = addSectionHeader('ACCOMPLISHMENTS', yPosition);
    safeResumeData.accomplishments.forEach(acc => {
      yPosition = addText(`• ${acc}`, sideMargin, yPosition);
    });
  }

  // Custom Sections
  safeResumeData.customSections.forEach(section => {
    if (section.heading) {
      yPosition = addSectionHeader(section.heading.toUpperCase(), yPosition);
      if (section.description) {
        yPosition = addText(section.description, sideMargin, yPosition);
      }
    }
  });

  // Save the PDF
  doc.save('resume.pdf');
  console.log('Classic PDF generated successfully');
};

// Modern Template PDF Generation - Exact Match to Preview
const generateModernPDF = async (resumeData, color, fontStyle, fontSize, headingSize, sectionSpacing, paragraphSpacing, lineSpacing, sideMargin, paragraphIndent) => {
  console.log('Modern PDF generation started');
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const colorRgb = hexToRgb(color);
  let yPosition = sideMargin;
  const pageWidth = doc.internal.pageSize.getWidth();
  const contentWidth = pageWidth - 2 * sideMargin;

  const addText = (text, x, y, options = {}) => {
    const { fontSize: textSize = fontSize, color: textColor = '#000000', align = 'left' } = options;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(textSize);
    doc.setTextColor(textColor === colorRgb ? colorRgb.r : 0, textColor === colorRgb ? colorRgb.g : 0, textColor === colorRgb ? colorRgb.b : 0);
    const lines = doc.splitTextToSize(text, contentWidth - x + sideMargin);
    doc.text(lines, x, y);
    return y + (lines.length * textSize * 0.35) + paragraphSpacing;
  };

  const addSectionHeader = (title, y, x = sideMargin) => {
    // Modern template uses colored underlines like in preview - smaller font for headers
    y = addText(title, x, y, { fontSize: headingSize - 2, color: colorRgb });
    
    // Add complete colored underline across the column width
    doc.setDrawColor(colorRgb.r, colorRgb.g, colorRgb.b);
    doc.setLineWidth(0.5);
    const lineLength = x === sideMargin ? contentWidth * 0.45 : contentWidth * 0.45; // Full column width
    doc.line(x, y - 1, x + lineLength, y - 1);
    doc.setLineWidth(0.1); // Reset line width
    
    return y + sectionSpacing;
  };

  const safeResumeData = {
    heading: resumeData.heading || {},
    summary: resumeData.summary || '',
    skills: Array.isArray(resumeData.skills) ? resumeData.skills : [],
    experiences: Array.isArray(resumeData.experiences) ? resumeData.experiences : [],
    educations: Array.isArray(resumeData.educations) ? resumeData.educations : [],
    languages: Array.isArray(resumeData.languages) ? resumeData.languages : [],
    certifications: Array.isArray(resumeData.certifications) ? resumeData.certifications : [],
    accomplishments: Array.isArray(resumeData.accomplishments) ? resumeData.accomplishments : [],
    personalInfo: resumeData.personalInfo || {},
    customSections: Array.isArray(resumeData.customSections) ? resumeData.customSections : [],
  };

  // 1. LIGHT BLUE HEADER SECTION (like preview) - with more padding
  const headerHeight = 35; // Increased height for better padding
  doc.setFillColor(227, 242, 253); // Light blue background #e3f2fd
  doc.rect(sideMargin, yPosition, contentWidth, headerHeight, 'F');
  
  // Name in large font, left-aligned with more padding
  const fullName = `${safeResumeData.heading.firstName || ''} ${safeResumeData.heading.lastName || ''}`.trim();
  if (fullName) {
    yPosition = addText(fullName, sideMargin + 4, yPosition + 8, { fontSize: 24, color: colorRgb });
  }

  // Job title with more padding
  const title = safeResumeData.heading.jobTitle || '';
  if (title) {
    yPosition = addText(title, sideMargin + 4, yPosition + 3, { fontSize: 16 });
  }

  // Professional Summary in header section with more padding
  if (safeResumeData.summary) {
    const summaryText = typeof safeResumeData.summary === 'string' && safeResumeData.summary.startsWith('[{')
      ? JSON.parse(safeResumeData.summary).map(node => node.children.map(child => child.text).join('')).join(' ')
      : safeResumeData.summary;
    yPosition = addText(summaryText, sideMargin + 4, yPosition + 3);
  }

  yPosition += 12; // More space after header

  // 2. LIGHT GREY CONTACT BOX (like preview) - with smaller font and better spacing
  const contactHeight = 12;
  doc.setFillColor(245, 245, 245); // Light grey background #f5f5f5
  doc.rect(sideMargin, yPosition, contentWidth, contactHeight, 'F');
  
  // Contact info: Email on left, Location on right, vertically centered
  const contactY = yPosition + 6; // Centered vertically in the box
  
  // Email on the left
  if (safeResumeData.heading.email) {
    addText(`Email: ${safeResumeData.heading.email}`, sideMargin + 3, contactY, { fontSize: 11 });
  }
  
  // Phone in the center (if available)
  if (safeResumeData.heading.phone) {
    const phoneText = `Phone: ${safeResumeData.heading.phone}`;
    const phoneWidth = doc.getTextWidth(phoneText);
    const centerX = sideMargin + (contentWidth - phoneWidth) / 2;
    addText(phoneText, centerX, contactY, { fontSize: 11 });
  }
  
  // Location on the right
  if (safeResumeData.heading.city || safeResumeData.heading.country) {
    const location = `${safeResumeData.heading.city || ''}, ${safeResumeData.heading.country || ''}`.replace(/^,\s*|,\s*$/g, '');
    const locationText = `Location: ${location}`;
    const locationWidth = doc.getTextWidth(locationText);
    const rightX = sideMargin + contentWidth - locationWidth - 3;
    addText(locationText, rightX, contactY, { fontSize: 11 });
  }

  yPosition += contactHeight + 8;

  // 3. TWO-COLUMN LAYOUT (50% each like preview)
  const leftColumnX = sideMargin;
  const rightColumnX = sideMargin + (contentWidth * 0.5) + 5;
  const columnWidth = (contentWidth * 0.45);

  // LEFT COLUMN: Work Experience
  let leftY = yPosition;
  if (safeResumeData.experiences.length > 0) {
    leftY = addSectionHeader('WORK EXPERIENCE', leftY, leftColumnX);
    safeResumeData.experiences.forEach(exp => {
      const jobTitle = exp.jobTitle || '';
      const employer = exp.employer || '';
      const location = exp.city || '';
      const dates = `${exp.startDate || ''} - ${exp.current ? 'Present' : exp.endDate || ''}`;
      
      leftY = addText(jobTitle, leftColumnX, leftY, { fontSize: 18, color: '#000000' }); // Job title in black
      leftY = addText(employer, leftColumnX, leftY, { fontSize: 14 }); // Company name smaller and not bold
      
      // Date and location on same line
      const dateLocation = `${dates} | ${location}`;
      leftY = addText(dateLocation, leftColumnX, leftY, { fontSize: 12 });
      
      if (exp.description) {
        const descText = typeof exp.description === 'string' && exp.description.startsWith('[{')
          ? JSON.parse(exp.description).map(node => node.children.map(child => child.text).join('')).join(' ')
          : exp.description;
        leftY = addText(descText, leftColumnX, leftY);
      }
      leftY += paragraphSpacing + 3;
    });
  }

  // RIGHT COLUMN: Skills, Education, Accomplishments, Languages, Personal Information
  let rightY = yPosition;
  
  // Skills with colored boxes (like preview)
  if (safeResumeData.skills.length > 0) {
    rightY = addSectionHeader('SKILLS', rightY, rightColumnX);
    // Skills displayed as individual colored boxes with background and padding
    safeResumeData.skills.forEach(skill => {
      const skillText = skill.name || '';
      const textWidth = doc.getTextWidth(skillText);
      
      // Draw colored background box with more padding
      doc.setFillColor(187, 222, 251); // Light blue background #bbdefb
      doc.roundedRect(rightColumnX, rightY - 4, textWidth + 8, 7, 3, 3, 'F');
      
      // Add text in black with padding
      addText(skillText, rightColumnX + 4, rightY, { fontSize: 12, color: '#000000' });
      rightY += 8; // More space for next skill
    });
    rightY += 3;
  }

  // Education
  if (safeResumeData.educations.length > 0) {
    rightY = addSectionHeader('EDUCATION', rightY, rightColumnX);
    safeResumeData.educations.forEach(edu => {
      const degree = edu.degree || '';
      const field = edu.fieldOfStudy || '';
      const school = edu.schoolName || '';
      const location = edu.schoolLocation || '';
      const graduation = `${edu.graduationMonth || ''}/${edu.graduationYear || ''}`;
      const gpa = edu.gpa || '';
      
      rightY = addText(`${degree}, ${field}`, rightColumnX, rightY, { fontSize: 14, color: '#000000' }); // Degree in black
      rightY = addText(`${school}, ${location}, ${graduation}, GPA: ${gpa}`, rightColumnX, rightY, { fontSize: 14 });
      rightY += 2;
    });
  }

  // Accomplishments
  if (safeResumeData.accomplishments.length > 0) {
    rightY = addSectionHeader('ACCOMPLISHMENTS', rightY, rightColumnX);
    safeResumeData.accomplishments.forEach(acc => {
      rightY = addText(`• ${acc}`, rightColumnX, rightY, { fontSize: 12 }); // Smaller font
    });
    rightY += 3;
  }

  // Languages
  if (safeResumeData.languages.length > 0) {
    rightY = addSectionHeader('LANGUAGES', rightY, rightColumnX);
    safeResumeData.languages.forEach(lang => {
      rightY = addText(`${lang.name || ''} (${lang.proficiency || ''})`, rightColumnX, rightY, { fontSize: 12 }); // Smaller font
    });
    rightY += 3;
  }

  // Personal Information
  if (safeResumeData.personalInfo && Object.keys(safeResumeData.personalInfo).length > 0) {
    rightY = addSectionHeader('PERSONAL INFORMATION', rightY, rightColumnX);
    
    if (safeResumeData.personalInfo.dateOfBirth) {
      rightY = addText(`Date of Birth: ${safeResumeData.personalInfo.dateOfBirth}`, rightColumnX, rightY, { fontSize: 12 }); // Smaller font
    }
    if (safeResumeData.personalInfo.gender) {
      rightY = addText(`Gender: ${safeResumeData.personalInfo.gender}`, rightColumnX, rightY, { fontSize: 12 }); // Smaller font
    }
    if (safeResumeData.personalInfo.nationality) {
      rightY = addText(`Nationality: ${safeResumeData.personalInfo.nationality}`, rightColumnX, rightY, { fontSize: 12 }); // Smaller font
    }
    if (safeResumeData.personalInfo.maritalStatus) {
      rightY = addText(`Marital Status: ${safeResumeData.personalInfo.maritalStatus}`, rightColumnX, rightY, { fontSize: 12 }); // Smaller font
    }
  }

  // Custom Sections
  safeResumeData.customSections.forEach(section => {
    if (section.heading) {
      rightY = addSectionHeader(section.heading.toUpperCase(), rightY, rightColumnX);
      if (section.description) {
        rightY = addText(section.description, rightColumnX, rightY);
      }
    }
  });

  doc.save('resume.pdf');
  console.log('Modern PDF generated successfully');
};

// Professional Template PDF Generation
const generateProfessionalPDF = async (resumeData, color, fontStyle, fontSize, headingSize, sectionSpacing, paragraphSpacing, lineSpacing, sideMargin, paragraphIndent) => {
  console.log('Professional PDF generation started');
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const colorRgb = hexToRgb(color);
  let yPosition = sideMargin;
  const pageWidth = doc.internal.pageSize.getWidth();
  const contentWidth = pageWidth - 2 * sideMargin;

  const addText = (text, x, y, options = {}) => {
    const { fontSize: textSize = fontSize, color: textColor = '#000000', align = 'left' } = options;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(textSize);
    doc.setTextColor(textColor === colorRgb ? colorRgb.r : 0, textColor === colorRgb ? colorRgb.g : 0, textColor === colorRgb ? colorRgb.b : 0);
    const lines = doc.splitTextToSize(text, contentWidth - x + sideMargin);
    doc.text(lines, x, y);
    return y + (lines.length * textSize * 0.35) + paragraphSpacing;
  };

  const addSectionHeader = (title, y) => {
    // Professional template uses bold headers with thick underlines
    y = addText(title, sideMargin, y, { fontSize: headingSize + 1, color: colorRgb });
    
    // Add thick professional underline
    doc.setDrawColor(colorRgb.r, colorRgb.g, colorRgb.b);
    doc.setLineWidth(0.8);
    doc.line(sideMargin, y - 2, pageWidth - sideMargin, y - 2);
    doc.setLineWidth(0.1); // Reset line width
    
    return y + sectionSpacing + 3;
  };

  const safeResumeData = {
    heading: resumeData.heading || {},
    summary: resumeData.summary || '',
    skills: Array.isArray(resumeData.skills) ? resumeData.skills : [],
    experiences: Array.isArray(resumeData.experiences) ? resumeData.experiences : [],
    educations: Array.isArray(resumeData.educations) ? resumeData.educations : [],
    languages: Array.isArray(resumeData.languages) ? resumeData.languages : [],
    certifications: Array.isArray(resumeData.certifications) ? resumeData.certifications : [],
    accomplishments: Array.isArray(resumeData.accomplishments) ? resumeData.accomplishments : [],
    customSections: Array.isArray(resumeData.customSections) ? resumeData.customSections : [],
  };

  // Professional Template: Clean header with distinctive professional styling
  const fullName = `${safeResumeData.heading.firstName || ''} ${safeResumeData.heading.lastName || ''}`.trim();
  if (fullName) {
    yPosition = addText(fullName, sideMargin, yPosition, { fontSize: headingSize + 8, color: colorRgb });
  }

  const title = safeResumeData.heading.title || '';
  if (title) {
    yPosition = addText(title, sideMargin, yPosition, { fontSize: fontSize + 4, color: '#666666' });
  }

  // Add professional double line divider
  doc.setDrawColor(colorRgb.r, colorRgb.g, colorRgb.b);
  doc.line(sideMargin, yPosition + 3, pageWidth - sideMargin, yPosition + 3);
  doc.line(sideMargin, yPosition + 5, pageWidth - sideMargin, yPosition + 5);
  yPosition += 10;

  // Contact information in professional format with better spacing
  const contactInfo = [];
  if (safeResumeData.heading.phone) contactInfo.push(`Phone: ${safeResumeData.heading.phone}`);
  if (safeResumeData.heading.email) contactInfo.push(`Email: ${safeResumeData.heading.email}`);
  if (safeResumeData.heading.city || safeResumeData.heading.country) {
    contactInfo.push(`Location: ${safeResumeData.heading.city || ''}, ${safeResumeData.heading.country || ''}`.replace(/^,\s*|,\s*$/g, ''));
  }
  if (safeResumeData.heading.linkedin) contactInfo.push(`LinkedIn: ${safeResumeData.heading.linkedin}`);

  if (contactInfo.length > 0) {
    contactInfo.forEach(info => {
      yPosition = addText(info, sideMargin, yPosition, { fontSize: fontSize - 1 });
    });
  }

  yPosition += sectionSpacing + 5;

  // Professional Summary
  if (safeResumeData.summary) {
    yPosition = addSectionHeader('PROFESSIONAL SUMMARY', yPosition);
    const summaryText = typeof safeResumeData.summary === 'string' && safeResumeData.summary.startsWith('[{')
      ? JSON.parse(safeResumeData.summary).map(node => node.children.map(child => child.text).join('')).join(' ')
      : safeResumeData.summary;
    yPosition = addText(summaryText, sideMargin, yPosition);
  }

  // Skills in professional format
  if (safeResumeData.skills.length > 0) {
    yPosition = addSectionHeader('CORE COMPETENCIES', yPosition);
    const skillsText = safeResumeData.skills.map(skill => `${skill.name || ''} (${skill.proficiency || ''})`).join(' • ');
    yPosition = addText(skillsText, sideMargin, yPosition);
  }

  // Work Experience with professional layout
  if (safeResumeData.experiences.length > 0) {
    yPosition = addSectionHeader('PROFESSIONAL EXPERIENCE', yPosition);
    safeResumeData.experiences.forEach(exp => {
      const jobTitle = exp.jobTitle || '';
      const employer = exp.employer || '';
      const location = exp.city || '';
      const dates = `${exp.startDate || ''} - ${exp.current ? 'Present' : exp.endDate || ''}`;
      
      yPosition = addText(jobTitle, sideMargin, yPosition, { fontSize: fontSize + 2 });
      yPosition = addText(`${employer}${location ? `, ${location}` : ''}`, sideMargin, yPosition);
      yPosition = addText(dates, sideMargin, yPosition);
      if (exp.description) {
        yPosition = addText(exp.description, sideMargin, yPosition);
      }
      yPosition += paragraphSpacing + 2;
    });
  }

  // Education
  if (safeResumeData.educations.length > 0) {
    yPosition = addSectionHeader('EDUCATION', yPosition);
    safeResumeData.educations.forEach(edu => {
      const degree = edu.degree || '';
      const field = edu.fieldOfStudy || '';
      const school = edu.schoolName || '';
      const location = edu.schoolLocation || '';
      const graduation = `${edu.graduationMonth || ''} ${edu.graduationYear || ''}`.trim();
      
      yPosition = addText(`${degree}${field ? `, ${field}` : ''}`, sideMargin, yPosition, { fontSize: fontSize + 1 });
      yPosition = addText(`${school}${location ? `, ${location}` : ''}`, sideMargin, yPosition);
      yPosition = addText(graduation, sideMargin, yPosition);
      yPosition += paragraphSpacing;
    });
  }

  // Languages
  if (safeResumeData.languages.length > 0) {
    yPosition = addSectionHeader('LANGUAGES', yPosition);
    const languagesText = safeResumeData.languages.map(lang => `${lang.name || ''} (${lang.proficiency || ''})`).join(' • ');
    yPosition = addText(languagesText, sideMargin, yPosition);
  }

  // Certifications
  if (safeResumeData.certifications.length > 0) {
    yPosition = addSectionHeader('CERTIFICATIONS', yPosition);
    safeResumeData.certifications.forEach(cert => {
      yPosition = addText(`• ${cert.name || ''}${cert.date ? ` (${cert.date})` : ''}`, sideMargin, yPosition);
    });
  }

  // Accomplishments
  if (safeResumeData.accomplishments.length > 0) {
    yPosition = addSectionHeader('KEY ACHIEVEMENTS', yPosition);
    safeResumeData.accomplishments.forEach(acc => {
      yPosition = addText(`• ${acc}`, sideMargin, yPosition);
    });
  }

  // Custom Sections
  safeResumeData.customSections.forEach(section => {
    if (section.heading) {
      yPosition = addSectionHeader(section.heading.toUpperCase(), yPosition);
      if (section.description) {
        yPosition = addText(section.description, sideMargin, yPosition);
      }
    }
  });

  doc.save('resume.pdf');
  console.log('Professional PDF generated successfully');
};

export const generatePDF = async (
  resumeData = {},
  color = '#1e3a8a',
  selectedTemplate = 'classic',
  fontStyle = 'Helvetica',
  fontSize = 10,
  headingSize = 16,
  sectionSpacing = 6,
  paragraphSpacing = 2,
  lineSpacing = 1.15,
  sideMargin = 10,
  paragraphIndent = 0,
  exportType = 'pdf'
) => {
  // Use direct PDF generation (more reliable than html2canvas)
  if (exportType === 'pdf') {
    console.log('Generating PDF using direct method...');
    await generateDirectPDF(resumeData, color, selectedTemplate, fontStyle, fontSize, headingSize, sectionSpacing, paragraphSpacing, lineSpacing, sideMargin, paragraphIndent);
    return;
  }
  if (exportType === 'text') {
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

    const textContent = `
      ${safeResumeData.heading.firstName} ${safeResumeData.heading.lastName}
      ${safeResumeData.heading.title}
      ${safeResumeData.heading.city}, ${safeResumeData.heading.country} ${safeResumeData.heading.pincode}
      Phone: ${safeResumeData.heading.phone}
      Email: ${safeResumeData.heading.email}
      LinkedIn: ${safeResumeData.heading.linkedin}

      Summary:
      ${transformSlateJSON(safeResumeData.summary)}

      Skills:
      ${safeResumeData.skills.map((skill) => `${skill.name} (${skill.proficiency})`).join('\n')}

      Experience:
      ${safeResumeData.experiences
        .map(
          (exp) =>
            `${exp.jobTitle}, ${exp.employer}, ${exp.city}\n${exp.startDate} - ${exp.current ? 'Present' : exp.endDate
            }\n${transformSlateJSON(exp.description)}`
        )
        .join('\n\n')}

      Education:
      ${safeResumeData.educations
        .map(
          (edu) =>
            `${edu.degree}, ${edu.fieldOfStudy}\n${edu.schoolName}, ${edu.schoolLocation}\n${edu.graduationMonth} ${edu.graduationYear}`
        )
        .join('\n\n')}

      Hobbies:
      ${safeResumeData.hobbies.map((hobby) => `• ${hobby}`).join('\n')}

      Languages:
      ${safeResumeData.languages.map((lang) => `${lang.name} (${lang.proficiency})`).join('\n')}

      Certifications:
      ${safeResumeData.certifications.map((cert) => `${cert.name} (${cert.date})`).join('\n')}

      Accomplishments:
      ${safeResumeData.accomplishments.map((acc) => `• ${acc}`).join('\n')}

      ${safeResumeData.customSections
        .map((section) => `${section.heading}:\n${transformSlateJSON(section.description)}`)
        .join('\n\n')}
    `.trim();

    const blob = new Blob([textContent], { type: 'text/plain' });
    saveAs(blob, 'resume.txt');
    return;
  }

  // Find the resume container element - try multiple approaches
  let element = document.getElementById('resume-container');
  console.log('Looking for resume-container element:', element);
  
  if (!element) {
    console.log('resume-container not found, trying alternative selectors...');
    // Try to find alternative elements
    element = document.querySelector('.MuiPaper-root') || 
              document.querySelector('[class*="template"]') ||
              document.querySelector('[class*="resume"]') ||
              document.querySelector('.resume-preview');
    console.log('Alternative element found:', element);
  }
  
  if (!element) {
    console.error('No resume element found');
    alert('Resume preview not found. Please make sure the preview section is visible.');
    return;
  }

  console.log('Resume container found:', element);
  console.log('Element dimensions:', {
    width: element.offsetWidth,
    height: element.offsetHeight,
    scrollWidth: element.scrollWidth,
    scrollHeight: element.scrollHeight
  });

  // Ensure the preview section is expanded and visible
  const sectionWrapper = element.closest('[data-section="preview"]') || element.closest('.MuiCollapse-root');
  if (sectionWrapper) {
    // Force the section to be visible
    sectionWrapper.style.display = 'block';
    sectionWrapper.style.visibility = 'visible';
    sectionWrapper.style.height = 'auto';
    sectionWrapper.style.overflow = 'visible';
  }

  // Also ensure the parent containers are visible
  const parentContainers = element.closest('.MuiPaper-root');
  if (parentContainers) {
    parentContainers.style.visibility = 'visible';
    parentContainers.style.height = 'auto';
  }

  // Wait a bit for the DOM to update
  await new Promise(resolve => setTimeout(resolve, 100));

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  try {
    console.log('Starting html2canvas rendering...');
    
    // Try different html2canvas configurations
    let canvas;
    try {
      // First try: Standard configuration
      canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        allowTaint: true,
        foreignObjectRendering: true,
        logging: true,
        removeContainer: true,
        imageTimeout: 15000,
      });
    } catch (firstError) {
      console.log('First attempt failed, trying alternative configuration:', firstError);
      // Second try: Alternative configuration
      canvas = await html2canvas(element, {
        scale: 1,
        useCORS: false,
        backgroundColor: '#ffffff',
        allowTaint: false,
        foreignObjectRendering: false,
        logging: true,
        removeContainer: false,
        imageTimeout: 15000,
        onclone: (clonedDoc) => {
          // Ensure all styles are properly applied in the cloned document
          const clonedElement = clonedDoc.getElementById('resume-container');
          if (clonedElement) {
            clonedElement.style.visibility = 'visible';
            clonedElement.style.display = 'block';
            clonedElement.style.height = 'auto';
            clonedElement.style.overflow = 'visible';
          }
        }
      });
    }

    console.log('Canvas created:', canvas);
    console.log('Canvas dimensions:', {
      width: canvas.width,
      height: canvas.height
    });

    // Check if canvas is empty
    if (canvas.width === 0 || canvas.height === 0) {
      console.error('Canvas is empty, trying fallback approach...');
      // Try capturing the entire body
      const fallbackCanvas = await html2canvas(document.body, {
        scale: 1,
        useCORS: true,
        backgroundColor: '#ffffff',
        allowTaint: true,
        logging: true,
      });
      console.log('Fallback canvas:', fallbackCanvas);
      
      if (fallbackCanvas.width === 0 || fallbackCanvas.height === 0) {
        throw new Error('Unable to capture any content');
      }
      
      const imgData = fallbackCanvas.toDataURL('image/jpeg', 0.98);
      const imgProps = doc.getImageProperties(imgData);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * sideMargin;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      doc.addImage(imgData, 'JPEG', sideMargin, sideMargin, pdfWidth, pdfHeight);
      doc.save('resume.pdf');
      console.log('PDF generated successfully with fallback method');
      return;
    }

    const imgData = canvas.toDataURL('image/jpeg', 0.98);
    console.log('Image data length:', imgData.length);
    
    // Test: Create a temporary image to see what was captured
    const testImg = new Image();
    testImg.src = imgData;
    testImg.style.position = 'fixed';
    testImg.style.top = '10px';
    testImg.style.right = '10px';
    testImg.style.border = '2px solid red';
    testImg.style.zIndex = '9999';
    testImg.style.maxWidth = '200px';
    testImg.style.maxHeight = '200px';
    document.body.appendChild(testImg);
    
    // Remove test image after 3 seconds
    setTimeout(() => {
      if (testImg.parentNode) {
        testImg.parentNode.removeChild(testImg);
      }
    }, 3000);
    
    const imgProps = doc.getImageProperties(imgData);
    console.log('Image properties:', imgProps);
    
    const pdfWidth = doc.internal.pageSize.getWidth() - 2 * sideMargin;
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    
    console.log('PDF dimensions:', { pdfWidth, pdfHeight });

    let heightLeft = pdfHeight;
    let position = 0;

    // Add first page
    doc.addImage(imgData, 'JPEG', sideMargin, sideMargin, pdfWidth, pdfHeight);
    heightLeft -= doc.internal.pageSize.getHeight() - 2 * sideMargin;

    // Add additional pages if content overflows
    while (heightLeft > 0) {
      position = heightLeft - pdfHeight;
      doc.addPage();
      doc.addImage(imgData, 'JPEG', sideMargin, position + sideMargin, pdfWidth, pdfHeight);
      heightLeft -= doc.internal.pageSize.getHeight() - 2 * sideMargin;
    }

    doc.save('resume.pdf');
    console.log('PDF generated successfully');
    
    // Additional test: Try to open the PDF in a new tab to verify content
    const pdfBlob = doc.output('blob');
    const pdfUrl = URL.createObjectURL(pdfBlob);
    const testWindow = window.open(pdfUrl, '_blank');
    if (testWindow) {
      console.log('PDF opened in new tab for verification');
      // Clean up the URL after 10 seconds
      setTimeout(() => URL.revokeObjectURL(pdfUrl), 10000);
    }
  } catch (error) {
    console.error('Error generating PDF:', error);
    alert('Error generating PDF. Please try again.');
  } finally {
    // Restore section wrapper state
    if (sectionWrapper) {
      sectionWrapper.style.display = '';
      sectionWrapper.style.visibility = '';
      sectionWrapper.style.height = '';
      sectionWrapper.style.overflow = '';
    }
    if (parentContainers) {
      parentContainers.style.visibility = '';
      parentContainers.style.height = '';
    }
  }
};
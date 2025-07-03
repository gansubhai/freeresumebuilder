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

  const element = document.getElementById('resume-container');
  if (!element) {
    console.error('Resume container not found');
    return;
  }

  // Ensure preview section is expanded for rendering
  const sectionWrapper = element.querySelector('[data-section="preview"]');
  if (sectionWrapper) {
    sectionWrapper.style.display = 'block';
  }

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      backgroundColor: selectedTemplate === 'modern' ? '#ffffff' : '#ffffff', // Match template backgrounds
      width: 210 * 3.78, // A4 width in pixels (approx)
      scrollY: 0,
    });

    const imgData = canvas.toDataURL('image/jpeg', 0.98);
    const imgProps = doc.getImageProperties(imgData);
    const pdfWidth = doc.internal.pageSize.getWidth() - 2 * sideMargin;
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

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
  } catch (error) {
    console.error('Error generating PDF:', error);
  } finally {
    // Restore section wrapper state
    if (sectionWrapper) {
      sectionWrapper.style.display = '';
    }
  }
};
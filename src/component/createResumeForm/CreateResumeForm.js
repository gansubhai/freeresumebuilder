import { Box } from '@mui/material';
import SectionWrapper from '../edit/SectionWrapper';
import HeadingSection from '../edit/HeadingSection';
import SummarySection from '../edit/SummarySection';
import SkillsSection from '../edit/SkillsSection';
import ExperienceSection from '../edit/ExperienceSection';
import EducationSection from '../edit/EducationSection';
import HobbiesSection from '../edit/HobbiesSection';
import LanguagesSection from '../edit/LanguagesSection';
import PersonalInfoSection from '../edit/PersonalInfoSection';
import CertificationsSection from '../edit/CertificationsSection';
import AccomplishmentsSection from '../edit/AccomplishmentsSection';
import CustomSection from '../edit/CustomSection';

function CreateResumeForm({
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
    sectionStates,
    toggleSection,
}) {
    const mmToPx = (mm) => mm * 3.78;

    // Update section in resumeData with email deduplication for heading
    const updateSection = (sectionKey) => (updatedData) => {
        if (sectionKey === 'heading' && updatedData.email) {
            // Deduplicate emails in heading.email
            const uniqueEmails = Array.from(
                new Set(
                    updatedData.email
                        .split(',')
                        .map((email) => email.trim().toLowerCase())
                        .filter((email) => email)
                )
            );
            updatedData.email = uniqueEmails.join(', ');
        }
        setResumeData({ ...resumeData, [sectionKey]: updatedData });
    };

    const handleAddCustomItem = (sectionIndex) => () => {
        const newCustomSections = [...(resumeData.customSections || [])];
        if (!newCustomSections[sectionIndex]) return;
        newCustomSections[sectionIndex].items = [
            ...(newCustomSections[sectionIndex].items || []),
            { title: '', description: '' },
        ];
        setResumeData({ ...resumeData, customSections: newCustomSections });
    };

    const handleDeleteCustomItem = (sectionIndex) => (itemIndex) => {
        const newCustomSections = [...(resumeData.customSections || [])];
        if (!newCustomSections[sectionIndex]) return;
        newCustomSections[sectionIndex].items = newCustomSections[
            sectionIndex
        ].items.filter((_, i) => i !== itemIndex);
        setResumeData({ ...resumeData, customSections: newCustomSections });
    };

    const handleDeleteCustomSection = (sectionIndex) => () => {
        const newCustomSections = (resumeData.customSections || []).filter(
            (_, i) => i !== sectionIndex
        );
        setResumeData({ ...resumeData, customSections: newCustomSections });
    };

    // Normalize customSections to use 'title' instead of 'heading'
    const normalizedCustomSections = (resumeData.customSections || []).map((section) => ({
        title: section.heading || section.title || 'Untitled Section',
        items: Array.isArray(section.items) ? section.items : [],
    }));

    // Safely access resumeData fields with fallbacks
    const safeResumeData = {
        heading: resumeData.heading || {},
        summary: resumeData.summary || JSON.stringify([{ type: 'paragraph', children: [{ text: '' }] }]),
        skills: resumeData.skills || [],
        experiences: resumeData.experiences || [],
        educations: resumeData.educations || [],
        hobbies: resumeData.hobbies || [],
        languages: resumeData.languages || [],
        personalInfo: resumeData.personalInfo || {},
        certifications: resumeData.certifications || [],
        accomplishments: resumeData.accomplishments || [],
        customSections: resumeData.customSections || [],
    };

    return (
        <Box sx={{ p: 3 }}>
            <SectionWrapper
                title="Heading"
                isOpen={sectionStates.heading}
                toggleSection={() => toggleSection('heading')}
            >
                <HeadingSection
                    heading={safeResumeData.heading}
                    setHeading={updateSection('heading')}
                    color="#fff"
                    fontStyle={fontStyle}
                    fontSize={fontSize}
                    headingSize={headingSize}
                    sectionSpacing={sectionSpacing}
                    paragraphSpacing={paragraphSpacing}
                    lineSpacing={lineSpacing}
                    sideMargin={sideMargin}
                    paragraphIndent={paragraphIndent}
                    setResumeData={setResumeData}
                />
            </SectionWrapper>
            <SectionWrapper
                title="Summary"
                isOpen={sectionStates.summary}
                toggleSection={() => toggleSection('summary')}
            >
                <SummarySection
                    summary={safeResumeData.summary}
                    setSummary={updateSection('summary')}
                    color={color}
                    fontStyle={fontStyle}
                    fontSize={fontSize}
                    headingSize={headingSize}
                    sectionSpacing={sectionSpacing}
                    paragraphSpacing={paragraphSpacing}
                    lineSpacing={lineSpacing}
                    sideMargin={sideMargin}
                    paragraphIndent={paragraphIndent}
                    setResumeData={setResumeData}
                />
            </SectionWrapper>
            <SectionWrapper
                title="Skills"
                isOpen={sectionStates.skills}
                toggleSection={() => toggleSection('skills')}
            >
                <SkillsSection
                    skills={safeResumeData.skills}
                    setSkills={updateSection('skills')}
                    color={color}
                    fontStyle={fontStyle}
                    fontSize={fontSize}
                    headingSize={headingSize}
                    sectionSpacing={sectionSpacing}
                    paragraphSpacing={paragraphSpacing}
                    lineSpacing={lineSpacing}
                    sideMargin={sideMargin}
                    paragraphIndent={paragraphIndent}
                    setResumeData={setResumeData}
                />
            </SectionWrapper>
            <SectionWrapper
                title="Experience"
                isOpen={sectionStates.experience}
                toggleSection={() => toggleSection('experience')}
            >
                <ExperienceSection
                    experiences={safeResumeData.experiences}
                    setExperiences={updateSection('experiences')}
                    color={color}
                    fontStyle={fontStyle}
                    fontSize={fontSize}
                    headingSize={headingSize}
                    sectionSpacing={sectionSpacing}
                    paragraphSpacing={paragraphSpacing}
                    lineSpacing={lineSpacing}
                    sideMargin={sideMargin}
                    paragraphIndent={paragraphIndent}
                    setResumeData={setResumeData}
                />
            </SectionWrapper>
            <SectionWrapper
                title="Education"
                isOpen={sectionStates.education}
                toggleSection={() => toggleSection('education')}
            >
                <EducationSection
                    educations={safeResumeData.educations}
                    setEducations={updateSection('educations')}
                    color={color}
                    fontStyle={fontStyle}
                    fontSize={fontSize}
                    headingSize={headingSize}
                    sectionSpacing={sectionSpacing}
                    paragraphSpacing={paragraphSpacing}
                    lineSpacing={lineSpacing}
                    sideMargin={sideMargin}
                    paragraphIndent={paragraphIndent}
                    setResumeData={setResumeData}
                />
            </SectionWrapper>
            <SectionWrapper
                title="Hobbies and Interests"
                isOpen={sectionStates.hobbies}
                toggleSection={() => toggleSection('hobbies')}
            >
                <HobbiesSection
                    hobbies={safeResumeData.hobbies}
                    setHobbies={updateSection('hobbies')}
                    color={color}
                    fontStyle={fontStyle}
                    fontSize={fontSize}
                    headingSize={headingSize}
                    sectionSpacing={sectionSpacing}
                    paragraphSpacing={paragraphSpacing}
                    lineSpacing={lineSpacing}
                    sideMargin={sideMargin}
                    paragraphIndent={paragraphIndent}
                    setResumeData={setResumeData}
                />
            </SectionWrapper>
            <SectionWrapper
                title="Languages"
                isOpen={sectionStates.languages}
                toggleSection={() => toggleSection('languages')}
            >
                <LanguagesSection
                    languages={safeResumeData.languages}
                    setLanguages={updateSection('languages')}
                    color={color}
                    fontStyle={fontStyle}
                    fontSize={fontSize}
                    headingSize={headingSize}
                    sectionSpacing={sectionSpacing}
                    paragraphSpacing={paragraphSpacing}
                    lineSpacing={lineSpacing}
                    sideMargin={sideMargin}
                    paragraphIndent={paragraphIndent}
                    setResumeData={setResumeData}
                />
            </SectionWrapper>
            <SectionWrapper
                title="Personal Information"
                isOpen={sectionStates.personalInfo}
                toggleSection={() => toggleSection('personalInfo')}
            >
                <PersonalInfoSection
                    personalInfo={safeResumeData.personalInfo}
                    setPersonalInfo={updateSection('personalInfo')}
                    color={color}
                    fontStyle={fontStyle}
                    fontSize={fontSize}
                    headingSize={headingSize}
                    sectionSpacing={sectionSpacing}
                    paragraphSpacing={paragraphSpacing}
                    lineSpacing={lineSpacing}
                    sideMargin={sideMargin}
                    paragraphIndent={paragraphIndent}
                    setResumeData={setResumeData}
                />
            </SectionWrapper>
            <SectionWrapper
                title="Certifications"
                isOpen={sectionStates.certifications}
                toggleSection={() => toggleSection('certifications')}
            >
                <CertificationsSection
                    certifications={safeResumeData.certifications}
                    setCertifications={updateSection('certifications')}
                    color={color}
                    fontStyle={fontStyle}
                    fontSize={fontSize}
                    headingSize={headingSize}
                    sectionSpacing={sectionSpacing}
                    paragraphSpacing={paragraphSpacing}
                    lineSpacing={lineSpacing}
                    sideMargin={sideMargin}
                    paragraphIndent={paragraphIndent}
                    setResumeData={setResumeData}
                />
            </SectionWrapper>
            <SectionWrapper
                title="Accomplishments"
                isOpen={sectionStates.accomplishments}
                toggleSection={() => toggleSection('accomplishments')}
            >
                <AccomplishmentsSection
                    accomplishments={safeResumeData.accomplishments}
                    setAccomplishments={updateSection('accomplishments')}
                    color={color}
                    fontStyle={fontStyle}
                    fontSize={fontSize}
                    headingSize={headingSize}
                    sectionSpacing={sectionSpacing}
                    paragraphSpacing={paragraphSpacing}
                    lineSpacing={lineSpacing}
                    sideMargin={sideMargin}
                    paragraphIndent={paragraphIndent}
                    setResumeData={setResumeData}
                />
            </SectionWrapper>
            {normalizedCustomSections.map((section, index) => (
                <Box key={`custom-section-${index}`} sx={{ mt: mmToPx(sectionSpacing) / 96 }}>
                    <SectionWrapper
                        title={section.title}
                        isOpen={sectionStates.customSections[index]}
                        toggleSection={() => toggleSection('customSections', index)}
                    >
                        <CustomSection
                            section={section}
                            updateSection={(updatedSection) => {
                                const newCustomSections = [...(resumeData.customSections || [])];
                                newCustomSections[index] = { ...updatedSection, heading: updatedSection.title };
                                setResumeData({ ...resumeData, customSections: newCustomSections });
                            }}
                            addItem={handleAddCustomItem(index)}
                            deleteItem={handleDeleteCustomItem(index)}
                            deleteSection={handleDeleteCustomSection(index)}
                            color={color}
                            fontStyle={fontStyle}
                            fontSize={fontSize}
                            headingSize={headingSize}
                            sectionSpacing={sectionSpacing}
                            paragraphSpacing={paragraphSpacing}
                            lineSpacing={lineSpacing}
                            sideMargin={sideMargin}
                            paragraphIndent={paragraphIndent}
                            setResumeData={setResumeData}
                        />
                    </SectionWrapper>
                </Box>
            ))}
        </Box>
    );
}

export default CreateResumeForm;
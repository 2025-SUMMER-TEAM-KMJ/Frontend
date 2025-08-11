'use client';

import Modal from '@/components/common/Modal';
import { useAuthStore } from '@/store/authStore';
import { ResumeFormData } from '@/types';
import { useState } from 'react';
import Step1_BasicInfo from './steps/Step1_BasicInfo';
import Step2_EducationWork from './steps/Step2_EducationWork';
import Step3_Experience from './steps/Step3_Experience';
import Step4_Competencies from './steps/Step4_Competencies';
import Step5_Certifications from './steps/Step5_Certifications';
import Step6_PreferredPosition from './steps/Step6_PreferredPosition';
import Step7_PersonalNarratives from './steps/Step7_PersonalNarratives';

export default function ProfileSetupModal({ profile, onSave, onClose }: Props) {
  const { showProfileSetupModal } = useAuthStore();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<ResumeFormData>>({});

  const handleNext = (data: Partial<ResumeFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setCurrentStep((prev) => prev + 1);
  };

  const handlePrev = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleSave = async (data: Partial<ResumeFormData>) => {
    const finalData = { ...formData, ...data } as ResumeFormData;
    await onSave(finalData);
    onClose();
    setCurrentStep(1); // Reset to first step on close
    setFormData({}); // Clear form data
  };

  if (!showProfileSetupModal) return null;

  return (
    <Modal onClose={onClose} title={`자소서 생성 (${currentStep}/7)`}>
      {
        {
          1: <Step1_BasicInfo defaultValues={{ name: formData.name || '', age: formData.age || 0, gender: formData.gender || '', email: formData.email || '', phone: formData.phone || '' }} onNext={handleNext} />,
          2: <Step2_EducationWork defaultValues={{ education: formData.education || [], workExperience: formData.workExperience || [] }} onNext={handleNext} onPrev={handlePrev} />,
          3: <Step3_Experience defaultValues={{ experience: formData.experience || [] }} onNext={handleNext} onPrev={handlePrev} />,
          4: <Step4_Competencies defaultValues={{ competencies: formData.competencies || [] }} onNext={handleNext} onPrev={handlePrev} />,
          5: <Step5_Certifications defaultValues={{ certifications: formData.certifications || [] }} onNext={handleNext} onPrev={handlePrev} />,
          6: <Step6_PreferredPosition defaultValues={{ preferredPosition: formData.preferredPosition || [] }} onNext={handleNext} onPrev={handlePrev} />,
          7: <Step7_PersonalNarratives defaultValues={{ strengths: formData.personalNarratives?.strengths || '', values: formData.personalNarratives?.values || '', motivation: formData.personalNarratives?.motivation || '' }} onNext={handleSave} onPrev={handlePrev} />,
        }[currentStep]
      }
    </Modal>
  );
}

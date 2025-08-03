'use client';

import { useState } from 'react';
import styled from 'styled-components';
import { useAuthStore } from '@/store/authStore';
import { Profile, ResumeFormData } from '@/types';
import Step1_BasicInfo from './steps/Step1_BasicInfo';
import Step2_EducationWork from './steps/Step2_EducationWork';
import Step3_Experience from './steps/Step3_Experience';
import Step4_Competencies from './steps/Step4_Competencies';
import Step5_Certifications from './steps/Step5_Certifications';
import Step6_PreferredPosition from './steps/Step6_PreferredPosition';
import Step7_PersonalNarratives from './steps/Step7_PersonalNarratives';

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: ${({ theme }) => theme.spacing.xlarge};
  border-radius: 8px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: ${({ theme }) => theme.spacing.large};
`;

interface Props {
  profile: Profile | null;
  onSave: (data: ResumeFormData) => Promise<void>;
  onClose: () => void;
}

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
    <ModalBackdrop onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <Title>자소서 생성 ({currentStep}/7)</Title>
        {
          {
            1: <Step1_BasicInfo defaultValues={formData} onNext={handleNext} />,
            2: <Step2_EducationWork defaultValues={formData} onNext={handleNext} onPrev={handlePrev} />,
            3: <Step3_Experience defaultValues={formData} onNext={handleNext} onPrev={handlePrev} />,
            4: <Step4_Competencies defaultValues={formData} onNext={handleNext} onPrev={handlePrev} />,
            5: <Step5_Certifications defaultValues={formData} onNext={handleNext} onPrev={handlePrev} />,
            6: <Step6_PreferredPosition defaultValues={formData} onNext={handleNext} onPrev={handlePrev} />,
            7: <Step7_PersonalNarratives defaultValues={formData} onNext={handleSave} onPrev={handlePrev} />,
          }[currentStep]
        }
      </ModalContent>
    </ModalBackdrop>
  );
}

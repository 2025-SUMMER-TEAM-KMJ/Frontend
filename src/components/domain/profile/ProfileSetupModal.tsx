'use client';

import { useState } from 'react';
import styled from 'styled-components';
import { useAuthStore } from '@/store/authStore';
import { Profile } from '@/types/profile';
import Step1_BasicInfo from './steps/Step1_BasicInfo';
// Import other steps here

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
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: ${({ theme }) => theme.spacing.large};
`;

interface Props {
  profile: Profile | null;
  onSave: (data: Profile) => Promise<void>;
}

export default function ProfileSetupModal({ profile, onSave }: Props) {
  const { showProfileSetupModal, closeProfileSetupModal } = useAuthStore();
  const [currentStep, setCurrentStep] = useState(1);
  const [profileData, setProfileData] = useState<Partial<Profile>>(profile || {});

  const handleNext = (stepData: any) => {
    const updatedData = { ...profileData, ...stepData };
    setProfileData(updatedData);
    // For simplicity, we'll just have one step. In a real app, you'd increment.
    // setCurrentStep(currentStep + 1);
    
    // Since we only have Step 1 for now, we'll just save.
    handleSave(updatedData as Profile);
  };

  const handleSave = async (finalData: Profile) => {
    await onSave(finalData);
    closeProfileSetupModal();
  };

  if (!showProfileSetupModal) return null;

  return (
    <ModalBackdrop onClick={closeProfileSetupModal}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <Title>프로필 {profile ? '수정' : '생성'}</Title>
        {currentStep === 1 && (
          <Step1_BasicInfo
            defaultValues={profile?.basicInfo}
            onNext={(data) => handleNext({ basicInfo: data })}
          />
        )}
        {/* {currentStep === 2 && <Step2_Skills onNext={...} />} */}
      </ModalContent>
    </ModalBackdrop>
  );
}

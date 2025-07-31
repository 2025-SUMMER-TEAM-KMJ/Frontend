'use client';

import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Profile, WorkExperience } from '@/types/profile';

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
  max-width: 700px;
  max-height: 90vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.medium};
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`;

const ExperienceItemContainer = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => theme.spacing.medium};
  border-radius: 8px;
  margin-bottom: ${({ theme }) => theme.spacing.medium};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.small};
`;

const Input = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.small};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  font-size: 16px;
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 80px;
  padding: ${({ theme }) => theme.spacing.small};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  font-size: 16px;
  resize: vertical;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.small};
`;

const Button = styled.button`
  padding: 10px 20px;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  border: none;

  &.primary {
    background-color: ${({ theme }) => theme.colors.primary};
    color: white;
  }

  &.secondary {
    background-color: ${({ theme }) => theme.colors.lightGray};
    color: ${({ theme }) => theme.colors.textPrimary};
  }

  &.danger {
    background-color: ${({ theme }) => theme.colors.error};
    color: white;
  }
`;

interface Props {
  profile: Profile;
  onSave: (workExperiences: WorkExperience[]) => void;
  onClose: () => void;
}

export default function EditWorkExperienceModal({ profile, onSave, onClose }: Props) {
  const [workExperiences, setWorkExperiences] = useState<WorkExperience[]>(profile.workExperience);

  useEffect(() => {
    setWorkExperiences(profile.workExperience);
  }, [profile.workExperience]);

  const handleInputChange = (index: number, field: keyof WorkExperience, value: string) => {
    const newExperiences = [...workExperiences];
    newExperiences[index] = { ...newExperiences[index], [field]: value };
    setWorkExperiences(newExperiences);
  };

  const handleAddExperience = () => {
    setWorkExperiences([...workExperiences, { id: Date.now().toString(), company: '', position: '', startDate: '', endDate: '', description: '' }]);
  };

  const handleDeleteExperience = (id: string) => {
    setWorkExperiences(workExperiences.filter(exp => exp.id !== id));
  };

  const handleSave = () => {
    onSave(workExperiences);
  };

  return (
    <ModalBackdrop onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <Title>경력 수정</Title>
        {workExperiences.map((exp, index) => (
          <ExperienceItemContainer key={exp.id}>
            <Input
              type="text"
              placeholder="회사명"
              value={exp.company}
              onChange={(e) => handleInputChange(index, 'company', e.target.value)}
            />
            <Input
              type="text"
              placeholder="직책"
              value={exp.position}
              onChange={(e) => handleInputChange(index, 'position', e.target.value)}
            />
            <Input
              type="text"
              placeholder="시작일 (YYYY-MM)"
              value={exp.startDate}
              onChange={(e) => handleInputChange(index, 'startDate', e.target.value)}
            />
            <Input
              type="text"
              placeholder="종료일 (YYYY-MM) 또는 '현재'"
              value={exp.endDate}
              onChange={(e) => handleInputChange(index, 'endDate', e.target.value)}
            />
            <TextArea
              placeholder="주요 업무 및 성과"
              value={exp.description}
              onChange={(e) => handleInputChange(index, 'description', e.target.value)}
            />
            <Button className="danger" onClick={() => handleDeleteExperience(exp.id)}>삭제</Button>
          </ExperienceItemContainer>
        ))}
        <Button className="secondary" onClick={handleAddExperience}>경력 추가</Button>
        <ButtonContainer>
          <Button className="secondary" onClick={onClose}>취소</Button>
          <Button className="primary" onClick={handleSave}>저장</Button>
        </ButtonContainer>
      </ModalContent>
    </ModalBackdrop>
  );
}

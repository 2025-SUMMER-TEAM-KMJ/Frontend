'use client';

import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Profile, ProjectExperience } from '@/types/profile';

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

const ProjectItemContainer = styled.div`
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
    color: ${({ theme }) => theme.colors.text};
  }

  &.danger {
    background-color: ${({ theme }) => theme.colors.error};
    color: white;
  }
`;

interface Props {
  profile: Profile;
  onSave: (projectExperiences: ProjectExperience[]) => void;
  onClose: () => void;
}

export default function EditProjectExperienceModal({ profile, onSave, onClose }: Props) {
  const [projectExperiences, setProjectExperiences] = useState<ProjectExperience[]>(profile.projectExperience);

  useEffect(() => {
    setProjectExperiences(profile.projectExperience);
  }, [profile.projectExperience]);

  const handleInputChange = (index: number, field: keyof ProjectExperience, value: string) => {
    const newExperiences = [...projectExperiences];
    newExperiences[index] = { ...newExperiences[index], [field]: value };
    setProjectExperiences(newExperiences);
  };

  const handleAddProject = () => {
    setProjectExperiences([...projectExperiences, { id: Date.now().toString(), title: '', startDate: '', endDate: '', description: '' }]);
  };

  const handleDeleteProject = (id: string) => {
    setProjectExperiences(projectExperiences.filter(proj => proj.id !== id));
  };

  const handleSave = () => {
    onSave(projectExperiences);
  };

  return (
    <ModalBackdrop onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <Title>프로젝트 수정</Title>
        {projectExperiences.map((proj, index) => (
          <ProjectItemContainer key={proj.id}>
            <Input
              type="text"
              placeholder="프로젝트명"
              value={proj.title}
              onChange={(e) => handleInputChange(index, 'title', e.target.value)}
            />
            <Input
              type="text"
              placeholder="시작일 (YYYY-MM)"
              value={proj.startDate}
              onChange={(e) => handleInputChange(index, 'startDate', e.target.value)}
            />
            <Input
              type="text"
              placeholder="종료일 (YYYY-MM) 또는 '현재'"
              value={proj.endDate}
              onChange={(e) => handleInputChange(index, 'endDate', e.target.value)}
            />
            <TextArea
              placeholder="주요 역할 및 성과"
              value={proj.description}
              onChange={(e) => handleInputChange(index, 'description', e.target.value)}
            />
            <Button className="danger" onClick={() => handleDeleteProject(proj.id)}>삭제</Button>
          </ProjectItemContainer>
        ))}
        <Button className="secondary" onClick={handleAddProject}>프로젝트 추가</Button>
        <ButtonContainer>
          <Button className="secondary" onClick={onClose}>취소</Button>
          <Button className="primary" onClick={handleSave}>저장</Button>
        </ButtonContainer>
      </ModalContent>
    </ModalBackdrop>
  );
}

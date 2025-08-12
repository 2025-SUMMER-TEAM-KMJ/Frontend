'use client';

import Modal from '@/components/common/Modal';
import { ProjectExperience } from '@/types/profile';
import { ko } from 'date-fns/locale';
import { useEffect, useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';

registerLocale('ko', ko);

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
  min-height: 150px;
  padding: ${({ theme }) => theme.spacing.small};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.main}; /* Added font change */
  resize: none;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 4px;
  display: block;
`;

const DateRangeContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.medium};
  width: 100%;

  & > div {
    flex: 1;
  }
`;



const StyledDatePicker = styled(DatePicker)`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.small};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.main};
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
    <Modal onClose={onClose} title="프로젝트 수정">
      {projectExperiences.map((proj, index) => (
        <ProjectItemContainer key={proj.id}>
          <Label>프로젝트명</Label>
          <Input
            type="text"
            value={proj.title}
            onChange={(e) => handleInputChange(index, 'title', e.target.value)}
          />
          <DateRangeContainer>
            <div>
              <Label>시작일</Label>
              <StyledDatePicker
                selected={proj.startDate && !isNaN(new Date(proj.startDate).getTime()) ? new Date(proj.startDate) : null}
                onChange={(date: Date) => handleInputChange(index, 'startDate', date ? `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}` : '')}
                dateFormat="yyyy-MM"
                showMonthYearPicker
                locale="ko"
              />
            </div>
            <div>
              <Label>종료일</Label>
              <StyledDatePicker
                selected={proj.endDate && proj.endDate !== '현재' && !isNaN(new Date(proj.endDate).getTime()) ? new Date(proj.endDate) : null}
                onChange={(date: Date) => handleInputChange(index, 'endDate', date ? `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}` : '')}
                dateFormat="yyyy-MM"
                showMonthYearPicker
                locale="ko"
                placeholderText="선택 또는 '현재' 입력"
              />
            </div>
          </DateRangeContainer>
          <Label>주요 역할 및 성과</Label>
          <TextArea
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
    </Modal>
  );
}

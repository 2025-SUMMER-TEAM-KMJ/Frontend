'use client';

import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Profile, WorkExperience } from '@/types/profile';
import Modal from '@/components/common/Modal';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/locale';

registerLocale('ko', ko);

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
  font-family: ${({ theme }) => theme.fonts.main}; /* Added font change */
  resize: vertical;
`;

const StyledDatePicker = styled(DatePicker)`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.small};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.main};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05); /* Subtle shadow for the input */
  transition: all 0.3s ease; /* Smooth transitions for hover/focus */
  cursor: pointer; /* Indicate interactivity */

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary}; /* Highlight on hover */
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary}; /* Primary color border on focus */
    box-shadow: 0 0 0 3px rgba(0, 112, 243, 0.2); /* Light primary color glow on focus */
  }

  /* Styling for the calendar popup itself */
  .react-datepicker-popper {
    z-index: 9999; /* Ensure it's above other elements */
  }

  .react-datepicker {
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* Deeper shadow for the popup */
    font-family: ${({ theme }) => theme.fonts.main};
    background-color: ${({ theme }) => theme.colors.background}; /* Use theme background */
  }

  .react-datepicker__header {
    background-color: ${({ theme }) => theme.colors.lightGray}; /* Light gray header */
    border-bottom: none;
    padding-top: ${({ theme }) => theme.spacing.small};
  }

  .react-datepicker__navigation {
    top: ${({ theme }) => theme.spacing.small};
  }

  .react-datepicker__current-month {
    font-weight: bold;
    font-size: 18px;
    color: ${({ theme }) => theme.colors.text};
  }

  .react-datepicker__day-name {
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  .react-datepicker__day--selected,
  .react-datepicker__day--keyboard-selected {
    background-color: ${({ theme }) => theme.colors.primary};
    color: white;
    border-radius: 50%;
  }

  .react-datepicker__day--in-selecting-range,
  .react-datepicker__day--in-range {
    background-color: ${({ theme }) => theme.colors.primary}20; /* Light primary background for range */
    color: ${({ theme }) => theme.colors.text};
    border-radius: 0;
  }

  .react-datepicker__day:hover {
    background-color: ${({ theme }) => theme.colors.lightGray};
    border-radius: 50%;
  }
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 4px;
  display: block;
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
    <Modal onClose={onClose} title="경력 수정">
      {workExperiences.map((exp, index) => (
        <ExperienceItemContainer key={exp.id}>
          <Label>회사명</Label>
          <Input
            type="text"
            value={exp.company}
            onChange={(e) => handleInputChange(index, 'company', e.target.value)}
          />
          <Label>직책</Label>
          <Input
            type="text"
            value={exp.position}
            onChange={(e) => handleInputChange(index, 'position', e.target.value)}
          />
          <Label>시작일 (YYYY-MM)</Label>
          <StyledDatePicker
            selected={exp.startDate ? new Date(exp.startDate) : null}
            onChange={(date: Date) => handleInputChange(index, 'startDate', date ? `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}` : '')}
            dateFormat="yyyy-MM"
            showMonthYearPicker
            locale="ko"
          />
          <Label>종료일 (YYYY-MM) 또는 '현재'</Label>
          <StyledDatePicker
            selected={exp.endDate && exp.endDate !== '현재' ? new Date(exp.endDate) : null}
            onChange={(date: Date) => handleInputChange(index, 'endDate', date ? `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}` : '')}
            dateFormat="yyyy-MM"
            showMonthYearPicker
            locale="ko"
            placeholderText="선택 또는 '현재' 입력"
          />
          <Label>주요 업무 및 성과</Label>
          <TextArea
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
    </Modal>
  );
}

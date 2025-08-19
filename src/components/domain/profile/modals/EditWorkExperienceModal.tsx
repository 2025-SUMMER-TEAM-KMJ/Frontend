'use client';

import Modal from '@/components/common/Modal';
import { WorkExperience } from '@/types/profile';
import { ko } from 'date-fns/locale';
import { useEffect, useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';
import { FaTimes } from 'react-icons/fa';

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
  position: relative; /* Added for absolute positioning of delete icon */
`;

const DeleteIcon = styled.span`
  position: absolute;
  top: ${({ theme }) => theme.spacing.small};
  right: ${({ theme }) => theme.spacing.small};
  cursor: pointer;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 20px;

  &:hover {
    color: ${({ theme }) => theme.colors.error};
  }
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

const DateRangeContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.medium};
  width: 100%; /* Ensure it takes full width */

  & > div {
    flex: 1; /* Distribute space equally */
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

const Label = styled.label`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondary};
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

const CenteredButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${({ theme }) => theme.spacing.medium};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`;

export default function EditWorkExperienceModal({ profile, onSave, onClose }: Props) {
  const [workExperiences, setWorkExperiences] = useState<WorkExperience[]>(profile.work_experience);

  useEffect(() => {
    setWorkExperiences(profile.work_experience);
  }, [profile.work_experience]);

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
          <DateRangeContainer>
            <div>
              <Label>시작일</Label>
              <StyledDatePicker
                selected={exp.startDate && !isNaN(new Date(exp.startDate).getTime()) ? new Date(exp.startDate) : null}
                onChange={(date: Date) => handleInputChange(index, 'startDate', date ? `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}` : '')}
                dateFormat="yyyy-MM"
                showMonthYearPicker
                locale="ko"
              />
            </div>
            <div>
              <Label>종료일</Label>
              <StyledDatePicker
                selected={exp.endDate && exp.endDate !== '현재' && !isNaN(new Date(exp.endDate).getTime()) ? new Date(exp.endDate) : null}
                onChange={(date: Date) => handleInputChange(index, 'endDate', date ? `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}` : '')}
                dateFormat="yyyy-MM"
                showMonthYearPicker
                locale="ko"
                placeholderText=""
              />
            </div>
          </DateRangeContainer>
          <Label>주요 업무 및 성과</Label>
          <TextArea
            value={exp.description}
            onChange={(e) => handleInputChange(index, 'description', e.target.value)}
          />
          <DeleteIcon onClick={() => handleDeleteExperience(exp.id)}><FaTimes /></DeleteIcon>
        </ExperienceItemContainer>
      ))}
      <CenteredButtonContainer>
        <Button className="secondary" onClick={handleAddExperience}>경력 추가</Button>
      </CenteredButtonContainer>
      <ButtonContainer>
        <Button className="primary" onClick={handleSave}>저장</Button>
      </ButtonContainer>
    </Modal>
  );
}
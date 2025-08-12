'use client';

import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Profile, Education } from '@/types/profile';
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

const EducationItemContainer = styled.div`
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
  resize: none;
`;

const Label = styled.label`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondary};
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

export default function EditEducationModal({ profile, onSave, onClose }: Props) {
  const [education, setEducation] = useState<Education[]>(profile.education);

  useEffect(() => {
    setEducation(profile.education);
  }, [profile.education]);

  const handleInputChange = (index: number, field: keyof Education, value: string) => {
    const newEducation = [...education];
    newEducation[index] = { ...newEducation[index], [field]: value };
    setEducation(newEducation);
  };

  const handleAddEducation = () => {
    setEducation([...education, { id: Date.now().toString(), institution: '', major: '', startDate: '', endDate: '' }]);
  };

  const handleDeleteEducation = (id: string) => {
    setEducation(education.filter(edu => edu.id !== id));
  };

  const handleSave = () => {
    onSave(education);
  };

  return (
    <Modal onClose={onClose} title="학력 수정">
      {education.map((edu, index) => (
        <EducationItemContainer key={edu.id}>
          <Label>학교명</Label>
          <Input
            type="text"
            value={edu.institution}
            onChange={(e) => handleInputChange(index, 'institution', e.target.value)}
          />
          <Label>전공</Label>
          <Input
            type="text"
            value={edu.major}
            onChange={(e) => handleInputChange(index, 'major', e.target.value)}
          />
          <DateRangeContainer>
            <div>
              <Label>시작일</Label>
              <StyledDatePicker
                selected={edu.startDate && !isNaN(new Date(edu.startDate).getTime()) ? new Date(edu.startDate) : null}
                onChange={(date: Date) => handleInputChange(index, 'startDate', date ? `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}` : '')}
                dateFormat="yyyy-MM"
                showMonthYearPicker
                locale="ko"
              />
            </div>
            <div>
              <Label>종료일</Label>
              <StyledDatePicker
                selected={edu.endDate && edu.endDate !== '현재' && !isNaN(new Date(edu.endDate).getTime()) ? new Date(edu.endDate) : null}
                onChange={(date: Date) => handleInputChange(index, 'endDate', date ? `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}` : '')}
                dateFormat="yyyy-MM"
                showMonthYearPicker
                locale="ko"
                placeholderText=""
              />
            </div>
          </DateRangeContainer>
          <Button className="danger" onClick={() => handleDeleteEducation(edu.id)}>삭제</Button>
        </EducationItemContainer>
      ))}
      <Button className="secondary" onClick={handleAddEducation}>학력 추가</Button>
      <ButtonContainer>
        <Button className="primary" onClick={handleSave}>저장</Button>
      </ButtonContainer>
    </Modal>
  );
}
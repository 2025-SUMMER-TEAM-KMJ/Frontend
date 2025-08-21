'use client';

import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Profile, Education } from '@/types/api';
import Modal from '@/components/common/Modal';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/locale';

import { FaTimes } from 'react-icons/fa';

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

const CenteredButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${({ theme }) => theme.spacing.medium};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`;

export default function EditEducationModal({ profile, onSave, onClose }: Props) {
  const [education, setEducation] = useState<Education[]>(profile.educations);

  useEffect(() => {
    setEducation(profile.educations);
  }, [profile.educations]);

  const handleInputChange = (index: number, field: keyof Education, value: string) => {
    const newEducation = [...education];
    newEducation[index] = { ...newEducation[index], [field]: value };
    setEducation(newEducation);
  };

  const handleAddEducation = () => {
    setEducation([...education, { school_name: '', major: '', start_date: '', end_date: '' }]);
  };

  const handleDeleteEducation = (index: number) => {
    const newEducation = [...education];
    newEducation.splice(index, 1);
    setEducation(newEducation);
  };

  const handleSave = () => {
    const educationToSave = education.map(edu => ({
      ...edu,
      end_date: edu.end_date === '' ? null : edu.end_date,
    }));
    onSave(educationToSave);
  };

  return (
    <Modal onClose={onClose} title="학력 수정">
      {education.map((edu, index) => (
        <EducationItemContainer key={index}>
          <Label>학교명</Label>
          <Input
            type="text"
            value={edu.school_name}
            onChange={(e) => handleInputChange(index, 'school_name', e.target.value)}
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
                selected={edu.start_date && !isNaN(new Date(edu.start_date).getTime()) ? new Date(edu.start_date) : null}
                onChange={(date: Date) => handleInputChange(index, 'start_date', date ? `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}` : '')}
                dateFormat="yyyy-MM"
                showMonthYearPicker
                locale="ko"
              />
            </div>
            <div>
              <Label>종료일</Label>
              <StyledDatePicker
                selected={edu.end_date && edu.end_date !== '현재' && !isNaN(new Date(edu.end_date).getTime()) ? new Date(edu.end_date) : null}
                onChange={(date: Date) => handleInputChange(index, 'end_date', date ? `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}` : '')}
                dateFormat="yyyy-MM"
                showMonthYearPicker
                locale="ko"
                placeholderText=""
              />
            </div>
          </DateRangeContainer>
          <DeleteIcon onClick={() => handleDeleteEducation(index)}><FaTimes /></DeleteIcon>
        </EducationItemContainer>
      ))}
      <CenteredButtonContainer>
        <Button className="secondary" onClick={handleAddEducation}>학력 추가</Button>
      </CenteredButtonContainer>
      <ButtonContainer>
        <Button className="primary" onClick={handleSave}>저장</Button>
      </ButtonContainer>
    </Modal>
  );
}
'use client';

import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Profile, Education } from '@/types/profile';
import Modal from '@/components/common/Modal';

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
          <Input
            type="text"
            placeholder="학교명"
            value={edu.institution}
            onChange={(e) => handleInputChange(index, 'institution', e.target.value)}
          />
          <Input
            type="text"
            placeholder="전공"
            value={edu.major}
            onChange={(e) => handleInputChange(index, 'major', e.target.value)}
          />
          <Input
            type="text"
            placeholder="시작일 (YYYY-MM)"
            value={edu.startDate}
            onChange={(e) => handleInputChange(index, 'startDate', e.target.value)}
          />
          <Input
            type="text"
            placeholder="종료일 (YYYY-MM) 또는 '현재'"
            value={edu.endDate}
            onChange={(e) => handleInputChange(index, 'endDate', e.target.value)}
          />
          <Button className="danger" onClick={() => handleDeleteEducation(edu.id)}>삭제</Button>
        </EducationItemContainer>
      ))}
      <Button className="secondary" onClick={handleAddEducation}>학력 추가</Button>
      <ButtonContainer>
        <Button className="secondary" onClick={onClose}>취소</Button>
        <Button className="primary" onClick={handleSave}>저장</Button>
      </ButtonContainer>
    </Modal>
  );
}
'use client';

import Modal from '@/components/common/Modal';
import { Certification } from '@/types/api';
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

const CertificationItemContainer = styled.div`
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

const StyledDatePicker = styled(DatePicker)`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.small};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.main};
`;

const AddButtonWrapper = styled.div`
  display: flex; /* Added for centering */
  justify-content: center; /* Added for centering */
  margin-top: ${({ theme }) => theme.spacing.medium};
  margin-bottom: ${({ theme }) => theme.spacing.medium}; /* Added for consistency */
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

export default function EditCertificationsModal({ profile, onSave, onClose }: Props) {
  const [certifications, setCertifications] = useState<Certification[]>(profile.certifications);

  useEffect(() => {
    setCertifications(profile.certifications);
  }, [profile.certifications]);

  const handleInputChange = (index: number, field: keyof Certification, value: string) => {
    const newCertifications = [...certifications];
    newCertifications[index] = { ...newCertifications[index], [field]: value };
    setCertifications(newCertifications);
  };

  const handleAddCertification = () => {
    setCertifications([...certifications, { name: '', agency: '', issue_date: '' }]);
  };

  const handleDeleteCertification = (index: number) => {
    const newCertifications = [...certifications];
    newCertifications.splice(index, 1);
    setCertifications(newCertifications);
  };

  const handleSave = () => {
    onSave(certifications);
  };

  return (
    <Modal onClose={onClose} title="자격증 수정">
      {certifications.map((cert, index) => (
        <CertificationItemContainer key={index}>
          <Label>자격증명</Label>
          <Input
            type="text"
            value={cert.name}
            onChange={(e) => handleInputChange(index, 'name', e.target.value)}
          />
          <Label>발급기관</Label>
          <Input
            type="text"
            value={cert.agency}
            onChange={(e) => handleInputChange(index, 'agency', e.target.value)}
          />
          <Label>취득일</Label>
          <StyledDatePicker
            selected={cert.issue_date && !isNaN(new Date(cert.issue_date).getTime()) ? new Date(cert.issue_date) : null}
            onChange={(date: Date) => handleInputChange(index, 'issue_date', date ? `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}` : '')}
            dateFormat="yyyy-MM"
            showMonthYearPicker
            locale="ko"
            placeholderText=""
          />
          <Button className="danger" onClick={() => handleDeleteCertification(index)}>삭제</Button>
        </CertificationItemContainer>
      ))}
      <AddButtonWrapper>
        <Button className="secondary" onClick={handleAddCertification}>자격증 추가</Button>
      </AddButtonWrapper>
      <ButtonContainer>
        <Button className="primary" onClick={handleSave}>저장</Button>
      </ButtonContainer>
    </Modal>
  );
}

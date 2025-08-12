'use client';

import Modal from '@/components/common/Modal';
import { Certification } from '@/types/profile';
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
  margin-top: ${({ theme }) => theme.spacing.medium};
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
    setCertifications([...certifications, { id: Date.now().toString(), name: '', issuer: '', issueDate: '' }]);
  };

  const handleDeleteCertification = (id: string) => {
    setCertifications(certifications.filter(cert => cert.id !== id));
  };

  const handleSave = () => {
    onSave(certifications);
  };

  return (
    <Modal onClose={onClose} title="자격증 수정">
      {certifications.map((cert, index) => (
        <CertificationItemContainer key={cert.id}>
          <Label>자격증명</Label>
          <Input
            type="text"
            value={cert.name}
            onChange={(e) => handleInputChange(index, 'name', e.target.value)}
          />
          <Label>발급기관</Label>
          <Input
            type="text"
            value={cert.issuer}
            onChange={(e) => handleInputChange(index, 'issuer', e.target.value)}
          />
          <Label>취득일</Label>
          <StyledDatePicker
            selected={cert.issueDate && !isNaN(new Date(cert.issueDate).getTime()) ? new Date(cert.issueDate) : null}
            onChange={(date: Date) => handleInputChange(index, 'issueDate', date ? `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}` : '')}
            dateFormat="yyyy-MM-dd"
            showYearDropdown
            showMonthDropdown
            dropdownMode="select"
            locale="ko"
            placeholderText=""
          />
          <Button className="danger" onClick={() => handleDeleteCertification(cert.id)}>삭제</Button>
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

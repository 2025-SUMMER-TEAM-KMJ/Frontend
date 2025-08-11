'use client';

import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Profile, Certification } from '@/types/profile';
import Modal from '@/components/common/Modal';

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
          <Input
            type="text"
            placeholder="자격증명"
            value={cert.name}
            onChange={(e) => handleInputChange(index, 'name', e.target.value)}
          />
          <Input
            type="text"
            placeholder="발급기관"
            value={cert.issuer}
            onChange={(e) => handleInputChange(index, 'issuer', e.target.value)}
          />
          <Input
            type="text"
            placeholder="발급일 (YYYY-MM-DD)"
            value={cert.issueDate}
            onChange={(e) => handleInputChange(index, 'issueDate', e.target.value)}
          />
          <Button className="danger" onClick={() => handleDeleteCertification(cert.id)}>삭제</Button>
        </CertificationItemContainer>
      ))}
      <Button className="secondary" onClick={handleAddCertification}>자격증 추가</Button>
      <ButtonContainer>
        <Button className="secondary" onClick={onClose}>취소</Button>
        <Button className="primary" onClick={handleSave}>저장</Button>
      </ButtonContainer>
    </Modal>
  );
}

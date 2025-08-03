'use client';

import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Profile } from '@/types/profile';

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
  max-width: 500px;
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

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.small};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`;

const Label = styled.label`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const Input = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.small};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  font-size: 16px;
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
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;

interface Props {
  profile: Profile;
  onSave: (updatedProfile: Partial<Profile>) => void;
  onClose: () => void;
}

export default function EditBasicInfoModal({ profile, onSave, onClose }: Props) {
  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [phone, setPhone] = useState(profile.phone);
  const [urls, setUrls] = useState(profile.urls?.join('\n') || '');

  useEffect(() => {
    setName(profile.name);
    setEmail(profile.email);
    setPhone(profile.phone);
    setUrls(profile.urls?.join('\n') || '');
  }, [profile]);

  const handleSave = () => {
    onSave({ name, email, phone, urls: urls.split('\n').filter(url => url.trim() !== '') });
  };

  return (
    <ModalBackdrop onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <Title>기본 정보 수정</Title>
        <InputGroup>
          <Label htmlFor="name">이름</Label>
          <Input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </InputGroup>
        <InputGroup>
          <Label htmlFor="email">이메일</Label>
          <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </InputGroup>
        <InputGroup>
          <Label htmlFor="phone">전화번호</Label>
          <Input id="phone" type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </InputGroup>
        <InputGroup>
          <Label htmlFor="urls">관련 링크 (한 줄에 하나씩)</Label>
          <textarea id="urls" value={urls} onChange={(e) => setUrls(e.target.value)} rows={3} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
        </InputGroup>
        <ButtonContainer>
          <Button className="secondary" onClick={onClose}>취소</Button>
          <Button className="primary" onClick={handleSave}>저장</Button>
        </ButtonContainer>
      </ModalContent>
    </ModalBackdrop>
  );
}

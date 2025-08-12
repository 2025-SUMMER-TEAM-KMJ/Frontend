'use client';

import Modal from '@/components/common/Modal';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const ScrollableContent = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  padding: ${({ theme }) => theme.spacing.small};
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 300px; /* Keep min-height for initial size */
  padding: ${({ theme }) => theme.spacing.small};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.main}; /* Added font change */
  resize: none; /* Prevent resizing */
  flex-grow: 1; /* Added to occupy remaining space */
`;

const Label = styled.label`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 4px;
  display: block;
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
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.small};
  margin-top: ${({ theme }) => theme.spacing.large};
`;

export default function EditBriefModal({ profile, onSave, onClose }: Props) {
  const [brief, setBrief] = useState(profile.brief);

  useEffect(() => {
    setBrief(profile.brief);
  }, [profile.brief]);

  const handleSave = () => {
    onSave(brief);
  };

  return (
    <Modal onClose={onClose} title="자기소개 수정">
      <ScrollableContent>
        <Label>자기소개</Label>
        <TextArea
          value={brief}
          onChange={(e) => setBrief(e.target.value)}
        />
      </ScrollableContent>
      <ButtonContainer>
        <Button className="primary" onClick={handleSave}>저장</Button>
      </ButtonContainer>
    </Modal>
  );
}
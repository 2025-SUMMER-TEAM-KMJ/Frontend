'use client';

import Button from '@/components/common/Button';
import Modal from '@/components/common/Modal';
import { useState } from 'react';
import styled from 'styled-components';

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.medium};
  height: 60vh; /* Adjust height as needed */
`;

const StyledTextArea = styled.textarea`
  width: 100%;
  flex-grow: 1; /* Allow textarea to fill available space */
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.main};
  resize: none;
`;

const Label = styled.label`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.small};
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.small};
  margin-top: ${({ theme }) => theme.spacing.medium};
`;

interface Props {
  modalTitle: string;
  contentLabel: string;
  initialContent: string;
  onSave: (newContent: string) => void;
  onClose: () => void;
}

export default function EditMyResumeModal({
  modalTitle,
  contentLabel,
  initialContent,
  onSave,
  onClose,
}: Props) {
  const [content, setContent] = useState(initialContent);

  const handleSave = () => {
    onSave(content);
  };

  return (
    <Modal onClose={onClose} title={modalTitle} dynamicWidth="800px">
      <ModalContent>
        <Label>{contentLabel}</Label>
        <StyledTextArea
          value={content}
          onChange={e => setContent(e.target.value)}
        />
        <Footer>
          <Button onClick={handleSave} variant="primary">
            저장
          </Button>
        </Footer>
      </ModalContent>
    </Modal>
  );
}

'use client';

import styled from 'styled-components';
import { useAuthStore } from '@/store/authStore';

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
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
  max-width: 600px;
  max-height: 80vh;
  overflow-y: auto;
`;

const Question = styled.h2`
  font-size: 22px;
  font-weight: bold;
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`;

const Answer = styled.p`
  font-size: 16px;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export default function QnAModal() {
  const { showQnAModal, selectedQnA, closeQnAModal } = useAuthStore();

  if (!showQnAModal || !selectedQnA) return null;

  return (
    <ModalBackdrop onClick={closeQnAModal}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <Question>{selectedQnA.question}</Question>
        <Answer>{selectedQnA.answer}</Answer>
      </ModalContent>
    </ModalBackdrop>
  );
}

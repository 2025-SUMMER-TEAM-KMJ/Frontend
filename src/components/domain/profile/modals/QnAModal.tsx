'use client';

import styled from 'styled-components';
import { useAuthStore } from '@/store/authStore';
import Modal from '@/components/common/Modal';

const Answer = styled.p`
  font-size: 16px;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export default function QnAModal() {
  const { showQnAModal, selectedQnA, closeQnAModal } = useAuthStore();

  if (!showQnAModal || !selectedQnA) return null;

  return (
    <Modal onClose={closeQnAModal} title={selectedQnA.question}>
      <Answer>{selectedQnA.answer}</Answer>
    </Modal>
  );
}

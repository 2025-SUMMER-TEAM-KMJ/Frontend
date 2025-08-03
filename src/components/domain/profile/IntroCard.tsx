'use client';

import styled from 'styled-components';
import { QnA } from '@/types';
import { useAuthStore } from '@/store/authStore';

const CardWrapper = styled.div`
  background-color: white;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  padding: ${({ theme }) => theme.spacing.large};
  aspect-ratio: 1.618 / 1; // Golden ratio for a card-like feel
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  cursor: pointer;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0,0,0,0.1);
  }
`;

const Question = styled.h3`
  font-size: 18px;
  font-weight: bold;
`;

interface Props {
  qna: QnA;
}

export default function IntroCard({ qna }: Props) {
  const { openQnAModal } = useAuthStore();

  return (
    <CardWrapper onClick={() => openQnAModal(qna)}>
      <Question>{qna.question}</Question>
    </CardWrapper>
  );
}

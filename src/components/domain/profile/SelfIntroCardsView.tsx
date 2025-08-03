'use client';

import styled from 'styled-components';
import { QnA } from '@/types';
import IntroCard from './IntroCard';

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: ${({ theme }) => theme.spacing.large};
  padding: ${({ theme }) => theme.spacing.large} 0;
`;

interface Props {
  qnas: QnA[];
}

export default function SelfIntroCardsView({ qnas }: Props) {
  return (
    <CardsContainer>
      {qnas.map(qna => (
        <IntroCard key={qna.id} qna={qna} />
      ))}
    </CardsContainer>
  );
}

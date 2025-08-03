'use client';

import styled from 'styled-components';
import { QnA } from '@/types';
import Button from '@/components/common/Button';
import QnAItem from './QnAItem';

const QnAContainer = styled.div`
  /* ... */
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: ${({ theme }) => theme.spacing.medium};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

interface Props {
  qnas: QnA[];
  onUpdate: (qnaId: string, question: string, answer: string) => void;
  onAdd: () => void;
  onDelete: (qnaId: string) => void;
}

const TextIcon = () => <span>📝</span>;

export default function ResumeQnA({ qnas, onUpdate, onAdd, onDelete }: Props) {
  return (
    <QnAContainer>
      <SectionTitle>
        <span><TextIcon /> 제출한 자기소개서</span>
        <Button onClick={onAdd}>+ 질문/답변 추가</Button>
      </SectionTitle>
      {qnas.map(qna => (
        <QnAItem 
          key={qna.id} 
          item={qna} 
          onUpdate={onUpdate} 
          onDelete={onDelete} 
        />
      ))}
    </QnAContainer>
  );
}

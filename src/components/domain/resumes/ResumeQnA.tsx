'use client';

import Button from '@/components/common/Button';
import { QnA } from '@/types';
import styled from 'styled-components';
import QnAItem from './QnAItem';

const QnAContainer = styled.div`
  /* ... */
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${({ theme }) => theme.spacing.large};
`;

interface Props {
  qnas: QnA[];
  onAdd: () => void;
  onDelete: (qnaId: string) => void;
  onEdit: (qna: QnA) => void; // New prop
}

export default function ResumeQnA({ qnas, onAdd, onDelete, onEdit }: Props) {
  return (
    <QnAContainer>
      {qnas.map(qna => (
        <QnAItem 
          key={qna.id} 
          item={qna} 
          onDelete={onDelete} 
          onEdit={onEdit} // Pass onEdit to QnAItem
        />
      ))}
      <ButtonContainer>
        <Button onClick={onAdd}>+ 질문/답변 추가</Button>
      </ButtonContainer>
    </QnAContainer>
  );
}

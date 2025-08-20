'use client';

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

const NoContentMessage = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 16px;
  padding: 20px;
  border: 1px dashed ${({ theme }) => theme.colors.lightGray};
  border-radius: 8px;
  margin-top: 20px;
`;

interface Props {
  qnas: QnA[];
  onAdd: () => void;
  onDelete: (qnaId: string) => void;
  onEdit: (qna: QnA) => void; // New prop
  isMultiple: boolean;
}

export default function ResumeQnA({ qnas, onAdd, onDelete, onEdit, isMultiple = true }: Props) {
  return (
    <QnAContainer>
      {qnas.length > 0 ? (
        qnas.map(qna => (
          <QnAItem 
            key={qna.id} 
            item={qna} 
            onDelete={isMultiple ? onDelete : undefined } 
            onEdit={onEdit} // Pass onEdit to QnAItem
          />
        ))
      ) : (
        <NoContentMessage>아직 작성된 질문/답변이 없습니다.</NoContentMessage>
      )}
      
    </QnAContainer>
  );
}

'use client';

import styled from 'styled-components';
import { QnA } from '@/types';
import Button from '@/components/common/Button';
import QnAItem from './QnAItem';

import { FaRegEdit } from 'react-icons/fa';

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
  onAdd: () => void;
  onDelete: (qnaId: string) => void;
  onEdit: (qna: QnA) => void; // New prop
}

const TextIcon = () => <FaRegEdit />;

export default function ResumeQnA({ qnas, onAdd, onDelete, onEdit }: Props) {
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
          onDelete={onDelete} 
          onEdit={onEdit} // Pass onEdit to QnAItem
        />
      ))}
    </QnAContainer>
  );
}

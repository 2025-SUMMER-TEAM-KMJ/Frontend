'use client';

import { QnA } from '@/types';
import styled from 'styled-components';

const ItemWrapper = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.large};
  position: relative; /* For positioning the edit button */
`;

const QuestionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.small};
`;

const Question = styled.h3`
  font-size: 18px;
  font-weight: bold;
  flex-grow: 1;
  flex-shrink: 1;
  min-width: 0; /* Allow text to shrink */
`;

const EditButton = styled.button`
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.textSecondary};
  flex-shrink: 0; /* Prevent button from shrinking */

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const AnswerTextarea = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  font-size: 16px;
  line-height: 1.6;
  resize: vertical;
`;

const ButtonWrapper = styled.div`
  text-align: right;
  margin-top: ${({ theme }) => theme.spacing.small};
`;

const ActionButtons = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.small};
`;

interface Props {
  item: QnA;
  onEdit: (qna: QnA) => void;
  onDelete: (qnaId: string) => void;
}

export default function QnAItem({ item, onEdit, onDelete }: Props) {
  return (
    <ItemWrapper>
      <QuestionHeader>
        <Question>{item.question}</Question>
        <ActionButtons>
          <EditButton onClick={() => onEdit(item)}>✏️</EditButton>
          <EditButton onClick={() => onDelete(item.id)}>🗑️</EditButton>
        </ActionButtons>
      </QuestionHeader>
      <AnswerTextarea value={item.answer} readOnly />
    </ItemWrapper>
  );
}

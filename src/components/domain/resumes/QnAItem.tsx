'use client';

import { useState } from 'react';
import styled from 'styled-components';
import { QnA } from '@/types';
import Button from '@/components/common/Button';

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
`;

const EditButton = styled.button`
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.textSecondary};

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

interface Props {
  item: QnA;
  onSave: (qnaId: string, newAnswer: string) => void;
  onEdit: (qna: QnA) => void; // New prop for edit button
}

export default function QnAItem({ item, onSave, onEdit }: Props) {
  const [answer, setAnswer] = useState(item.answer);
  const [isDirty, setIsDirty] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAnswer(e.target.value);
    setIsDirty(true);
  };

  const handleSave = () => {
    onSave(item.id, answer);
    setIsDirty(false);
  };

  return (
    <ItemWrapper>
      <QuestionHeader>
        <Question>{item.question}</Question>
        <EditButton onClick={() => onEdit(item)}>✏️</EditButton>
      </QuestionHeader>
      <AnswerTextarea value={answer} onChange={handleChange} />
      {isDirty && (
        <ButtonWrapper>
          <Button onClick={handleSave}>저장</Button>
        </ButtonWrapper>
      )}
    </ItemWrapper>
  );
}

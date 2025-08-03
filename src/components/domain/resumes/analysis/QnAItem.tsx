'use client';

import { useState } from 'react';
import styled from 'styled-components';
import { QnA } from '@/types';
import Button from '@/components/common/Button';

const ItemWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  padding: ${({ theme }) => theme.spacing.large};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`;

const StyledTextarea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid transparent; // 테두리를 투명하게 처리
  border-radius: 4px;
  font-size: 16px;
  line-height: 1.6;
  resize: vertical;
  background-color: transparent;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    outline: none;
    background-color: white;
  }
`;

const QuestionTextarea = styled(StyledTextarea)`
  font-weight: bold;
  min-height: 40px;
`;

const AnswerTextarea = styled(StyledTextarea)`
  min-height: 120px;
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  margin: ${({ theme }) => theme.spacing.medium} 0;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.small};
`;

interface Props {
  item: QnA;
  onUpdate: (qnaId: string, question: string, answer: string) => void;
  onDelete: (qnaId: string) => void;
}

export default function QnAItem({ item, onUpdate, onDelete }: Props) {
  const [question, setQuestion] = useState(item.question);
  const [answer, setAnswer] = useState(item.answer);
  const [isDirty, setIsDirty] = useState(false);

  const handleQuestionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQuestion(e.target.value);
    setIsDirty(true);
  };

  const handleAnswerChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAnswer(e.target.value);
    setIsDirty(true);
  };

  const handleUpdate = () => {
    onUpdate(item.id, question, answer);
    setIsDirty(false);
  };

  return (
    <ItemWrapper>
      <QuestionTextarea value={question} onChange={handleQuestionChange} />
      <Divider />
      <AnswerTextarea value={answer} onChange={handleAnswerChange} />
      <ButtonGroup>
        <Button onClick={() => onDelete(item.id)} style={{ background: '#dc3545'}}>삭제</Button>
        {isDirty && <Button onClick={handleUpdate}>저장</Button>}
      </ButtonGroup>
    </ItemWrapper>
  );
}
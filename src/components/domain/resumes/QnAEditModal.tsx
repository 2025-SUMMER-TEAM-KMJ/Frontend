'use client';

import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { QnA } from '@/types';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import Modal from '@/components/common/Modal'; // Assuming common Modal component

const SectionTitle = styled.h3`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`;

const StyledTextArea = styled.textarea`
  width: 100%;
  min-height: 100px;
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  font-size: 16px;
  resize: vertical;
`;

const OriginalContent = styled.div`
  background-color: ${({ theme }) => theme.colors.lightGray};
  padding: ${({ theme }) => theme.spacing.medium};
  border-radius: 8px;
`;

const OriginalQuestion = styled.p`
  font-weight: bold;
  margin-bottom: ${({ theme }) => theme.spacing.small};
`;

const OriginalAnswer = styled.p`
  white-space: pre-wrap;
`;

interface Props {
  isOpen: boolean;
  qna: QnA;
  resumeId: string;
  onSave: (qnaId: string, newQuestion: string, newAnswer: string) => void;
  onClose: () => void;
}

export default function QnAEditModal({ isOpen, qna, resumeId, onSave, onClose }: Props) {
  const [editedQuestion, setEditedQuestion] = useState(qna.question);
  const [editedAnswer, setEditedAnswer] = useState(qna.answer);

  useEffect(() => {
    setEditedQuestion(qna.question);
    setEditedAnswer(qna.answer);
  }, [qna]);

  const handleSave = () => {
    onSave(qna.id, editedQuestion, editedAnswer);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Q&A 수정"
      top="50%"
      left="25%"
      transform="translate(-50%, -50%)"
    >
      <Input
        label="질문"
        value={editedQuestion}
        onChange={(e) => setEditedQuestion(e.target.value)}
      />
      <StyledTextArea
        value={editedAnswer}
        onChange={(e) => setEditedAnswer(e.target.value)}
        placeholder="답변을 입력하세요."
      />
      <Button onClick={handleSave}>저장</Button>

      <SectionTitle>원본 Q&A</SectionTitle>
      <OriginalContent>
        <OriginalQuestion>질문: {qna.question}</OriginalQuestion>
        <OriginalAnswer>답변: {qna.answer}</OriginalAnswer>
      </OriginalContent>
    </Modal>
  );
}

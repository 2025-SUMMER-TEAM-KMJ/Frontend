'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from '@/components/common/Modal';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import { JobPosting } from '@/types';

interface GenerateResumeModalProps {
  job: JobPosting;
  onClose: () => void;
  onSubmit: (title: string, questions: string) => void;
}

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.medium};
`;

const StyledTextArea = styled.textarea`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.small};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  font-size: ${({ theme }) => theme.fontSizes.medium};
  min-height: 150px;
  resize: vertical;
  font-family: inherit; /* Inherit font from parent */
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.small};
  margin-top: ${({ theme }) => theme.spacing.large};
`;

const GenerateResumeModal: React.FC<GenerateResumeModalProps> = ({ job, onClose, onSubmit }) => {
  const [title, setTitle] = useState<string>(`${job.company.name} ${job.detail.position?.job?.[0] || '지원'} 자소서`);
  const [questions, setQuestions] = useState<string>('');

  const handleSubmit = () => {
    onSubmit(title, questions);
  };

  return (
    <Modal title="새 자기소개서 생성" onClose={onClose} dynamicWidth="700px">
      <FormContainer>
        <Input
          label="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="자기소개서 제목을 입력하세요"
        />
        <div>
          <label htmlFor="questions">질문 (각 질문을 줄바꿈으로 구분하세요)</label>
          <StyledTextArea
            id="questions"
            value={questions}
            onChange={(e) => setQuestions(e.target.value)}
            placeholder="예시:&#10;1. 지원 동기를 작성해주세요.&#10;2. 본인의 강점과 약점을 작성해주세요."
          />
        </div>
        <ButtonContainer>
          <Button variant="secondary" onClick={onClose}>취소</Button>
          <Button onClick={handleSubmit}>생성하기</Button>
        </ButtonContainer>
      </FormContainer>
    </Modal>
  );
};

export default GenerateResumeModal;

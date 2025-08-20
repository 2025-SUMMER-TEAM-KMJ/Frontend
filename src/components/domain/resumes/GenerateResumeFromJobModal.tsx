
import { createJobBasedResume } from '@/lib/api/resumes';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { RiAddCircleLine, RiDeleteBinLine } from 'react-icons/ri';
import styled from 'styled-components';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import Modal from '@/components/common/Modal';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  jobPostingId: string;
}

const GenerateResumeFromJobModal = ({ isOpen, onClose, jobPostingId }: Props) => {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState(['']);

  const handleAddQuestion = () => {
    setQuestions([...questions, '']);
  };

  const handleRemoveQuestion = (index: number) => {
    const newQuestions = questions.filter((_, i) => i !== index);
    setQuestions(newQuestions);
  };

  const handleQuestionChange = (index: number, value: string) => {
    const newQuestions = questions.map((q, i) => (i === index ? value : q));
    setQuestions(newQuestions);
  };

  const handleCreate = async () => {
    try {
      const newResume = await createJobBasedResume({
        title,
        type: 'job_posting',
        job_posting_id: jobPostingId,
        qnas: questions.map(q => ({ question: q, answer: '' })),
      });
      router.push(`/resumes/job-based/${newResume.id}`);
      onClose();
    } catch (error) {
      console.error('Failed to create resume', error);
      // You might want to show an error message to the user
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="공고 기반 자소서 생성">
      <Content>
        <Input
          label="자소서 제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="예: [회사명] [직무] 자기소개서"
        />
        <QuestionList>
          <Label>질문 목록</Label>
          {questions.map((question, index) => (
            <QuestionItem key={index}>
              <Input
                value={question}
                onChange={(e) => handleQuestionChange(index, e.target.value)}
                placeholder={`질문 ${index + 1}`}
              />
              <IconButton onClick={() => handleRemoveQuestion(index)} disabled={questions.length <= 1}>
                <RiDeleteBinLine />
              </IconButton>
            </QuestionItem>
          ))}
          <AddButton type="button" onClick={handleAddQuestion} variant="secondary">
            <RiAddCircleLine />
            질문 추가
          </AddButton>
        </QuestionList>
      </Content>
      <ButtonContainer>
        <Button onClick={onClose} variant="secondary">
          취소
        </Button>
        <Button onClick={handleCreate}>생성</Button>
      </ButtonContainer>
    </Modal>
  );
};

export default GenerateResumeFromJobModal;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.large};
`;

const QuestionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.small};
`;

const QuestionItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.small};
`;

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 1.2rem;

  &:hover {
    color: ${({ theme }) => theme.colors.danger};
  }

  &:disabled {
    color: ${({ theme }) => theme.colors.disabled};
    cursor: not-allowed;
  }
`;

const AddButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.small};
  width: fit-content;
  align-self: flex-start;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.medium};
  margin-top: ${({ theme }) => theme.spacing.large};
`;

const Label = styled.label`
    font-weight: 500;
    color: ${({ theme }) => theme.colors.textPrimary};
    margin-bottom: ${({ theme }) => theme.spacing.small};
`;

'use client';

import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { PersonalNarratives, ResumeFormData } from '@/types';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.medium};
`;
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${({ theme }) => theme.spacing.large};
`;

interface Props {
  defaultValues?: PersonalNarratives;
  onNext: (data: Partial<ResumeFormData>) => Promise<void>;
  onPrev: () => void;
}

export default function Step7_PersonalNarratives({ defaultValues, onNext, onPrev }: Props) {
  const { register, handleSubmit } = useForm<PersonalNarratives>({ defaultValues });

  const onSubmitHandler = async (data: PersonalNarratives) => {
    await onNext(data as Partial<ResumeFormData>);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmitHandler)}>
      <h3>개인 서술 (임시)</h3>
      <Input {...register('strengths')} placeholder="강점" />
      <Input {...register('values')} placeholder="가치관" />
      <Input {...register('motivation')} placeholder="지원 동기" />

      <ButtonWrapper>
        <Button type="button" onClick={onPrev}>이전</Button>
        <Button type="submit">저장</Button>
      </ButtonWrapper>
    </Form>
  );
}

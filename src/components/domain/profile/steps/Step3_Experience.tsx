'use client';

import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { ProjectExperience } from '@/types';
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
  defaultValues?: { experience: ProjectExperience[] };
  onNext: (data: { experience: ProjectExperience[] }) => void;
  onPrev: () => void;
}

export default function Step3_Experience({ defaultValues, onNext, onPrev }: Props) {
  const { register, handleSubmit } = useForm<{
    experience: ProjectExperience[];
  }>({ defaultValues });

  return (
    <Form onSubmit={handleSubmit(onNext)}>
      <h3>기타 경험 (임시)</h3>
      <Input {...register('experience.0.title')} placeholder="프로젝트/경험 제목" />
      <Input {...register('experience.0.description')} placeholder="설명" />

      <ButtonWrapper>
        <Button type="button" onClick={onPrev}>이전</Button>
        <Button type="submit">다음</Button>
      </ButtonWrapper>
    </Form>
  );
}

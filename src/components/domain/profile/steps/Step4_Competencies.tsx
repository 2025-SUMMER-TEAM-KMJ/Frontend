'use client';

import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { Competency } from '@/types';
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
  defaultValues?: { competencies: Competency[] };
  onNext: (data: { competencies: Competency[] }) => void;
  onPrev: () => void;
}

export default function Step4_Competencies({ defaultValues, onNext, onPrev }: Props) {
  const { register, handleSubmit } = useForm<{
    competencies: Competency[];
  }>({ defaultValues });

  return (
    <Form onSubmit={handleSubmit(onNext)}>
      <h3>보유 역량 (임시)</h3>
      <Input {...register('competencies.0.name')} placeholder="역량 (예: React, 커뮤니케이션)" />

      <ButtonWrapper>
        <Button type="button" onClick={onPrev}>이전</Button>
        <Button type="submit">다음</Button>
      </ButtonWrapper>
    </Form>
  );
}

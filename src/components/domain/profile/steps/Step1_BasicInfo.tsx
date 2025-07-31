'use client';

import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { ResumeFormData } from '@/types';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.medium};
`;
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: ${({ theme }) => theme.spacing.large};
`;

interface Props {
  defaultValues?: Partial<ResumeFormData>;
  onNext: (data: Partial<ResumeFormData>) => void;
}

export default function Step1_BasicInfo({ defaultValues, onNext }: Props) {
  const { register, handleSubmit } = useForm<Partial<ResumeFormData>>({ defaultValues });

  return (
    <Form onSubmit={handleSubmit(onNext)}>
      <h3>기본 정보</h3>
      <Input {...register('name', { required: true })} placeholder="이름" />
      <Input {...register('age', { required: true, valueAsNumber: true })} placeholder="나이" type="number" />
      <Input {...register('gender', { required: true })} placeholder="성별" />
      <Input {...register('email', { required: true })} placeholder="이메일" type="email" />
      <Input {...register('phone', { required: true })} placeholder="연락처" />
      <ButtonWrapper>
        <Button type="submit">다음</Button>
      </ButtonWrapper>
    </Form>
  );
}

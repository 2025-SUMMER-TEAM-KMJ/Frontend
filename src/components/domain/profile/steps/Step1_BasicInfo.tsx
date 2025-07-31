'use client';

import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { BasicInfo } from '@/types/profile';
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
  defaultValues?: BasicInfo;
  onNext: (data: BasicInfo) => void;
}

export default function Step1_BasicInfo({ defaultValues, onNext }: Props) {
  const { register, handleSubmit } = useForm<BasicInfo>({ defaultValues });

  return (
    <Form onSubmit={handleSubmit(onNext)}>
      <Input {...register('name')} placeholder="이름" />
      <Input {...register('email')} placeholder="이메일" type="email" />
      <Input {...register('phone')} placeholder="연락처" />
      <Input {...register('brief')} placeholder="한 줄 소개" />
      <ButtonWrapper>
        <Button type="submit">다음</Button>
      </ButtonWrapper>
    </Form>
  );
}

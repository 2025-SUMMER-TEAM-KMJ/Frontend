'use client';

import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { PreferredPosition } from '@/types';
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
  defaultValues?: { preferredPosition: PreferredPosition[] };
  onNext: (data: { preferredPosition: PreferredPosition[] }) => void;
  onPrev: () => void;
}

export default function Step6_PreferredPosition({ defaultValues, onNext, onPrev }: Props) {
  const { register, handleSubmit } = useForm<{
    preferredPosition: PreferredPosition[];
  }>({ defaultValues });

  return (
    <Form onSubmit={handleSubmit(onNext)}>
      <h3>희망 직무/직군 (임시)</h3>
      <Input {...register('preferredPosition.0.title')} placeholder="희망 직무" />
      <Input {...register('preferredPosition.0.industry')} placeholder="희망 직군" />

      <ButtonWrapper>
        <Button type="button" onClick={onPrev}>이전</Button>
        <Button type="submit">다음</Button>
      </ButtonWrapper>
    </Form>
  );
}

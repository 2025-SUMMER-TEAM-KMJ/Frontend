'use client';

import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { Certification } from '@/types';
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
  defaultValues?: { certifications: Certification[] };
  onNext: (data: { certifications: Certification[] }) => void;
  onPrev: () => void;
}

export default function Step5_Certifications({ defaultValues, onNext, onPrev }: Props) {
  const { register, handleSubmit } = useForm<{
    certifications: Certification[];
  }>({ defaultValues });

  return (
    <Form onSubmit={handleSubmit(onNext)}>
      <h3>자격증 및 수상 내역 (임시)</h3>
      <Input {...register('certifications.0.name')} placeholder="자격증/수상명" />
      <Input {...register('certifications.0.issuer')} placeholder="발급기관" />

      <ButtonWrapper>
        <Button type="button" onClick={onPrev}>이전</Button>
        <Button type="submit">다음</Button>
      </ButtonWrapper>
    </Form>
  );
}

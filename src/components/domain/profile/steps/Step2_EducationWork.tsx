'use client';

import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { Education, WorkExperience } from '@/types';
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
  defaultValues?: { education: Education[]; workExperience: WorkExperience[] };
  onNext: (data: { education: Education[]; workExperience: WorkExperience[] }) => void;
  onPrev: () => void;
}

export default function Step2_EducationWork({ defaultValues, onNext, onPrev }: Props) {
  const { register, handleSubmit } = useForm<{
    education: Education[];
    workExperience: WorkExperience[];
  }>({ defaultValues });

  return (
    <Form onSubmit={handleSubmit(onNext)}>
      <h3>학력 정보 (임시)</h3>
      <Input {...register('education.0.institution')} placeholder="학교" />
      <Input {...register('education.0.major')} placeholder="전공" />

      <h3>경력 정보 (임시)</h3>
      <Input {...register('workExperience.0.company')} placeholder="회사명" />
      <Input {...register('workExperience.0.position')} placeholder="직책" />

      <ButtonWrapper>
        <Button type="button" onClick={onPrev}>이전</Button>
        <Button type="submit">다음</Button>
      </ButtonWrapper>
    </Form>
  );
}

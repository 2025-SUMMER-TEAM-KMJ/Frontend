'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import { useForm, SubmitHandler, FieldErrors } from 'react-hook-form';
import { signupUser } from '@/lib/api/auth';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import Dropdown from '@/components/common/Dropdown';
import { SignUpRequest } from '@/types/api';

const Title = styled.h1`
  font-size: 28px;
  font-weight: 800;
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.large};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.medium};
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
`;

const SubLink = styled(Link)`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: center;
  margin-top: ${({ theme }) => theme.spacing.medium};
  display: block;

  &:hover {
    text-decoration: underline;
  }
`;

const FormWrapper = styled.div`
  width: 100%;
  max-width: 380px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xlarge};
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
`;

export default function SignupPage() {
  const router = useRouter();
  const [apiError, setApiError] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors, isSubmitting }, trigger, watch } = useForm<SignUpRequest>();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<SignUpRequest>>({});

  const onNextStep = async () => {
    const isValid = await trigger(['email', 'password']);
    if (isValid) {
      const { email, password } = watch();
      setFormData({ email, password });
      setStep(2);
    }
  };

  const onFinalSubmit: SubmitHandler<SignUpRequest> = async (data) => {
    const finalData = { ...formData, ...data };
    setApiError(null);
    try {
      await signupUser(finalData as SignUpRequest);
      router.push('/login');
    } catch (error) {
      if (error instanceof Error) {
        setApiError(error.message);
      }
    }
  };

  return (
    <FormWrapper>
      <Title>회원가입</Title>
      {step === 1 && (
        <Form onSubmit={handleSubmit(onNextStep)}>
          <Input
            {...register('email', { required: '이메일은 필수입니다.' })}
            placeholder="이메일"
            type="email"
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}

          <Input
            {...register('password', { required: '비밀번호는 필수입니다.', minLength: { value: 8, message: '8자 이상 입력해주세요.' } })}
            placeholder="비밀번호"
            type="password"
          />
          {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}

          <Button type="submit" disabled={isSubmitting}>
            다음
          </Button>
        </Form>
      )}

      {step === 2 && (
        <Form onSubmit={handleSubmit(onFinalSubmit)}>
          <Input
            {...register('name', { required: '이름은 필수입니다.' })}
            placeholder="이름"
          />
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}

          <Input
            {...register('age', { required: '나이는 필수입니다.', valueAsNumber: true })}
            placeholder="나이"
            type="number"
          />
          {errors.age && <ErrorMessage>{errors.age.message}</ErrorMessage>}

          <Dropdown
            {...register('gender', { required: '성별은 필수입니다.' })}
            options={[{ value: '', label: '성별 선택' }, { value: '남성', label: '남성' }, { value: '여성', label: '여성' }]}
            value={watch('gender') || ''}
          />
          {errors.gender && <ErrorMessage>{errors.gender.message}</ErrorMessage>}

          <Input
            {...register('phone', { required: '연락처는 필수입니다.' })}
            placeholder="연락처"
            type="tel"
          />
          {errors.phone && <ErrorMessage>{errors.phone.message}</ErrorMessage>}

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? '가입 중...' : '회원가입'}
          </Button>
        </Form>
      )}
      <SubLink href="/login">이미 계정이 있으신가요? 로그인</SubLink>
    </FormWrapper>
  );
}

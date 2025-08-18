'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAuthStore } from '@/store/authStore';
import { loginUser } from '@/lib/api/auth';
import { getProfile } from '@/lib/api/profile';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import { LoginRequest } from '@/types/api';

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
  max-width: 380px; /* Adjust this size as needed for login/signup */
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xlarge};
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
`;

export default function LoginPage() {
  const [apiError, setApiError] = useState<string | null>(null);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginRequest>();

  const onSubmit: SubmitHandler<LoginRequest> = async (data) => {
    setApiError(null);
    try {
      const tokenResponse = await loginUser(data);
      useAuthStore.getState().setTokens(tokenResponse.access_token);
      const userProfile = await getProfile();
      useAuthStore.getState().login(userProfile);
      router.push('/'); // Redirect to home on success
    } catch (error) {
      if (error instanceof Error) {
        setApiError(error.message);
      }
    }
  };

  return (
    <FormWrapper>
      <Title>로그인</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register('email', { required: '이메일은 필수입니다.' })}
          placeholder="이메일"
          type="email"
        />
        {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}

        <Input
          {...register('password', { required: '비밀번호는 필수입니다.' })}
          placeholder="비밀번호"
          type="password"
        />
        {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}

        {apiError && <ErrorMessage>{apiError}</ErrorMessage>}

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? '로그인 중...' : '로그인'}
        </Button>
      </Form>
      <SubLink href="/signup">회원가입</SubLink>
      <SubLink href="/forgot-password">비밀번호를 잊으셨나요?</SubLink>
    </FormWrapper>
  );
}
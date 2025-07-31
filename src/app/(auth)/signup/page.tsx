'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAuth } from '@/hooks/useAuth';
import { signupUser } from '@/lib/api/auth';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';

// (LoginPage와 유사한 스타일 컴포넌트들 재사용)
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

type Inputs = {
  name: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  password?: string;
};

export default function SignupPage() {
  const router = useRouter();
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const newUser = await signupUser({
        name: data.name,
        age: data.age,
        gender: data.gender,
        email: data.email,
        phone: data.phone,
      });
      // In a real app, you might want to auto-login the user after signup
      login(newUser); 
      router.push('/'); // Redirect to home (or profile setup)
    } catch (error) {
      // Handle signup errors if any
    }
  };

  return (
    <>
      <Title>회원가입</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
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

        <Input
          {...register('gender', { required: '성별은 필수입니다.' })}
          placeholder="성별"
        />
        {errors.gender && <ErrorMessage>{errors.gender.message}</ErrorMessage>}

        <Input
          {...register('email', { required: '이메일은 필수입니다.' })}
          placeholder="이메일"
          type="email"
        />
        {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}

        <Input
          {...register('phone', { required: '연락처는 필수입니다.' })}
          placeholder="연락처"
          type="tel"
        />
        {errors.phone && <ErrorMessage>{errors.phone.message}</ErrorMessage>}

        <Input
          {...register('password', { required: '비밀번호는 필수입니다.', minLength: { value: 8, message: '8자 이상 입력해주세요.' } })}
          placeholder="비밀번호"
          type="password"
        />
        {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? '가입 중...' : '회원가입'}
        </Button>
      </Form>
      <SubLink href="/login">이미 계정이 있으신가요? 로그인</SubLink>
    </>
  );
}

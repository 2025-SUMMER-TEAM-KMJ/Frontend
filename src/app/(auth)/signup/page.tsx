'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import { useForm, SubmitHandler, FieldErrors } from 'react-hook-form';
import { useAuth } from '@/hooks/useAuth';
import { signupUser } from '@/lib/api/auth';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import CustomDropdown from '@/components/common/CustomDropdown';

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

const FormWrapper = styled.div`
  width: 100%;
  max-width: 380px; /* Adjust this size as needed for login/signup */
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xlarge};
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
`;

type Step1Inputs = {
  email: string;
  password?: string;
};

type Step2Inputs = {
  name: string;
  age: number;
  gender: string;
  phone: string;
};

export default function SignupPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<Step1Inputs & Step2Inputs>>({});

  const { register, handleSubmit, formState: { errors, isSubmitting }, trigger } = useForm<Step1Inputs | Step2Inputs>();

  const onNextStep1: SubmitHandler<Step1Inputs | Step2Inputs> = async (data) => {
    const step1Data = data as Step1Inputs;
    const isValid = await trigger(['email', 'password']);
    if (isValid) {
      setFormData((prev) => ({ ...prev, ...step1Data }));
      setStep(2);
    }
  };

  const onFinalSubmit: SubmitHandler<Step1Inputs | Step2Inputs> = async (data) => {
    const step2Data = data as Step2Inputs;
    const finalData = { ...formData, ...step2Data } as Step1Inputs & Step2Inputs;
    try {
      const newUser = await signupUser({
        name: finalData.name,
        age: finalData.age,
        gender: finalData.gender,
        email: finalData.email,
        phone: finalData.phone,
      });
      login(newUser);
            router.push('/signup/additional-info');
    } catch (error) {
      // Handle signup errors if any
    }
  };

  return (
    <FormWrapper>
      <Title>회원가입</Title>
      {step === 1 && (
        <Form onSubmit={handleSubmit(onNextStep1)}>
          <Input
            {...register('email', { required: '이메일은 필수입니다.' })}
            placeholder="이메일"
            type="email"
          />
          {(errors as FieldErrors<Step1Inputs>).email && <ErrorMessage>{(errors as FieldErrors<Step1Inputs>).email!.message}</ErrorMessage>}

          <Input
            {...register('password', { required: '비밀번호는 필수입니다.', minLength: { value: 8, message: '8자 이상 입력해주세요.' } })}
            placeholder="비밀번호"
            type="password"
          />
          {(errors as FieldErrors<Step1Inputs>).password && <ErrorMessage>{(errors as FieldErrors<Step1Inputs>).password!.message}</ErrorMessage>}

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
          {(errors as FieldErrors<Step2Inputs>).name && <ErrorMessage>{(errors as FieldErrors<Step2Inputs>).name!.message}</ErrorMessage>}

          <Input
            {...register('age', { required: '나이는 필수입니다.', valueAsNumber: true })}
            placeholder="나이"
            type="number"
          />
          {(errors as FieldErrors<Step2Inputs>).age && <ErrorMessage>{(errors as FieldErrors<Step2Inputs>).age!.message}</ErrorMessage>}

          <CustomDropdown
            label="성별"
            options={[{ value: '', label: '성별 선택' }, { value: '남', label: '남' }, { value: '여', label: '여' }]}
            value={formData.gender || ''}
            onChange={(value) => setFormData(prev => ({ ...prev, gender: value }))}
          />

          <Input
            {...register('phone', { required: '연락처는 필수입니다.' })}
            placeholder="연락처"
            type="tel"
          />
          {(errors as FieldErrors<Step2Inputs>).phone && <ErrorMessage>{(errors as FieldErrors<Step2Inputs>).phone!.message}</ErrorMessage>}

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? '가입 중...' : '회원가입'}
          </Button>
        </Form>
      )}
      <SubLink href="/login">이미 계정이 있으신가요? 로그인</SubLink>
    </FormWrapper>
  );
}

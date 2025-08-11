'use client';

import Link from 'next/link';
import styled from 'styled-components';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';

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
const InfoText = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.medium};
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

export default function ForgotPasswordPage() {
  return (
    <FormWrapper>
      <Title>비밀번호 찾기</Title>
      <InfoText>가입하신 이메일을 입력하시면 비밀번호 재설정 링크를 보내드립니다.</InfoText>
      <Form>
        <Input placeholder="이메일" type="email" />
        <Button>재설정 링크 받기</Button>
      </Form>
      <SubLink href="/login">로그인으로 돌아가기</SubLink>
    </FormWrapper>
  );
}

'use client';

import styled from 'styled-components';

const AuthContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.lightGray};
`;

const AuthCard = styled.div`
  width: 100%;
  max-width: 400px;
  padding: ${({ theme }) => theme.spacing.xlarge};
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
`;

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthContainer>
      <AuthCard>{children}</AuthCard>
    </AuthContainer>
  );
}

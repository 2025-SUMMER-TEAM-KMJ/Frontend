'use client';

import { motion } from 'framer-motion';
import styled from 'styled-components';

const AuthContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.lightGray};
`;

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthContainer>
      {children}
    </AuthContainer>
  );
}

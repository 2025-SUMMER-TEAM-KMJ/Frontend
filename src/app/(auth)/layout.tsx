'use client';

import styled from 'styled-components';
import { motion } from 'framer-motion';

const AuthContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.lightGray};
`;

const AuthCard = styled(motion.div)`
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
      <AuthCard
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ ease: 'easeOut', duration: 0.3 }}
      >
        {children}
      </AuthCard>
    </AuthContainer>
  );
}

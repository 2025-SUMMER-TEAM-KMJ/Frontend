'use client';

import { motion } from 'framer-motion';
import styled from 'styled-components';

const AuthContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.lightGray};
`;

const motionVariants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: { opacity: 1, scale: 1 },
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthContainer
      initial="hidden"
      animate="visible"
      variants={motionVariants}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
    >
      {children}
    </AuthContainer>
  );
}

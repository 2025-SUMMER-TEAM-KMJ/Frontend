'use client';

import styled from 'styled-components';
import Header from '@/components/domain/shared/Header';
import { motion } from 'framer-motion';

const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MotionContentWrapper = styled(motion.div)`
  flex: 1;
  padding-top: 60px; /* Header height */
`;

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <MainContainer>
      <Header />
      <MotionContentWrapper
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ease: 'easeInOut', duration: 0.5 }}
      >
        {children}
      </MotionContentWrapper>
    </MainContainer>
  );
}
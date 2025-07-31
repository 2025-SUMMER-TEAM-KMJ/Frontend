'use client';

import styled from 'styled-components';
import Header from '@/components/domain/shared/Header';
const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const ContentWrapper = styled.div`
  flex: 1;
  padding-top: 60px; /* Header height */
`;

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MainContainer>
      <Header />
      <ContentWrapper>{children}</ContentWrapper>
    </MainContainer>
  );
}

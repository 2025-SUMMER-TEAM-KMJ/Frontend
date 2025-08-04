'use client';

import HeroSection from '@/components/domain/main/HeroSection';
import SearchBar from '@/components/domain/main/SearchBar';
import styled from 'styled-components';

const HomePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 24px;
  max-width: 100%; // 추가
  margin: 0 auto; // 추가
`;

export default function HomePage() {
  return (
    <HomePageContainer>
      <HeroSection />
      <SearchBar />
    </HomePageContainer>
  );
}

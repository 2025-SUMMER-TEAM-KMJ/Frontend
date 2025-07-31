'use client';

import styled from 'styled-components';
import HeroSection from '@/components/domain/main/HeroSection';
import SearchBar from '@/components/domain/main/SearchBar';

const HomePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 24px;
`;

export default function HomePage() {
  return (
    <HomePageContainer>
      <HeroSection />
      <SearchBar />
    </HomePageContainer>
  );
}

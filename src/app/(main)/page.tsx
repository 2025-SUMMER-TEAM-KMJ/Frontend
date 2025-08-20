'use client';

import HeroSection from '@/components/domain/main/HeroSection';
import SearchBar from '@/components/domain/main/SearchBar';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';

const HomePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 24px;
  max-width: 100%; // 추가
  margin: 0 auto; // 추가
`;

const SearchBarContainer = styled.div`
  width: 60%;
  margin: 0;
`;

export default function HomePage() {
  const router = useRouter();

  const handleSearch = (term: string) => {
    router.push(`/jobs?q=${term}`);
  };

  return (
    <HomePageContainer>
      <HeroSection />
      <SearchBarContainer>
        <SearchBar onSearch={handleSearch} />
      </SearchBarContainer>
    </HomePageContainer>
  );
}

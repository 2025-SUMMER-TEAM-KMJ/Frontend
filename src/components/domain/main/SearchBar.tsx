'use client';

import Button from '@/components/common/Button';
import React, { useEffect } from 'react';
// import Input from '@/components/common/Input'; // Input 임포트 제거
import styled from 'styled-components';

const SearchBarWrapper = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.small};
  width: 100%;
  margin: 0 0;
`;

const StyledInputWrapper = styled.div`
  flex-grow: 1;
  flex-basis: 0;
`;

// Input.tsx의 스타일을 직접 가져와 StyledInput으로 정의
const StyledInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  font-size: 16px;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

interface SearchBarProps {
  onSearch?: (term: string) => void;
  initialTerm?: string;
}

export default function SearchBar({ onSearch, initialTerm = '' }: SearchBarProps) {
  const [term, setTerm] = React.useState(initialTerm);

  useEffect(() => {
    setTerm(initialTerm);
  }, [initialTerm]);

  const handleSearch = () => {
    if (onSearch) {
      onSearch(term);
    }
  };

  return (
    <SearchBarWrapper>
      <StyledInputWrapper>
        <StyledInput 
          placeholder="직무, 기업, 키워드로 검색하세요" 
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
      </StyledInputWrapper>
      <Button onClick={handleSearch}>검색</Button>
    </SearchBarWrapper>
  );
}
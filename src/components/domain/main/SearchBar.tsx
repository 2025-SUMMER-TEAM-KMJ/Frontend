'use client';

import styled from 'styled-components';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';

const SearchBarWrapper = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.small};
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`;

export default function SearchBar() {
  return (
    <SearchBarWrapper>
      <Input placeholder="직무, 기업, 키워드로 검색하세요" />
      <Button>검색</Button>
    </SearchBarWrapper>
  );
}

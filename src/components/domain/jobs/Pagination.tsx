'use client';

import styled from 'styled-components';
import Button from '@/components/common/Button';

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.medium};
  margin-top: ${({ theme }) => theme.spacing.xlarge};
`;

const PageNumber = styled.span`
  font-size: 16px;
  font-weight: bold;
`;

export default function Pagination() {
  return (
    <PaginationWrapper>
      <Button>이전</Button>
      <PageNumber>1</PageNumber>
      <Button>다음</Button>
    </PaginationWrapper>
  );
}

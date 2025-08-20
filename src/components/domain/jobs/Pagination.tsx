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

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <PaginationWrapper>
      <Button onClick={handlePrevious} disabled={currentPage === 1}>이전</Button>
      <PageNumber>{currentPage}</PageNumber>
      <Button onClick={handleNext} disabled={currentPage === totalPages}>다음</Button>
    </PaginationWrapper>
  );
}

'use client';

import styled from 'styled-components';
import Skeleton from '@/components/common/Skeleton';

const SkeletonCardWrapper = styled.div`
  padding: ${({ theme }) => theme.spacing.large};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.medium};
`;

const TagWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.small};
`;

export default function JobPostCardSkeleton() {
  return (
    <SkeletonCardWrapper>
      <Skeleton height="24px" width="60%" />
      <Skeleton height="28px" width="90%" />
      <Skeleton height="20px" width="40%" />
      <TagWrapper>
        <Skeleton height="24px" width="70px" />
        <Skeleton height="24px" width="90px" />
        <Skeleton height="24px" width="80px" />
      </TagWrapper>
    </SkeletonCardWrapper>
  );
}

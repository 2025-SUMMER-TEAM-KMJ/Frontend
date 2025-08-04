'use client';

import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import { Job } from '@/types';
import { useAuth } from '@/hooks/useAuth';
import { createJobBasedResume } from '@/lib/api/resumes';
import Tag from '@/components/common/Tag';
import Button from '@/components/common/Button';

const CardWrapper = styled.div`
  padding: ${({ theme }) => theme.spacing.large};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  transition: box-shadow 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
`;

const Company = styled.h3`
  font-size: 18px;
  font-weight: bold;
`;

const Title = styled.h2`
  font-size: 20px;
  margin: ${({ theme }) => theme.spacing.small} 0;
`;

const InfoWrapper = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.medium};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-top: ${({ theme }) => theme.spacing.medium};
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.small};
  margin-top: ${({ theme }) => theme.spacing.medium};
`;

const SmallButton = styled(Button)`
  padding: 6px 12px;
  font-size: 12px;
`;

interface JobPostCardProps {
  job: Job;
}

export default function JobPostCard({ job }: JobPostCardProps) {
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  const handleCreateResume = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const newResume = await createJobBasedResume(job);
      router.push(`/resumes/job-based/${newResume.id}`);
    } catch (error) {
      alert(error instanceof Error ? error.message : '자소서 생성 실패');
    }
  };

  return (
    <CardWrapper>
      {/* ... */}
      {isLoggedIn && (
        <ButtonGroup>
          <SmallButton onClick={handleCreateResume}>
            이 공고로 자소서 생성
          </SmallButton>
          <SmallButton onClick={(e) => { e.stopPropagation(); alert('관심 공고 등록!'); }}>
            관심 등록
          </SmallButton>
        </ButtonGroup>
      )}
    </CardWrapper>
  );
}

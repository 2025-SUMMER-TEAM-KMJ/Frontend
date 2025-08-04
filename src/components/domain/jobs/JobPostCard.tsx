'use client';

import styled from 'styled-components';
import { Job } from '@/types';
import Tag from '@/components/common/Tag';

const CardWrapper = styled.div`
  padding: ${({ theme }) => theme.spacing.large};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  transition: box-shadow 0.2s ease-in-out;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

const ContentWrapper = styled.div``;

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
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`;

const TagWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.small};
  margin-top: ${({ theme }) => theme.spacing.medium};
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.small};
  margin-top: ${({ theme }) => theme.spacing.large};
`;

const IconButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.textSecondary};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

interface JobPostCardProps {
  job: Job;
  isInterested: boolean;
  onToggleInterest: (job: Job) => void;
  onCreateResume: (job: Job) => void;
}

export default function JobPostCard({ job, isInterested, onToggleInterest, onCreateResume }: JobPostCardProps) {
  const handleCreateClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onCreateResume(job);
  };

  const handleInterestClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleInterest(job);
  };

  return (
    <CardWrapper>
      <ContentWrapper>
        <Company>{job.company}</Company>
        <Title>{job.title}</Title>
        <InfoWrapper>
          <span>{job.location}</span>
          <span>{job.experience}</span>
        </InfoWrapper>
        <TagWrapper>
          {job.tags.map(tag => <Tag key={tag}>{tag}</Tag>)}
        </TagWrapper>
      </ContentWrapper>
      <ButtonGroup>
        <IconButton onClick={handleCreateClick} title="이 공고로 자소서 생성">📝</IconButton>
        <IconButton onClick={handleInterestClick} title="관심 공고 등록/해제">
          {isInterested ? '★' : '☆'}
        </IconButton>
      </ButtonGroup>
    </CardWrapper>
  );
}

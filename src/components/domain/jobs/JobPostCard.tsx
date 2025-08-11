'use client';

import styled from 'styled-components';
import { Job } from '@/types';
import { useState, useEffect } from 'react';
import Tag from '@/components/common/Tag';

const CardWrapper = styled.div`
  padding: ${({ theme }) => theme.spacing.large};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  transition: box-shadow 0.2s ease-in-out, transform 0.2s ease-in-out;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  cursor: pointer;
  position: relative; /* Re-added for overlay positioning */

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }
`;

const ContentWrapper = styled.div``;

const JobImage = styled.img`
  width: 100%;
  height: 150px; /* Fixed height for consistency */
  object-fit: cover; /* Cover the area, cropping if necessary */
  border-radius: 4px;
  margin-bottom: ${({ theme }) => theme.spacing.medium};
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

  const calculateDDay = (dueDate: string) => {
    const today = new Date();
    const deadlineDate = new Date(dueDate);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays >= 0 ? `D-${diffDays}` : `D+${Math.abs(diffDays)}`;
  };

  const [dDay, setDDay] = useState('');

  useEffect(() => {
    if (job.dueDate) {
      setDDay(calculateDDay(job.dueDate));
    }
  }, [job.dueDate]);

  return (
    <CardWrapper>
      <ContentWrapper>
        <JobImage src="https://blog.greetinghr.com/content/images/2022/03/---------------------.png" alt="Job Post Image" />
        <Company>{job.company}</Company>
        <Title>{job.title}</Title>
        <InfoWrapper>
          <span>{job.location}</span>
          <span>{job.experience}</span>
          {job.dueDate && <span>{dDay}</span>}
          {job.source && <span>{job.source}</span>}
        </InfoWrapper>
        
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

'use client';

import styled from 'styled-components';
import { JobPosting } from '@/types';
import { useState, useEffect } from 'react';
import { FaRegEdit, FaStar, FaRegStar, FaListAlt } from 'react-icons/fa';
import Tag from '@/components/common/Tag';
import { formatDistanceToNowStrict } from 'date-fns'; // Added import
import { ko } from 'date-fns/locale'; // Added import for Korean locale

const CardWrapper = styled.div`
  padding: 0;
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

const ContentWrapper = styled.div`
  padding: 0 ${({ theme }) => theme.spacing.large} ${({ theme }) => theme.spacing.medium};
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 180px; /* Fixed height for consistency */
  border-radius: 4px;
  margin-bottom: ${({ theme }) => theme.spacing.medium};
  position: relative; /* For positioning overlays */
  overflow: hidden; /* Hide overflow if image is larger */
  flex-grow: 6; /* Image area takes 6 parts */
  background-color: ${({ theme }) => theme.colors.lightGray}; /* Gray background */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const JobImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover; /* Cover the area, cropping if necessary */
  ${({ src }) => !src && 'display: none;'} /* Hide image if no src */
`;

const TextAndButtonContainer = styled.div`
  flex-grow: 4; /* Text and button area takes 4 parts */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Company = styled.h3`
  font-size: 16px;
  font-weight: bold;
`;

const Title = styled.h2`
  font-size: 18px;
  margin: ${({ theme }) => theme.spacing.small} 0;
`;

const InfoWrapper = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.medium};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 14px; /* Reduced from 16px (default for p/span) */
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`;

const OverlayTag = styled.span`
  position: absolute;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 10px; /* Reduced from 12px */
  font-weight: bold;
  color: white;
  background-color: black; /* Fully opaque */
  top: ${({ theme }) => theme.spacing.medium};
`;

const SourceTopLeft = styled(OverlayTag)`
  left: ${({ theme }) => theme.spacing.medium};
`;

const DueDateTopRight = styled(OverlayTag)<{ $isUrgent?: boolean }>`
  right: ${({ theme }) => theme.spacing.medium};
  background-color: ${({ theme, $isUrgent }) => $isUrgent ? theme.colors.danger : 'black'}; /* Change background based on urgency */
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.small};
  padding: 0 ${({ theme }) => theme.spacing.large} ${({ theme }) => theme.spacing.large};
`;

const IconButton = styled.button`
  background: none;
  border: none;
  font-size: 22px; /* Reduced from 24px */
  cursor: pointer;
  color: ${({ theme }) => theme.colors.textSecondary};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

interface JobPostCardProps {
  job: JobPosting;
  isInterested: boolean;
  onToggleInterest: (job: JobPosting) => void;
  onCreateResume: (job: JobPosting) => void;
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

  const calculateDDay = (dueDate: string | null | undefined): { text: string, isUrgent: boolean } => {
    if (!dueDate) return { text: '상시', isUrgent: false };
    try {
      const targetDate = new Date(dueDate);
      const now = new Date();
      if (isNaN(targetDate.getTime())) {
        return { text: '상시', isUrgent: false };
      }

      const diff = targetDate.getTime() - now.getTime();
      const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

      const isUrgent = days > 0 && days <= 7; // Urgent if 1 to 7 days left

      if (days < 0) {
        return { text: '마감', isUrgent: false };
      } else if (days === 0) {
        return { text: 'D-day', isUrgent: true }; // D-day is urgent
      } else {
        return { text: `D-${days}`, isUrgent: isUrgent };
      }
    } catch (error) {
      console.error("Error calculating D-day:", error);
      return { text: '상시', isUrgent: false }; // Fallback for error
    }
  };

  const dDay = calculateDDay(job.due_time); // Calculate D-day

  return (
    <CardWrapper onClick={(e) => {
      e.stopPropagation(); // Prevent event bubbling from inner buttons
      if (job.externalUrl) {
        window.open(job.externalUrl, '_blank');
      }
    }}>
      <ImageContainer>
        <JobImage src={job.title_images?.[0]} alt="Job Post Image" />
        {job.metadata.source && <SourceTopLeft>{job.metadata.source}</SourceTopLeft>}
        {dDay && <DueDateTopRight $isUrgent={dDay.isUrgent}>{dDay.text}</DueDateTopRight>} {/* Display D-day with urgency */}
      </ImageContainer>
      <TextAndButtonContainer>
        <ContentWrapper>
          <Company>{job.company.name}</Company>
          <Title>
  {Array.isArray(job.detail.position?.job)
    ? job.detail.position.job.join(', ')
    : job.detail.position?.job}
</Title>
          <InfoWrapper>
            <span>{job.company.address?.full_location}</span>
          </InfoWrapper>
          
        </ContentWrapper>
        <ButtonGroup>
          {isInterested && (
            <IconButton onClick={handleCreateClick} title="자기소개서 목록 열기">
              <FaListAlt />
            </IconButton>
          )}
          <IconButton onClick={handleInterestClick} title="관심 공고 등록/해제">
            {isInterested ? <FaStar /> : <FaRegStar />}
          </IconButton>
        </ButtonGroup>
      </TextAndButtonContainer>
    </CardWrapper>
  );
}
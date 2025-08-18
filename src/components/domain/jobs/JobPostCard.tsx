'use client';

import styled from 'styled-components';
import { JobPosting } from '@/types';
import { useState, useEffect } from 'react';
import { FaRegEdit, FaStar, FaRegStar, FaListAlt } from 'react-icons/fa';
import Tag from '@/components/common/Tag';

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
  border-radius: 4px;
  margin-bottom: ${({ theme }) => theme.spacing.medium};
  position: relative; /* For positioning overlays */
  overflow: hidden; /* Hide overflow if image is larger */
  flex-grow: 6; /* Image area takes 6 parts */
`;

const JobImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover; /* Cover the area, cropping if necessary */
`;

const TextAndButtonContainer = styled.div`
  flex-grow: 4; /* Text and button area takes 4 parts */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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

const OverlayTag = styled.span`
  position: absolute;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: bold;
  color: white;
  background-color: black; /* Fully opaque */
  top: ${({ theme }) => theme.spacing.medium};
`;

const SourceTopLeft = styled(OverlayTag)`
  left: ${({ theme }) => theme.spacing.medium};
`;

const DueDateTopRight = styled(OverlayTag)`
  right: ${({ theme }) => theme.spacing.medium};
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
  font-size: 24px;
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

  return (
    <CardWrapper>
      <ImageContainer>
        <JobImage src={job.title_images?.[0] || "https://blog.greetinghr.com/content/images/2022/03/---------------------.png"} alt="Job Post Image" />
        {job.metadata.source && <SourceTopLeft>{job.metadata.source}</SourceTopLeft>}
      </ImageContainer>
      <TextAndButtonContainer>
        <ContentWrapper>
          <Company>{job.company.name}</Company>
          <Title>{job.detail.position?.job?.join(', ')}</Title>
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
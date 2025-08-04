'use client';

import styled from 'styled-components';
import { Job } from '@/types/job';
import JobPostCard from './JobPostCard';

const ListWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.large};
`;

interface JobPostListProps {
  jobs: Job[];
  interestedJobIds: Set<number>;
  onToggleInterest: (job: Job) => void;
  onCreateResume: (job: Job) => void;
}

export default function JobPostList({ jobs, interestedJobIds, onToggleInterest, onCreateResume }: JobPostListProps) {
  return (
    <ListWrapper>
      {jobs.map((job) => (
        <JobPostCard 
          key={job.id} 
          job={job} 
          isInterested={interestedJobIds.has(job.id)}
          onToggleInterest={onToggleInterest}
          onCreateResume={onCreateResume}
        />
      ))}
    </ListWrapper>
  );
}

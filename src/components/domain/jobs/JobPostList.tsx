'use client';

import styled from 'styled-components';
import JobPostCard from './JobPostCard';

const ListWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.large};
`;

import { Job } from '@/types/job';

interface JobPostListProps {
  jobs: Job[];
}

export default function JobPostList({ jobs }: JobPostListProps) {
  return (
    <ListWrapper>
      {jobs.map((job) => (
        <JobPostCard key={job.id} job={job} />
      ))}
    </ListWrapper>
  );
}

'use client';

import styled from 'styled-components';
import JobPostCard from './JobPostCard';

const ListWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.large};
`;

interface Job {
  id: number;
  company: string;
  title: string;
  location: string;
  experience: string;
}

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

'use client';

import styled from 'styled-components';
import { JobPosting } from '@/types';
import JobPostCard from './JobPostCard';
import { motion } from 'framer-motion';

const ListWrapper = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.large};
`;

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      ease: 'easeInOut',
      duration: 0.5,
    },
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

interface JobPostListProps {
  jobs: JobPosting[];
  onToggleInterest: (job: JobPosting) => void;
  onCreateResume: (job: JobPosting) => void;
}

export default function JobPostList({ jobs, onToggleInterest, onCreateResume }: JobPostListProps) {
  return (
    <ListWrapper
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {jobs.map((job) => (
        <motion.div key={job.id} variants={cardVariants} onClick={() => window.open(job.external_url, '_blank')}>
          <JobPostCard 
            job={job} 
            isInterested={job.bookmarked || false}
            onToggleInterest={onToggleInterest}
            onCreateResume={onCreateResume}
          />
        </motion.div>
      ))}
    </ListWrapper>
  );
}

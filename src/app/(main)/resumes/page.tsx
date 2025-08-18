'use client';

import AuthGuard from '@/components/auth/AuthGuard';
import Button from '@/components/common/Button';
import JobPostCard from '@/components/domain/jobs/JobPostCard';
import InterestedJobResumesModal from '@/components/domain/resumes/InterestedJobResumesModal';
import ResumeCard from '@/components/domain/resumes/ResumeCard';
import { getBookmarkedJobPostings, removeBookmark } from '@/lib/api/jobs';
import { createCoverLetter, getCoverLetters } from '@/lib/api/resumes';
import { JobPosting, Resume } from '@/types';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const ResumesPageContainer = styled(motion.div)`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 24px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.xlarge};
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 800;
`;

const Section = styled(motion.section)`
  margin-bottom: ${({ theme }) => theme.spacing.xlarge};
`;

const SectionTitle = styled.h2`
  font-size: 22px;
  font-weight: bold;
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`;

const SectionHeaderWithButton = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`;

const ItemGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: ${({ theme }) => theme.spacing.large};
`;

const Separator = styled.hr`
  border: none;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  margin: ${({ theme }) => theme.spacing.xlarge} 0;
`;

const NoDataMessage = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: center;
  padding: ${({ theme }) => theme.spacing.medium} 0;
`;

function ResumesPageContent() {
  const [profileResumes, setProfileResumes] = useState<Resume[]>([]);
  const [interestedJobs, setInterestedJobs] = useState<JobPosting[]>([]);
  const [selectedJob, setSelectedJob] = useState<JobPosting | null>(null);
  const router = useRouter();

  useEffect(() => {
    getCoverLetters('profile').then(res => setProfileResumes(res.items));
    getBookmarkedJobPostings(0, 100).then(res => setInterestedJobs(res.items));
  }, []);

  const handleCreateProfileResume = async () => {
    try {
      const newResume = await createCoverLetter({ title: '새 프로필 기반 자소서', type: 'profile' });
      router.push(`/resumes/profile-based/${newResume.id}`);
    } catch (error) {
      alert(error instanceof Error ? error.message : '자소서 생성 실패');
    }
  };

  const handleToggleInterest = async (job: JobPosting) => {
    await removeBookmark(job.id);
    setInterestedJobs(prevJobs => prevJobs.filter(j => j.id !== job.id));
  };

  const handleCreateResume = (job: JobPosting) => {
    setSelectedJob(job);
  };

  return (
    <ResumesPageContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
    >
            <Header>
        <Title>자소서 관리</Title>
      </Header>

      <Section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <SectionHeaderWithButton>
          <SectionTitle>프로필 기반 자기소개서</SectionTitle>
          <Button onClick={handleCreateProfileResume}>+ 새 프로필 기반 자소서 작성</Button>
        </SectionHeaderWithButton>
        {profileResumes.length > 0 ? (
          <ItemGrid>
            {profileResumes.map(r => <ResumeCard key={r.id} resume={r} />)}
          </ItemGrid>
        ) : (
          <NoDataMessage>아직 작성된 프로필 기반 자기소개서가 없습니다.</NoDataMessage>
        )}
      </Section>

      <Separator />

      <Section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
      >
        <SectionTitle>관심 공고</SectionTitle>
        {interestedJobs.length > 0 ? (
          <ItemGrid>
            {interestedJobs.map(job => (
              <div key={job.id} onClick={() => setSelectedJob(job)} style={{ cursor: 'pointer' }}>
                <JobPostCard 
                  job={job} 
                  isInterested={true}
                  onToggleInterest={handleToggleInterest}
                  onCreateResume={handleCreateResume}
                />
              </div>
            ))}
          </ItemGrid>
        ) : (
          <NoDataMessage>아직 관심 공고가 없습니다.</NoDataMessage>
        )}
      </Section>

      {selectedJob && (
        <InterestedJobResumesModal 
          job={selectedJob} 
          onClose={() => setSelectedJob(null)} 
        />
      )}
    </ResumesPageContainer>
  );
}

export default function ResumesPage() {
  return <AuthGuard><ResumesPageContent /></AuthGuard>;
}
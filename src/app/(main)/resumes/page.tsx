'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import { Resume, Job } from '@/types';
import { getResumes, createProfileBasedResume, createJobBasedResume } from '@/lib/api/resumes';
import { getInterestedJobs, removeInterestedJob } from '@/lib/api/jobs';
import AuthGuard from '@/components/auth/AuthGuard';
import Button from '@/components/common/Button';
import ResumeCard from '@/components/domain/resumes/ResumeCard';
import JobPostCard from '@/components/domain/jobs/JobPostCard';
import InterestedJobResumesModal from '@/components/domain/resumes/InterestedJobResumesModal';

const ResumesPageContainer = styled.div`
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

const Section = styled.section`
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

function ResumesPageContent() {
  const [profileResumes, setProfileResumes] = useState<Resume[]>([]);
  const [interestedJobs, setInterestedJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const router = useRouter();

  useEffect(() => {
    getResumes().then(allResumes => {
      setProfileResumes(allResumes.filter(r => r.basedOn === 'profile'));
    });
    getInterestedJobs().then(setInterestedJobs);
  }, []);

  const handleCreateProfileResume = async () => {
    try {
      const newResume = await createProfileBasedResume();
      router.push(`/resumes/profile-based/${newResume.id}`);
    } catch (error) {
      alert(error instanceof Error ? error.message : '자소서 생성 실패');
    }
  };

  const handleToggleInterest = async (job: Job) => {
    await removeInterestedJob(job.id);
    setInterestedJobs(prevJobs => prevJobs.filter(j => j.id !== job.id));
  };

  const handleCreateResume = (job: Job) => {
    setSelectedJob(job);
  };

  return (
    <ResumesPageContainer>
            <Header>
        <Title>자소서 관리</Title>
      </Header>

      <Section>
        <SectionHeaderWithButton>
          <SectionTitle>프로필 기반 자기소개서</SectionTitle>
          <Button onClick={handleCreateProfileResume}>+ 새 프로필 기반 자소서 작성</Button>
        </SectionHeaderWithButton>
        <ItemGrid>
          {profileResumes.map(r => <ResumeCard key={r.id} resume={r} />)}
        </ItemGrid>
      </Section>

      <Separator />

      <Section>
        <SectionTitle>관심 공고</SectionTitle>
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

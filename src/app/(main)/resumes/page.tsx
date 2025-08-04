'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import { Resume, Job } from '@/types';
import { getResumes, createProfileBasedResume } from '@/lib/api/resumes';
import { getInterestedJobs } from '@/lib/api/jobs';
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

const ItemGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: ${({ theme }) => theme.spacing.large};
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

  const handleCreateResume = async () => {
    try {
      const newResume = await createProfileBasedResume();
      router.push(`/resumes/profile-based/${newResume.id}`);
    } catch (error) {
      alert(error instanceof Error ? error.message : '자소서 생성 실패');
    }
  };

  return (
    <ResumesPageContainer>
      <Header>
        <Title>자소서 관리</Title>
        <Button onClick={handleCreateResume}>+ 새 프로필 기반 자소서 작성</Button>
      </Header>

      <Section>
        <SectionTitle>프로필 기반 자기소개서</SectionTitle>
        <ItemGrid>
          {profileResumes.map(r => <ResumeCard key={r.id} resume={r} />)}
        </ItemGrid>
      </Section>

      <Section>
        <SectionTitle>관심 공고</SectionTitle>
        <ItemGrid>
          {interestedJobs.map(job => (
            <div key={job.id} onClick={() => setSelectedJob(job)} style={{ cursor: 'pointer' }}>
              <JobPostCard job={job} />
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

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import { Resume } from '@/types';
import { getResumes, createProfileBasedResume } from '@/lib/api/resumes';
import AuthGuard from '@/components/auth/AuthGuard';
import Button from '@/components/common/Button';
import ResumeCard from '@/components/domain/resumes/ResumeCard';

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

const ResumeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: ${({ theme }) => theme.spacing.large};
`;

function ResumesPageContent() {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const router = useRouter();

  useEffect(() => {
    getResumes().then(setResumes);
  }, []);

  const handleCreateResume = async () => {
    try {
      const newResume = await createProfileBasedResume();
      router.push(`/resumes/${newResume.id}`);
    } catch (error) {
      alert(error instanceof Error ? error.message : '자소서 생성 실패');
    }
  };

  const profileBasedResumes = resumes.filter(r => r.basedOn === 'profile');
  const jobBasedResumes = resumes.filter(r => r.basedOn === 'job');

  return (
    <ResumesPageContainer>
      <Header>
        <Title>자소서 관리</Title>
        <Button onClick={handleCreateResume}>+ 새 프로필 기반 자소서 작성</Button>
      </Header>

      <Section>
        <SectionTitle>프로필 기반 자기소개서</SectionTitle>
        <ResumeGrid>
          {profileBasedResumes.map(r => <ResumeCard key={r.id} resume={r} />)}
        </ResumeGrid>
      </Section>

      <Section>
        <SectionTitle>공고 기반 자기소개서</SectionTitle>
        <ResumeGrid>
          {jobBasedResumes.map(r => <ResumeCard key={r.id} resume={r} />)}
        </ResumeGrid>
      </Section>
    </ResumesPageContainer>
  );
}

export default function ResumesPage() {
  return <AuthGuard><ResumesPageContent /></AuthGuard>;
}

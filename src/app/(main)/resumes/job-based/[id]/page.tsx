'use client';

import AuthGuard from '@/components/auth/AuthGuard';
import CompetencyAnalysis from '@/components/domain/resumes/CompetencyAnalysis';
import JobPostingInfoCard from '@/components/domain/resumes/JobPostingInfoCard';
import ResumeQnA from '@/components/domain/resumes/ResumeQnA';
import { addResumeQnA, deleteResumeQnA, getResumeById, updateResumeQnA } from '@/lib/api/resumes';
import { Resume } from '@/types';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const AnalysisPageContainer = styled.div`
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  padding: 40px 24px;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.large};
`;

const Loading = styled.p`
  text-align: center;
  padding: 50px;
`;

const ResumeHeader = styled.header`
  margin-bottom: ${({ theme }) => theme.spacing.large};
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 800;
  margin-bottom: ${({ theme }) => theme.spacing.small};
`;

const Subtitle = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

interface Props {
  params: { id: string };
}

function ResumeAnalysisPageContent({ params }: Props) {
  const [resume, setResume] = useState<Resume | null>(null);

  useEffect(() => {
    getResumeById(params.id).then(data => {
      if (data) setResume(data);
    });
  }, [params.id]);

  const handleUpdateQnA = async (qnaId: string, question: string, answer: string) => {
    if (!resume) return;
    const updatedResume = await updateResumeQnA(resume.id, qnaId, question, answer);
    setResume(updatedResume);
  };

  const handleAddQnA = async () => {
    if (!resume) return;
    const updatedResume = await addResumeQnA(resume.id);
    setResume(updatedResume);
  };

  const handleDeleteQnA = async (qnaId: string) => {
    if (!resume) return;
    const updatedResume = await deleteResumeQnA(resume.id, qnaId);
    setResume(updatedResume);
  };

  if (!resume) return <Loading>자기소개서 정보를 불러오는 중...</Loading>;

  return (
    <AnalysisPageContainer>
      <ResumeHeader>
        <Title>{resume.title}</Title>
        <Subtitle>최종 수정일: {new Date(resume.updatedAt).toLocaleDateString()}</Subtitle>
      </ResumeHeader>

      <JobPostingInfoCard resume={resume} />
      <CompetencyAnalysis />

      <ResumeQnA 
        qnas={resume.qnas} 
        onUpdate={handleUpdateQnA}
        onAdd={handleAddQnA}
        onDelete={handleDeleteQnA}
      />
    </AnalysisPageContainer>
  );
}

export default function ResumeAnalysisPage({ params }: Props) {
  return <AuthGuard><ResumeAnalysisPageContent params={params} /></AuthGuard>;
}


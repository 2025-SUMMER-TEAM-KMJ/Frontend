'use client';

import AuthGuard from '@/components/auth/AuthGuard';
import CompetencyAnalysis from '@/components/domain/resumes/CompetencyAnalysis';
import JobPostingInfoCard from '@/components/domain/resumes/JobPostingInfoCard';
import ResumeQnA from '@/components/domain/resumes/ResumeQnA';
import { addResumeQnA, deleteResumeQnA, getResumeById, updateResumeQnA } from '@/lib/api/resumes';
import { Resume } from '@/types';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

// Mock Data for job-based skills
const mockUsedSkills = [
  { id: '1', name: 'SQL' },
  { id: '2', name: 'MSSQL' },
  { id: '3', name: '데이터 시각화' },
  { id: '4', name: '문제 해결 능력' },
  { id: '5', name: 'A/B 테스트' },
];
const mockImproveSkills = [
  { id: '6', name: 'KBS' },
  { id: '7', name: 'MBN' },
  { id: '8', name: '프로젝트 관리' },
  { id: '9', name: '고객 데이터 분석' },
  { id: '10', name: '커뮤니케이션' },
];

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
      <CompetencyAnalysis
        title="AI 역량 분석"
        sections={[
          {
            subtitle: "자기소개서에서 강조된 나의 핵심 역량입니다.",
            competencies: mockUsedSkills,
            tagColor: "#eaf2ff", // Actual color value
          },
          {
            subtitle: "직무와 관련하여 자기소개서에 충분히 드러나지 않은 역량입니다.",
            competencies: mockImproveSkills,
            tagColor: "lightGray", // Actual color value (from theme)
          },
        ]}
      />

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


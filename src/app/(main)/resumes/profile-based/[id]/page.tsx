'use client';

import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Resume, QnA } from '@/types';
import { getResumeById, updateResumeQnA, addResumeQnA, deleteResumeQnA } from '@/lib/api/resumes';
import AuthGuard from '@/components/auth/AuthGuard';
import ProfileSkills from '@/components/domain/resumes/analysis/ProfileSkills';
import ResumeQnA from '@/components/domain/resumes/analysis/ResumeQnA';
import EditQnADualModal from '@/components/domain/resumes/EditQnADualModal';

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

const mockProfileSkills = [
  '3년차 프론트엔드 개발자입니다. 사용자 경험 개선에 관심이 많습니다.',
  'React 기술을 보유하고 있습니다.',
  'TypeScript 기술을 보유하고 있습니다.',
  'Next.js 기술을 보유하고 있습니다.',
  'CareerGo에서 프론트엔드 개발자로 근무하며 AI 기반 채용 서비스 개발 경험을 쌓았습니다.'
];

interface Props {
  params: { id: string };
}

function ResumeAnalysisPageContent({ params }: Props) {
  const [resume, setResume] = useState<Resume | null>(null);
  const [editingQnA, setEditingQnA] = useState<QnA | null>(null);

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

  const handleEditQnA = (qna: QnA) => {
    setEditingQnA(qna);
  };

  const handleSaveEditedQnA = async (qnaId: string, newQuestion: string, newAnswer: string) => {
    if (!resume) return;
    const updatedResume = await updateResumeQnA(resume.id, qnaId, newQuestion, newAnswer);
    setResume(updatedResume);
    setEditingQnA(null); // Close modal
  };

  if (!resume) return <Loading>자기소개서 정보를 불러오는 중...</Loading>;

  return (
    <AnalysisPageContainer>
      <ResumeHeader>
        <Title>{resume.title}</Title>
        <Subtitle>최종 수정일: {new Date(resume.updatedAt).toLocaleDateString()}</Subtitle>
      </ResumeHeader>

      <ProfileSkills skills={mockProfileSkills} />

      <ResumeQnA 
        qnas={resume.qnas} 
        onUpdate={handleUpdateQnA}
        onAdd={handleAddQnA}
        onDelete={handleDeleteQnA}
        onEdit={handleEditQnA}
      />

      {editingQnA && (
        <EditQnADualModal
          qna={editingQnA}
          resumeId={resume.id}
          onSave={handleSaveEditedQnA}
          onClose={() => setEditingQnA(null)}
        />
      )}
    </AnalysisPageContainer>
  );
}

export default function ResumeAnalysisPage({ params }: Props) {
  return <AuthGuard><ResumeAnalysisPageContent params={params} /></AuthGuard>;
}

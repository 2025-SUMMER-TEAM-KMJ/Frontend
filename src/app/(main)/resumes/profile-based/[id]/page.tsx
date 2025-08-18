'use client';

import AuthGuard from '@/components/auth/AuthGuard';
import CompetencyAnalysis from '@/components/domain/resumes/CompetencyAnalysis';
import EditQnADualModal from '@/components/domain/resumes/EditQnADualModal'; // New import
import ResumeQnA from '@/components/domain/resumes/ResumeQnA';
import { getProfile } from '@/lib/api/profile';
import { getCoverLetter, updateQnA, createQnA, deleteQnA } from '@/lib/api/resumes';
import { Profile, QnA, Resume } from '@/types';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

// Mock Data for profile-based improve skills
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

function ProfileBasedResumeDetailPageContent({ params }: Props) {
  const [resume, setResume] = useState<Resume | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [editingQnA, setEditingQnA] = useState<QnA | null>(null); // Add editingQnA state

  useEffect(() => {
    getCoverLetter(params.id).then(data => {
      if (data) setResume(data);
    });
    getProfile().then(data => {
      if (data) setProfile(data);
    });
  }, [params.id]);

  const handleUpdateQnA = async (qnaId: string, question: string, answer: string) => {
    if (!resume) return;
    const updatedResume = await updateQnA(resume.id, qnaId, { question, answer });
    setResume(updatedResume);
  };

  const handleAddQnA = async () => {
    if (!resume) return;
    const updatedResume = await createQnA(resume.id, { question: '새로운 질문', answer: '' });
    setResume(updatedResume);
  };

  const handleDeleteQnA = async (qnaId: string) => {
    if (!resume) return;
    const updatedResume = await deleteQnA(resume.id, qnaId);
    setResume(updatedResume);
  };

  const handleEditQnA = (qna: QnA) => { // Add handleEditQnA function
    setEditingQnA(qna);
  };

  const handleSaveEditedQnA = async (qnaId: string, newQuestion: string, newAnswer: string) => { // Add handleSaveEditedQnA function
    if (!resume) return;
    const updatedResume = await updateQnA(resume.id, qnaId, { question: newQuestion, answer: newAnswer });
    setResume(updatedResume);
    setEditingQnA(null); // Close modal
  };

  if (!resume || !profile) return <Loading>자기소개서 정보를 불러오는 중...</Loading>;

  return (
    <>
      <AnalysisPageContainer>
        <ResumeHeader>
          <Title>{resume.title}</Title>
          <Subtitle>최종 수정일: {new Date(resume.updated_at).toLocaleDateString()}</Subtitle>
        </ResumeHeader>

        <CompetencyAnalysis
          title="나의 역량 분석"
          sections={[
            {
              subtitle: "프로필에서 강조된 나의 핵심 역량입니다.",
              competencies: profile.competencies.map(c => ({ id: c, name: c })),
              tagColor: "#eaf2ff", // Actual color value
            },
            {
              subtitle: "프로필에 충분히 드러나지 않은 역량입니다.",
              competencies: mockImproveSkills,
              tagColor: "lightGray", // Actual color value (from theme)
            },
          ]}
        />

        <ResumeQnA 
          qnas={resume.qnas} 
          onAdd={handleAddQnA}
          onDelete={handleDeleteQnA}
          onEdit={handleEditQnA} // Pass onEdit handler
          isMultiple={false}
        />
      </AnalysisPageContainer>

      {editingQnA && (
        <EditQnADualModal
          qna={editingQnA}
          resumeId={resume.id}
          onSave={handleSaveEditedQnA}
          onClose={() => setEditingQnA(null)}
        />
      )}
    </>
  );
}

export default function ProfileBasedResumeDetailPage({ params }: Props) {
  return <AuthGuard><ProfileBasedResumeDetailPageContent params={params} /></AuthGuard>;
}

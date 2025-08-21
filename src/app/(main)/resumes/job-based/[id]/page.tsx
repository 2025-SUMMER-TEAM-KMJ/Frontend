'use client';

import AuthGuard from '@/components/auth/AuthGuard';
import CompetencyAnalysis from '@/components/domain/resumes/CompetencyAnalysis';
import EditQnADualModal from '@/components/domain/resumes/EditQnADualModal'; // New import
import ResumeQnA from '@/components/domain/resumes/ResumeQnA';
import { createQnA, deleteQnA, getCoverLetter, updateCoverLetter, updateQnA } from '@/lib/api/resumes';
import { QnA, Resume } from '@/types';
import { useEffect, useState } from 'react';
import { FaPencilAlt, FaSave } from 'react-icons/fa';
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

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.small};
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 800;
`;

const TitleInput = styled.input`
  font-size: 32px;
  font-weight: 800;
  border: none;
  outline: none;
  width: 100%;
  padding: 0;
  background-color: transparent;
  border-bottom: 2px solid ${({ theme }) => theme.colors.primary};
`;

const EditIcon = styled(FaPencilAlt)`
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const SaveIcon = styled(FaSave)`
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Subtitle = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-top: ${({ theme }) => theme.spacing.small};
`;

interface Props {
  params: { id: string };
}

function ResumeAnalysisPageContent({ params }: Props) {
  const [resume, setResume] = useState<Resume | null>(null);
  const [editingQnA, setEditingQnA] = useState<QnA | null>(null); // Add editingQnA state
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');

  useEffect(() => {
    getCoverLetter(params.id).then(data => {
      if (data) {
        setResume(data);
        setEditedTitle(data.title);
      }
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

  const handleEditQnA = (qna: QnA) => {
    // Add handleEditQnA function
    setEditingQnA(qna);
  };

  const handleSaveEditedQnA = async (qnaId: string, newQuestion: string, newAnswer: string) => {
    // Add handleSaveEditedQnA function
    if (!resume) return;
    const updatedResume = await updateQnA(resume.id, qnaId, { question: newQuestion, answer: newAnswer });
    setResume(updatedResume);
    setEditingQnA(null); // Close modal
  };

  const handleSaveTitle = async () => {
    if (!resume) return;
    const updatedResume = await updateCoverLetter(resume.id, { title: editedTitle });
    setResume(updatedResume);
    setIsEditingTitle(false);
  };

  if (!resume) return <Loading>자기소개서 정보를 불러오는 중...</Loading>;

  return (
    <>
      <AnalysisPageContainer>
        <ResumeHeader>
          <TitleContainer>
            {isEditingTitle ? (
              <TitleInput
                type="text"
                value={editedTitle}
                onChange={e => setEditedTitle(e.target.value)}
                onBlur={handleSaveTitle}
                onKeyPress={e => e.key === 'Enter' && handleSaveTitle()}
              />
            ) : (
              <Title>{resume.title}</Title>
            )}
            {isEditingTitle ? (
              <SaveIcon onClick={handleSaveTitle} />
            ) : (
              <EditIcon onClick={() => setIsEditingTitle(true)} />
            )}
          </TitleContainer>
          <Subtitle>최종 수정일: {new Date(resume.updated_at).toLocaleDateString()}</Subtitle>
        </ResumeHeader>

        {/* <JobPostingInfoCard resume={resume} /> */}
        <CompetencyAnalysis
          title="AI 역량 분석"
          sections={[
            {
              subtitle: '자기소개서에서 강조된 나의 핵심 역량입니다.',
              competencies: resume.strength.map(s => ({ id: s, name: s })),
              tagColor: '#eaf2ff', // Actual color value
            },
            {
              subtitle: '직무와 관련하여 자기소개서에 충분히 드러나지 않은 역량입니다.',
              competencies: resume.weakness.map(w => ({ id: w, name: w })),
              tagColor: 'lightGray', // Actual color value (from theme)
            },
          ]}
        />

        <ResumeQnA
          qnas={resume.qnas}
          onAdd={handleAddQnA}
          onDelete={handleDeleteQnA}
          onEdit={handleEditQnA} // Pass onEdit handler
          isMultiple={true}
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

export default function ResumeAnalysisPage({ params }: Props) {
  return (
    <AuthGuard>
      <ResumeAnalysisPageContent params={params} />
    </AuthGuard>
  );
}

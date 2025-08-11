'use client';

import AuthGuard from '@/components/auth/AuthGuard';
import Tag from '@/components/common/Tag';
import EditQnADualModal from '@/components/domain/resumes/EditQnADualModal';
import ResumeQnA from '@/components/domain/resumes/ResumeQnA';
import { addResumeQnA, deleteResumeQnA, getResumeById, updateResumeQnA } from '@/lib/api/resumes';
import { QnA, Resume } from '@/types';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const ResumeDetailPageContainer = styled.div`
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

const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`;

const ContentText = styled.p`
  font-size: 16px;
  line-height: 1.6;
  white-space: pre-wrap;
`;

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.small};
`;

const Card = styled.div`
  background-color: white;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  padding: ${({ theme }) => theme.spacing.large};
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
`;

interface Props {
  params: { id: string };
}

function ProfileBasedResumeDetailPageContent({ params }: Props) {
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
    <ResumeDetailPageContainer>
      <ResumeHeader>
        <Title>{resume.title}</Title>
        <Subtitle>최종 수정일: {new Date(resume.updatedAt).toLocaleDateString()}</Subtitle>
      </ResumeHeader>

      <Card>
        <SectionTitle>나의 역량</SectionTitle>
        <TagContainer>
          {resume.snapshot.skills.map(skill => (
            <Tag key={skill.id}>{skill.name}</Tag>
          ))}
        </TagContainer>
      </Card>

      <Card>
        <SectionTitle>자기소개</SectionTitle>
        <ContentText>{resume.snapshot.brief}</ContentText>
      </Card>

      <Card>
        <SectionTitle>자기소개서 질문과 답변</SectionTitle>
        <ResumeQnA 
          qnas={resume.qnas} 
          onAdd={handleAddQnA}
          onDelete={handleDeleteQnA}
          onEdit={handleEditQnA}
        />
      </Card>

      {editingQnA && (
        <EditQnADualModal
          qna={editingQnA}
          resumeId={resume.id}
          onSave={handleSaveEditedQnA}
          onClose={() => setEditingQnA(null)}
        />
      )}
    </ResumeDetailPageContainer>
  );
}

export default function ProfileBasedResumeDetailPage({ params }: Props) {
  return <AuthGuard><ProfileBasedResumeDetailPageContent params={params} /></AuthGuard>;
}

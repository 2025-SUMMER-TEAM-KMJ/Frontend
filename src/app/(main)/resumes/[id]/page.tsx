'use client';

import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Resume } from '@/types';
import { getResumeById, updateResumeQnA } from '@/lib/api/resumes';
import AuthGuard from '@/components/auth/AuthGuard';
import QnAItem from '@/components/domain/resumes/QnAItem';
import Button from '@/components/common/Button';

const DetailPageContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 24px;
`;

const Header = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xlarge};
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 800;
`;

const Subtitle = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-top: ${({ theme }) => theme.spacing.small};
`;

const SnapshotInfo = styled.div` // 임시 컴포넌트
  background-color: ${({ theme }) => theme.colors.lightGray};
  padding: 12px;
  border-radius: 8px;
  font-size: 14px;
  margin-bottom: ${({ theme }) => theme.spacing.large};
`;

interface Props {
  params: { id: string };
}

function ResumeDetailPageContent({ params }: Props) {
  const [resume, setResume] = useState<Resume | null>(null);

  useEffect(() => {
    getResumeById(params.id).then(data => {
      if (data) setResume(data);
    });
  }, [params.id]);

  const handleSaveQnA = async (qnaId: string, newAnswer: string) => {
    if (!resume) return;
    const updatedResume = await updateResumeQnA(resume.id, qnaId, newAnswer);
    setResume(updatedResume); // Update state to reflect change
  };

  if (!resume) return <p>Loading...</p>;

  return (
    <DetailPageContainer>
      <Header>
        <Title>{resume.title}</Title>
        <Subtitle>최종 수정: {resume.updatedAt}</Subtitle>
      </Header>

      <SnapshotInfo>
        이 자소서는 <strong>{resume.snapshot?.basicInfo?.name || '알 수 없음'}</strong>님의 프로필 (스냅샷)을 기반으로 작성되었습니다.
      </SnapshotInfo>

      <div>
        {resume.qnas.map(qna => (
          <QnAItem key={qna.id} item={qna} onSave={handleSaveQnA} />
        ))}
      </div>

      <Button style={{ marginTop: '24px' }}>AI로 전체 자소서 재생성</Button>
    </DetailPageContainer>
  );
}

export default function ResumeDetailPage({ params }: Props) {
  return <AuthGuard><ResumeDetailPageContent params={params} /></AuthGuard>;
}

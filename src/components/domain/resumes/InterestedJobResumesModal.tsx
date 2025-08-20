'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import { JobPosting, Resume } from '@/types';
import { getCoverLetters, createCoverLetter } from '@/lib/api/resumes';
import ResumeCard from './ResumeCard';
import Button from '@/components/common/Button';
import GenerateResumeModal from './GenerateResumeModal'; // Import the new modal

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: ${({ theme }) => theme.spacing.xlarge};
  border-radius: 8px;
  width: 90%;
  max-width: 800px;
  height: 80vh;
  display: flex;
  flex-direction: column;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.large};
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
`;

const ContentContainer = styled.div`
  flex-grow: 1;
  overflow-y: auto;
`;

const ResumeList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.large};
`;

const EmptyContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  gap: ${({ theme }) => theme.spacing.large};
`;

const EmptyMessage = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
`;

interface Props {
  job: JobPosting;
  onClose: () => void;
}

export default function InterestedJobResumesModal({ job, onClose }: Props) {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showGenerateResumeModal, setShowGenerateResumeModal] = useState(false); // State for the new modal
  const router = useRouter();

  useEffect(() => {
    const fetchResumes = async () => {
      setIsLoading(true);
      const data = await getCoverLetters('job_posting', job.id);
      setResumes(data.items);
      setIsLoading(false);
    };
    fetchResumes();
  }, [job.id]);

  const handleOpenGenerateResumeModal = () => {
    setShowGenerateResumeModal(true);
  };

  const handleGenerateResumeSubmit = async (title: string, questions: string) => {
    try {
      const qnas = questions.split('\n').filter(q => q.trim() !== '').map(q => ({ question: q.trim(), answer: '' }));
      const newResume = await createCoverLetter({ title, type: 'job_posting', job_posting_id: job.id, qnas });
      router.push(`/resumes/job-based/${newResume.id}`);
      onClose(); // Close the parent modal
    } catch (error) {
      alert(error instanceof Error ? error.message : '자소서 생성 실패');
    }
    setShowGenerateResumeModal(false); // Close the generate resume modal
  };

  return (
    <ModalBackdrop onClick={onClose}>
      <>
        <ModalContent onClick={(e) => e.stopPropagation()}>
          <ModalHeader>
            <Title>`${job.detail.position?.job?.[0] || job.company.name}` 기반 자소서 목록</Title>
            <CloseButton onClick={onClose}>×</CloseButton>
          </ModalHeader>
          <ContentContainer>
            {isLoading ? (
              <p>로딩 중...</p>
            ) : resumes.length > 0 ? (
              <ResumeList>
                {resumes.map(resume => (
                  <ResumeCard key={resume.id} resume={resume} />
                ))}
              </ResumeList>
            ) : (
              <EmptyContainer>
                <EmptyMessage>해당 공고로 작성된 자소서가 없습니다.</EmptyMessage>
                <Button onClick={handleOpenGenerateResumeModal}>이 공고로 자소서 생성하기</Button>
              </EmptyContainer>
            )}
          </ContentContainer>
        </ModalContent>
        {showGenerateResumeModal && (
          <GenerateResumeModal
            job={job}
            onClose={() => setShowGenerateResumeModal(false)}
            onSubmit={handleGenerateResumeSubmit}
          />
        )}
      </>
    </ModalBackdrop>
  );
}
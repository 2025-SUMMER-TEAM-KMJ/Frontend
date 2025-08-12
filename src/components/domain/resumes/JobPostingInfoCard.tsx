'use client';

import { JobPosting, Resume } from '@/types';
import { useState } from 'react'; // useState 임포트 추가
import styled from 'styled-components';

const CardContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  padding: ${({ theme }) => theme.spacing.large};
  margin-bottom: ${({ theme }) => theme.spacing.xlarge};
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: ${({ theme }) => theme.spacing.medium};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.small};
  cursor: pointer; // 클릭 가능하도록 커서 변경
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.medium};
`;

const InfoItem = styled.div<{ preWrap?: boolean }>`
  font-size: 16px;
  strong {
    font-weight: bold;
    margin-right: 8px;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
  ${({ preWrap }) => preWrap && `
    white-space: pre-wrap;
  `}
`;

interface Props {
  resume: Resume;
}

// Mock Icon
const DocumentIcon = () => <span>📄</span>;

export default function JobPostingInfoCard({ resume }: Props) {
  const [isOpen, setIsOpen] = useState(true); // 토글 상태 추가

  if (!resume.jobInfo) return null;

  const jobPosting: JobPosting = resume.jobInfo;

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <CardContainer>
      <SectionTitle onClick={handleToggle}>
        공고 정보 {isOpen ? '▲' : '▼'} {/* 토글 아이콘 추가 */}
      </SectionTitle>
      {isOpen && ( // isOpen 상태에 따라 InfoGrid 표시
        <InfoGrid>
          <InfoItem><strong>기업명:</strong> {jobPosting.company.name}</InfoItem>
          <InfoItem><strong>직군:</strong> {jobPosting.detail.position.jobGroup}</InfoItem>
          <InfoItem><strong>직무:</strong> {jobPosting.detail.position.job.join(', ')}</InfoItem>
          <InfoItem><strong>근무지:</strong> {jobPosting.company.address.full_location}</InfoItem>
          <InfoItem preWrap><strong>회사 소개:</strong> {jobPosting.detail.intro}</InfoItem>
          <InfoItem preWrap><strong>주요 업무:</strong> {jobPosting.detail.main_tasks}</InfoItem>
          <InfoItem preWrap><strong>자격 요건:</strong> {jobPosting.detail.requirements}</InfoItem>
          <InfoItem preWrap><strong>우대 사항:</strong> {jobPosting.detail.preferred_points}</InfoItem>
          <InfoItem preWrap><strong>혜택 및 복지:</strong> {jobPosting.detail.benefits}</InfoItem>
          <InfoItem preWrap><strong>채용 절차:</strong> {jobPosting.detail.hire_rounds}</InfoItem>
          <InfoItem><strong>마감일:</strong> {new Date(jobPosting.metadata.crawledAt).toLocaleDateString()}</InfoItem>
        </InfoGrid>
      )}
    </CardContainer>
  );
}

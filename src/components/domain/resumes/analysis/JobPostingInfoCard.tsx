'use client';

import styled from 'styled-components';
import { Resume, JobPosting } from '@/types';

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
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing.medium};
`;

const InfoItem = styled.div`
  font-size: 16px;
  strong {
    font-weight: bold;
    margin-right: 8px;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

interface Props {
  resume: Resume;
}

// Mock Icon
const DocumentIcon = () => <span>📄</span>;

export default function JobPostingInfoCard({ resume }: Props) {
  if (!resume.jobInfo) return null;

  const jobPosting: JobPosting = resume.jobInfo;

  return (
    <CardContainer>
      <SectionTitle><DocumentIcon /> 공고 정보</SectionTitle>
      <InfoGrid>
        <InfoItem><strong>공고명:</strong> {jobPosting.detail.position.job[0]}</InfoItem>
        <InfoItem><strong>기업명:</strong> {jobPosting.company.name}</InfoItem>
        <InfoItem><strong>직무:</strong> {jobPosting.detail.position.jobGroup} - {jobPosting.detail.position.job.join(', ')}</InfoItem>
        <InfoItem><strong>근무지:</strong> {jobPosting.company.address.full_location}</InfoItem>
        <InfoItem><strong>주요 업무:</strong> {jobPosting.detail.main_tasks}</InfoItem>
        <InfoItem><strong>자격 요건:</strong> {jobPosting.detail.requirements}</InfoItem>
        <InfoItem><strong>우대 사항:</strong> {jobPosting.detail.preferred_points}</InfoItem>
        <InfoItem><strong>혜택 및 복지:</strong> {jobPosting.detail.benefits}</InfoItem>
        <InfoItem><strong>채용 절차:</strong> {jobPosting.detail.hire_rounds}</InfoItem>
        <InfoItem><strong>제출일:</strong> {new Date(resume.updatedAt).toLocaleDateString()}</InfoItem>
      </InfoGrid>
    </CardContainer>
  );
}

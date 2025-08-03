'use client';

import styled from 'styled-components';
import { Resume } from '@/types';

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

export default function ApplicationInfoCard({ resume }: Props) {
  if (!resume.jobInfo) return null;

  return (
    <CardContainer>
      <SectionTitle><DocumentIcon /> 지원 정보</SectionTitle>
      <InfoGrid>
        <InfoItem><strong>공고명:</strong> {resume.jobInfo.title}</InfoItem>
        <InfoItem><strong>기업명:</strong> {resume.jobInfo.company}</InfoItem>
        <InfoItem><strong>직무:</strong> 데이터 분석</InfoItem> {/* Mock Data */}
        <InfoItem><strong>제출일:</strong> {new Date(resume.updatedAt).toLocaleDateString()}</InfoItem>
      </InfoGrid>
    </CardContainer>
  );
}

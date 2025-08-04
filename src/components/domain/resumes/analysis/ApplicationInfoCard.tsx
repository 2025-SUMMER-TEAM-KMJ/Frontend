'use client';

import styled from 'styled-components';
import { Resume, JobPosting } from '@/types'; // JobPosting import 추가

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

// Mock Job Posting Data
const mockJobPosting: JobPosting = {
  _id: { $oid: "test" },
  metadata: { source: "test", sourceUrl: "test", crawledAt: "test" },
  company: { name: "test", logo_img: null, address: { country: "test", location: "test", district: "test", full_location: "test" }, features: [], avgSalary: 0, avgEntrySalary: null },
  detail: { position: { jobGroup: "test", job: [] }, intro: "test", main_tasks: "test", requirements: "test", preferred_points: "test", benefits: "test", hire_rounds: "test" },
  externalUrl: "test",
  skill_tags: [],
  sourceData: "test",
  status: "test",
  title_images: []
};

export default function ApplicationInfoCard({ resume }: Props) {
  // resume.jobInfo 대신 mockJobPosting 사용
  const jobInfo: JobPosting = mockJobPosting;

  return (
    <CardContainer>
      <SectionTitle><DocumentIcon /> 공고 정보</SectionTitle>
      <InfoGrid>
        <InfoItem><strong>공고명:</strong> {jobInfo.detail.position.job[0]}</InfoItem>
        <InfoItem><strong>기업명:</strong> {jobInfo.company.name}</InfoItem>
        <InfoItem><strong>직무:</strong> {jobInfo.detail.position.jobGroup}</InfoItem>
        <InfoItem><strong>제출일:</strong> {new Date(jobInfo.metadata.crawledAt).toLocaleDateString()}</InfoItem>
      </InfoGrid>
    </CardContainer>
  );
}
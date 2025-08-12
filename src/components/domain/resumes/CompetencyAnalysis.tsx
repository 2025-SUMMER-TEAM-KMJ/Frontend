'use client';

import Tag from '@/components/common/Tag';
import styled from 'styled-components';

const AnalysisContainer = styled.div`
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

const CompetencySection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.large};
  &:last-child {
    margin-bottom: 0;
  }
`;

const Subtitle = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`;

const TagGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.small};
`;

const BlueTag = styled(Tag)`
  background-color: #eaf2ff;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 500;
`;

const GrayTag = styled(Tag)`
  background-color: ${({ theme }) => theme.colors.lightGray};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

// Mock Data
const mockUsedSkills = ['SQL', 'MSSQL', '데이터 시각화', '문제 해결 능력', 'A/B 테스트'];
const mockImproveSkills = ['KBS', 'MBN', '프로젝트 관리', '고객 데이터 분석', '커뮤니케이션'];

// Mock Icon
const ChartIcon = () => <span>📊</span>;

interface CompetencyAnalysisProps {
  type: 'job-based' | 'profile-based';
  profileSkills?: string[]; // Only for profile-based
}

export default function CompetencyAnalysis({ type, profileSkills }: CompetencyAnalysisProps) {
  const usedSkills = type === 'profile-based' ? (profileSkills || []) : mockUsedSkills;
  const improveSkills = mockImproveSkills; // Keep as mock for now

  const title = type === 'profile-based' ? '나의 역량 분석' : 'AI 역량 분석';
  const subtitle1 = type === 'profile-based' ? '프로필에서 강조된 나의 핵심 역량입니다.' : '자기소개서에서 강조된 나의 핵심 역량입니다.';
  const subtitle2 = type === 'profile-based' ? '프로필에 충분히 드러나지 않은 역량입니다.' : '직무와 관련하여 자기소개서에 충분히 드러나지 않은 역량입니다.';

  return (
    <AnalysisContainer>
      <SectionTitle>{title}</SectionTitle>
      <CompetencySection>
        <Subtitle>{subtitle1}</Subtitle>
        <TagGroup>
          {usedSkills.map(skill => <BlueTag key={skill.id}>{skill.name}</BlueTag>)}
        </TagGroup>
      </CompetencySection>
      <CompetencySection>
        <Subtitle>{subtitle2}</Subtitle>
        <TagGroup>
          {improveSkills.map(skill => <GrayTag key={skill}>{skill}</GrayTag>)}
        </TagGroup>
      </CompetencySection>
    </AnalysisContainer>
  );
}

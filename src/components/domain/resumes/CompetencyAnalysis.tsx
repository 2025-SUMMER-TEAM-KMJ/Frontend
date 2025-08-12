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



// Mock Data
const mockUsedSkills = [
  { id: '1', name: 'SQL' },
  { id: '2', name: 'MSSQL' },
  { id: '3', name: '데이터 시각화' },
  { id: '4', name: '문제 해결 능력' },
  { id: '5', name: 'A/B 테스트' },
];
const mockImproveSkills = [
  { id: '6', name: 'KBS' },
  { id: '7', name: 'MBN' },
  { id: '8', name: '프로젝트 관리' },
  { id: '9', name: '고객 데이터 분석' },
  { id: '10', name: '커뮤니케이션' },
];

// Mock Icon
const ChartIcon = () => <span>📊</span>;

interface CompetencySectionData {
  subtitle: string;
  competencies: { id: string; name: string }[];
  tagColor: string; // Now accepts any string color
}

interface CompetencyAnalysisProps {
  title: string;
  sections: CompetencySectionData[];
}

export default function CompetencyAnalysis({ title, sections }: CompetencyAnalysisProps) {
  return (
    <AnalysisContainer>
      <SectionTitle>{title}</SectionTitle>
      {sections.map((section, index) => (
        <CompetencySection key={index}>
          <Subtitle>{section.subtitle}</Subtitle>
          <TagGroup>
            {section.competencies.map(skill => (
              <Tag
                key={skill.id}
                backgroundColor={section.tagColor} // Directly use the provided color
                textColor={section.tagColor === '#eaf2ff' ? ({ theme }) => theme.colors.primary : ({ theme }) => theme.colors.textSecondary} // Keep conditional for text color based on background
              >
                {skill.name}
              </Tag>
            ))}
          </TagGroup>
        </CompetencySection>
      ))}
    </AnalysisContainer>
  );
}

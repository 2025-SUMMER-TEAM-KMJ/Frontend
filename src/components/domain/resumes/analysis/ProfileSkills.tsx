'use client';

import styled from 'styled-components';

const SkillsContainer = styled.div`
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

const SkillItem = styled.p`
    font-size: 16px;
    line-height: 1.8;
    color: ${({ theme }) => theme.colors.text};
    padding-left: 1em;
    text-indent: -1em;

    &:before {
        content: '•';
        margin-right: 0.5em;
        color: ${({ theme }) => theme.colors.primary};
    }
`;

interface Props {
  skills: string[];
}

// Mock Icon
const ProfileIcon = () => <span>👤</span>;

export default function ProfileSkills({ skills }: Props) {
  return (
    <SkillsContainer>
      <SectionTitle><ProfileIcon /> 나의 역량</SectionTitle>
      {skills.map((skill, index) => (
        <SkillItem key={index}>{skill}</SkillItem>
      ))}
    </SkillsContainer>
  );
}
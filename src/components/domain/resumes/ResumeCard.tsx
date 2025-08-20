'use client';

import Link from 'next/link';
import styled from 'styled-components';
import { Resume } from '@/types';

const CardWrapper = styled.div`
  padding: ${({ theme }) => theme.spacing.large};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  transition: box-shadow 0.2s ease-in-out, transform 0.2s ease-in-out;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }
`;

const Title = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: ${({ theme }) => theme.spacing.small};
`;

const SubInfo = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

interface Props {
  resume: Resume;
}

export default function ResumeCard({ resume }: Props) {
  const resumePath = resume.basedOn === 'job' 
    ? `/resumes/job-based/${resume.id}` 
    : `/resumes/profile-based/${resume.id}`;

  return (
    <Link href={resumePath}>
      <CardWrapper>
        <Title>{resume.title}</Title>
        <SubInfo>최종 수정: {new Date(resume.updated_at).toLocaleDateString()}</SubInfo>
      </CardWrapper>
    </Link>
  );
}

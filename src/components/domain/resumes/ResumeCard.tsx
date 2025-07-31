'use client';

import Link from 'next/link';
import styled from 'styled-components';
import { Resume } from '@/types';

const CardWrapper = styled.div`
  padding: ${({ theme }) => theme.spacing.large};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  transition: box-shadow 0.2s ease-in-out;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
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
  return (
    <Link href={`/resumes/${resume.id}`}>
      <CardWrapper>
        <Title>{resume.title}</Title>
        <SubInfo>최종 수정: {resume.updatedAt}</SubInfo>
      </CardWrapper>
    </Link>
  );
}

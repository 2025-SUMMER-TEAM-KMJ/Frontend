'use client';

import { FaPlus } from 'react-icons/fa';
import styled from 'styled-components';

const CardWrapper = styled.div`
  padding: ${({ theme }) => theme.spacing.large};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  transition: box-shadow 0.2s ease-in-out, transform 0.2s ease-in-out;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  cursor: pointer;
  text-align: center;
  color: ${({ theme }) => theme.colors.textSecondary};
  background-color: ${({ theme }) => theme.colors.lightGray};

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }
`;

const PlusIconWrapper = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.medium};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CardText = styled.p`
  font-size: 18px;
  font-weight: bold;
`;

interface AddResumeCardProps {
  onClick: () => void;
}

export default function AddResumeCard({ onClick }: AddResumeCardProps) {
  return (
    <CardWrapper onClick={onClick}>
      <PlusIconWrapper>
        <FaPlus size={48} color={({ theme }) => theme.colors.textSecondary} />
      </PlusIconWrapper>
      <CardText>자기소개서 추가</CardText>
    </CardWrapper>
  );
}

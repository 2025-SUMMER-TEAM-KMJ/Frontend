'use client';

import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import styled from 'styled-components';

const SectionHeader = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: ${({ theme }) => theme.spacing.large};
`;

const ItemContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 8px;
  padding: ${({ theme }) => theme.spacing.large};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: box-shadow 0.2s ease-in-out;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`;

const ItemTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
`;

const Content = styled.div`
  font-size: 16px;
  line-height: 1.8;
  white-space: pre-wrap;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const IconWrapper = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.small};
`;

const EditIcon = styled(FaPencilAlt)`
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const DeleteIcon = styled(FaTrashAlt)`
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.colors.error};
  }
`;

interface MyResumeProps {
  modalTitle: string;
  title: string;
  content: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

const MyResume = ({ modalTitle: head_title, title, content, onEdit, onDelete }: MyResumeProps) => {
  return (
    <>
      <SectionHeader>{head_title}</SectionHeader>
      <ItemContainer>
        <Header>
          <ItemTitle>{title}</ItemTitle>
          <IconWrapper>
            {onEdit && <EditIcon onClick={onEdit} />}
            {onDelete && <DeleteIcon onClick={onDelete} />}
          </IconWrapper>
        </Header>
        <Content>{content}</Content>
      </ItemContainer>
    </>
  );
};

export default MyResume;

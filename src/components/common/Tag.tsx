'use client';

import styled from 'styled-components';

const TagWrapper = styled.span`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.lightGray};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 12px;
`;

interface TagProps {
  children: React.ReactNode;
}

export default function Tag({ children }: TagProps) {
  return <TagWrapper>{children}</TagWrapper>;
}

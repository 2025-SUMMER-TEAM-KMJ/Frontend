'use client';

import styled from 'styled-components';

const TagWrapper = styled.span<{ backgroundColor?: string; textColor?: string }>`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  background-color: ${({ theme, backgroundColor }) => backgroundColor || theme.colors.lightGray};
  color: ${({ theme, textColor }) => textColor || theme.colors.textSecondary};
  font-size: 12px;
`;

interface TagProps {
  children: React.ReactNode;
  backgroundColor?: string;
  textColor?: string;
}

export default function Tag({ children }: TagProps) {
  return <TagWrapper>{children}</TagWrapper>;
}

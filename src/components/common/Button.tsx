'use client';

import styled from 'styled-components';

const StyledButton = styled.button`
  padding: 10px 20px;
  border-radius: 8px;
  border: none;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  transition: opacity 0.2s ease-in-out;

  &:hover {
    opacity: 0.9;
  }
`;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function Button({ children, ...props }: ButtonProps) {
  return <StyledButton {...props}>{children}</StyledButton>;
}

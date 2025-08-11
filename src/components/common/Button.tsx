'use client';

import styled from 'styled-components';

const StyledButton = styled.button<{ variant?: string }>` // variant prop 추가
  padding: 10px 20px;
  border-radius: 8px;
  border: none;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  background-color: ${({ theme, variant }) =>
    variant === 'secondary' ? theme.colors.secondary : theme.colors.primary};
  color: ${({ variant }) => (variant === 'secondary' ? 'black' : 'white')}; // secondary variant 텍스트 색상 변경

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: string; // variant prop 추가
}

export default function Button({ children, variant, ...props }: ButtonProps) {
  return <StyledButton variant={variant} {...props}>{children}</StyledButton>;
}
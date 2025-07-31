'use client';

import React from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  font-size: 16px;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ ...props }, ref) => {
  return <StyledInput ref={ref} {...props} />;
});

Input.displayName = 'Input';

export default Input;

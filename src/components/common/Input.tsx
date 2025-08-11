'use client';

import React from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  font-size: 16px;
  transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(0, 112, 243, 0.2);
  }
`;

const StyledTextarea = styled.textarea`
  width: 100%;
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  font-size: 16px;
  resize: vertical;
  transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(0, 112, 243, 0.2);
  }
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Label = styled.label`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const ErrorText = styled.p`
  color: red;
  font-size: 12px;
`;

// InputProps를 두 가지 형태로 정의하여 input 또는 textarea 속성을 받을 수 있도록 합니다.
type InputProps = {
  error?: string;
  label?: string;
} & (
  | (React.InputHTMLAttributes<HTMLInputElement> & { textarea?: false })
  | (React.TextareaHTMLAttributes<HTMLTextAreaElement> & { textarea: true })
);

const Input = React.forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(({ label, error, textarea, ...props }, ref) => {
  return (
    <InputWrapper>
      {label && <Label>{label}</Label>}
      {textarea ? (
        <StyledTextarea ref={ref as React.Ref<HTMLTextAreaElement>} {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)} />
      ) : (
        <StyledInput ref={ref as React.Ref<HTMLInputElement>} {...(props as React.InputHTMLAttributes<HTMLInputElement>)} />
      )}
      {error && <ErrorText>{error}</ErrorText>}
    </InputWrapper>
  );
});

Input.displayName = 'Input';

export default Input;
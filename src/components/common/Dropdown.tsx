'use client';

import styled from 'styled-components';

const Select = styled.select`
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  font-size: 14px;
  background-color: white;
  min-width: 120px;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

interface DropdownProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: { value: string; label: string }[];
}

export default function Dropdown({ options, ...props }: DropdownProps) {
  return (
    <Select {...props}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </Select>
  );
}

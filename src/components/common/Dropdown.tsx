'use client';

import React from 'react';
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

const Dropdown = React.forwardRef<HTMLSelectElement, DropdownProps>(({ options, ...props }, ref) => {
  return (
    <Select ref={ref} {...props}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </Select>
  );
});

Dropdown.displayName = 'Dropdown';

export default Dropdown;

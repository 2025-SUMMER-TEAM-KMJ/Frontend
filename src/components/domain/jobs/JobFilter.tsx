'use client';

import styled from 'styled-components';
import { JobFilters, SortOption } from '@/types';
import Dropdown from '@/components/common/Dropdown';
import SearchBar from '@/components/domain/main/SearchBar';

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.xlarge};
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.medium};
`;

const FilterGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.small};
  flex-grow: 1;
`;

interface JobFilterProps {
  filters: JobFilters;
  sort: SortOption;
  onFilterChange: (name: keyof JobFilters, value: string) => void;
  onSortChange: (value: SortOption) => void;
  onSearch: (term: string) => void;
}

const locationOptions = [
  { value: '전체', label: '지역 (전체)' },
  { value: '서울', label: '서울' },
  { value: '경기', label: '경기' },
  { value: '제주', label: '제주' },
];
// Add more options for category and job
const categoryOptions = [{ value: '전체', label: '직군 (전체)' }];
const jobOptions = [{ value: '전체', label: '직무 (전체)' }];


export default function JobFilter({ filters, sort, onFilterChange, onSortChange, onSearch }: JobFilterProps) {
  return (
        <FilterContainer>
      <FilterGroup>
        <SearchBar onSearch={onSearch} />
        <Dropdown
          options={locationOptions}
          value={filters.location}
          onChange={(e) => onFilterChange('location', e.target.value)}
        />
        <Dropdown
          options={categoryOptions}
          value={filters.category}
          onChange={(e) => onFilterChange('category', e.target.value)}
        />
        <Dropdown
          options={jobOptions}
          value={filters.job}
          onChange={(e) => onFilterChange('job', e.target.value)}
        />
      </FilterGroup>
    </FilterContainer>
  );
}

'use client';

import { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useAuth } from '@/hooks/useAuth';
import { getJobs } from '@/lib/api/jobs';
import { Job, JobFilters, SortOption } from '@/types';
import AuthGuard from '@/components/auth/AuthGuard';
import JobFilter from '@/components/domain/jobs/JobFilter';
import JobPostList from '@/components/domain/jobs/JobPostList';
import Pagination from '@/components/domain/jobs/Pagination';

const JobsPageContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 24px;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 800;
  margin-bottom: ${({ theme }) => theme.spacing.xlarge};
`;

const Loading = styled.p`
  text-align: center;
  padding: 50px;
`;

function JobsPageContent() {
  const { isLoggedIn } = useAuth();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState<JobFilters>({
    location: '전체',
    category: '전체',
    job: '전체',
  });
  const [sort, setSort] = useState<SortOption>('latest');

  const fetchJobs = useCallback(async () => {
    setIsLoading(true);
    const data = await getJobs(filters, sort, isLoggedIn);
    setJobs(data);
    setIsLoading(false);
  }, [filters, sort, isLoggedIn]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const handleFilterChange = (name: keyof JobFilters, value: string) => {
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSortChange = (value: SortOption) => {
    setSort(value);
  };

  return (
    <JobsPageContainer>
      <Title>채용 공고</Title>
      
      <JobFilter
        filters={filters}
        sort={sort}
        onFilterChange={handleFilterChange}
        onSortChange={handleSortChange}
      />

      {isLoading ? (
        <Loading>채용 공고를 불러오는 중...</Loading>
      ) : (
        <>
          <JobPostList jobs={jobs} />
          <Pagination />
        </>
      )}
    </JobsPageContainer>
  );
}

export default function JobsPage() {
    return (
        <AuthGuard>
            <JobsPageContent />
        </AuthGuard>
    )
}

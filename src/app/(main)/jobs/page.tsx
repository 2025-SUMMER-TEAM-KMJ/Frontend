'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import { useAuth } from '@/hooks/useAuth';
import { getJobs, getInterestedJobs, addInterestedJob, removeInterestedJob } from '@/lib/api/jobs';
import { createJobBasedResume } from '@/lib/api/resumes';
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
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState<JobFilters>({ location: '전체', category: '전체', job: '전체' });
  const [sort, setSort] = useState<SortOption>('latest');
  const [searchTerm, setSearchTerm] = useState('');
  const [interestedJobIds, setInterestedJobIds] = useState<Set<number>>(new Set());

  const fetchInitialData = useCallback(async () => {
    setIsLoading(true);
    const [jobsData, interestedJobsData] = await Promise.all([
      getJobs(filters, sort, isLoggedIn, searchTerm),
      getInterestedJobs(),
    ]);
    setJobs(jobsData);
    setInterestedJobIds(new Set(interestedJobsData.map(j => j.id)));
    setIsLoading(false);
  }, [filters, sort, isLoggedIn, searchTerm]);

  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData]);

  const handleFilterChange = (name: keyof JobFilters, value: string) => {
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSortChange = (value: SortOption) => setSort(value);
  const handleSearch = (term: string) => setSearchTerm(term);

  const handleToggleInterest = async (job: Job) => {
    const newInterestedIds = new Set(interestedJobIds);
    if (interestedJobIds.has(job.id)) {
      await removeInterestedJob(job.id);
      newInterestedIds.delete(job.id);
    } else {
      await addInterestedJob(job);
      newInterestedIds.add(job.id);
    }
    setInterestedJobIds(newInterestedIds);
  };

  const handleCreateResume = async (job: Job) => {
    if (!interestedJobIds.has(job.id)) {
      await addInterestedJob(job);
      setInterestedJobIds(prev => new Set(prev).add(job.id));
    }
    try {
      const newResume = await createJobBasedResume(job);
      router.push(`/resumes/job-based/${newResume.id}`);
    } catch (error) {
      alert(error instanceof Error ? error.message : '자소서 생성 실패');
    }
  };

  return (
    <JobsPageContainer>
      <Title>채용 공고</Title>
      
      <JobFilter
        filters={filters}
        sort={sort}
        onFilterChange={handleFilterChange}
        onSortChange={handleSortChange}
        onSearch={handleSearch}
      />

      {isLoading ? (
        <Loading>채용 공고를 불러오는 중...</Loading>
      ) : (
        <>
          <JobPostList 
            jobs={jobs} 
            interestedJobIds={interestedJobIds}
            onToggleInterest={handleToggleInterest}
            onCreateResume={handleCreateResume}
          />
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

'use client';

import JobPostList from '@/components/domain/jobs/JobPostList';
import Pagination from '@/components/domain/jobs/Pagination';
import SearchBar from '@/components/domain/main/SearchBar';
import InterestedJobResumesModal from '@/components/domain/resumes/InterestedJobResumesModal';
import { useAuth } from '@/hooks/useAuth';
import { addInterestedJob, getInterestedJobs, getJobs, removeInterestedJob } from '@/lib/api/jobs';
import { createJobBasedResume } from '@/lib/api/resumes';
import { Job, JobFilters, SortOption } from '@/types';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

const JobsPageContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 24px;
`;

const PageHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xlarge};
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 800;
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`;

const SearchBarContainer = styled.div`
  width: 80%;
  min-width: 500px;
  margin: 0;
`;

const Loading = styled.p`
  text-align: center;
  padding: 50px;
`;

const ButtonRightContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: ${({ theme }) => theme.spacing.medium};
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
  const [selectedJobForModal, setSelectedJobForModal] = useState<Job | null>(null);

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
  const handleSearch = (term: string) => {
    if (!isLoggedIn) {
      router.push('/login');
      return;
    }
    setSearchTerm(term);
  };

  const handleGetRecommendations = () => {
    alert('추천받기 버튼 클릭됨!');
  };

  const handleToggleInterest = async (job: Job) => {
    if (!isLoggedIn) {
      router.push('/login');
      return;
    }

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
    if (interestedJobIds.has(job.id)) {
      setSelectedJobForModal(job);
    } else {
      await addInterestedJob(job);
      setInterestedJobIds(prev => new Set(prev).add(job.id));
      try {
        const newResume = await createJobBasedResume(job);
        router.push(`/resumes/job-based/${newResume.id}`);
      } catch (error) {
        alert(error instanceof Error ? error.message : '자소서 생성 실패');
      }
    }
  };

  return (
    <JobsPageContainer>
      <PageHeader>
        <Title>채용 공고</Title>
        <SearchBarContainer>
          <SearchBar onSearch={handleSearch} />
        </SearchBarContainer>
      </PageHeader>

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

      {selectedJobForModal && (
        <InterestedJobResumesModal
          job={selectedJobForModal}
          onClose={() => setSelectedJobForModal(null)}
        />
      )}
    </JobsPageContainer>
  );
}

export default function JobsPage() {
  return (
    <JobsPageContent />
  );
}
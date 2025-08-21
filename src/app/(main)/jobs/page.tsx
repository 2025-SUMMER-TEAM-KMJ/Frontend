'use client';

import JobPostList from '@/components/domain/jobs/JobPostList';
import Pagination from '@/components/domain/jobs/Pagination';
import SearchBar from '@/components/domain/main/SearchBar';
import InterestedJobResumesModal from '@/components/domain/resumes/InterestedJobResumesModal';
import { useAuth } from '@/hooks/useAuth';
import { getJobPostings, addBookmark, removeBookmark } from '@/lib/api/jobs';
import { createCoverLetter } from '@/lib/api/resumes';
import { JobPosting, JobFilters, SortOption } from '@/types';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useCallback, useEffect, useState } from 'react';
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

function JobsPageContent() {
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState<JobFilters>({ location: '전체', category: '전체', job: '전체' });
  const [sort, setSort] = useState<SortOption>('latest');
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [selectedJobForModal, setSelectedJobForModal] = useState<JobPosting | null>(null);
  const [currentPage, setCurrentPage] = useState(Number(searchParams.get('page')) || 1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchInitialData = useCallback(async (page: number, term: string) => {
    setIsLoading(true);
    const limit = 9;
    const offset = (page - 1) * limit;
    const jobsData = await getJobPostings(term, offset, limit);
    setJobs(jobsData.items);
    setTotalPages(Math.ceil(jobsData.total / limit));
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const page = Number(searchParams.get('page')) || 1;
    const term = searchParams.get('q') || '';
    setCurrentPage(page);
    setSearchTerm(term);
    fetchInitialData(page, term);
  }, [searchParams, fetchInitialData]);

  const handleFilterChange = (name: keyof JobFilters, value: string) => {
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSortChange = (value: SortOption) => setSort(value);
  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('q', term);
    params.set('page', '1');
    router.push(`/jobs?${params.toString()}`);
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(page));
    router.push(`/jobs?${params.toString()}`);
  };

  const handleToggleInterest = async (job: JobPosting) => {
    if (!isLoggedIn) {
      router.push('/login');
      return;
    }

    try {
      if (job.bookmarked) {
        await removeBookmark(job.id);
      } else {
        await addBookmark(job.id);
      }
      setJobs(prevJobs => prevJobs.map(j => 
        j.id === job.id ? { ...j, bookmarked: !j.bookmarked } : j
      ));
    } catch (error) {
      alert(error instanceof Error ? error.message : '북마크 업데이트 실패');
    }
  };

  const handleCreateResume = async (job: JobPosting) => {
    if (job.bookmarked) {
      setSelectedJobForModal(job);
    } else {
      try {
        await addBookmark(job.id);
        setJobs(prevJobs => prevJobs.map(j => 
          j.id === job.id ? { ...j, bookmarked: true } : j
        ));
        const newResume = await createCoverLetter({ title: `${job.company.name} ${job.detail.position?.job?.[0] || '지원'}`, type: 'job_posting', job_posting_id: job.id });
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
          <SearchBar onSearch={handleSearch} initialTerm={searchTerm} />
        </SearchBarContainer>
      </PageHeader>

      {isLoading ? (
        <Loading>채용 공고를 불러오는 중...</Loading>
      ) : (
        <>
          <JobPostList
            jobs={jobs}
            onToggleInterest={handleToggleInterest}
            onCreateResume={handleCreateResume}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
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
    <Suspense fallback={<Loading>Loading...</Loading>}>
      <JobsPageContent />
    </Suspense>
  );
}

'use client';

import JobPostList from '@/components/domain/jobs/JobPostList';
import SearchBar from '@/components/domain/main/SearchBar';
import InterestedJobResumesModal from '@/components/domain/resumes/InterestedJobResumesModal';
import { useAuth } from '@/hooks/useAuth';
import { addBookmark, getJobPostings, removeBookmark } from '@/lib/api/jobs';
import { createCoverLetter } from '@/lib/api/resumes';
import { JobPosting } from '@/types';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useCallback, useEffect, useRef, useState } from 'react';
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

const EndOfList = styled.p`
  text-align: center;
  padding: 40px;
  color: ${({ theme }) => theme.colors.gray};
`;

function JobsPageContent() {
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJobForModal, setSelectedJobForModal] = useState<JobPosting | null>(null);

  const observer = useRef<IntersectionObserver>();
  const lastJobElementRef = useCallback(
    (node: HTMLElement | null) => {
      if (isFetchingMore || isLoading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasNextPage) {
          setCurrentPage(prevPage => prevPage + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [isFetchingMore, isLoading, hasNextPage]
  );

  const loadJobs = useCallback(async (page: number, term: string) => {
    if (page === 1) setIsLoading(true);
    else setIsFetchingMore(true);

    const limit = 10;
    const offset = (page - 1) * limit;
    try {
      const jobsData = await getJobPostings(term, offset, limit);
      setJobs(prevJobs => (page === 1 ? jobsData.items : [...prevJobs, ...jobsData.items]));
      setHasNextPage((offset + jobsData.items.length) < jobsData.total);
    } catch (error) {
      console.error("Failed to load job postings:", error);
      setHasNextPage(false); // Stop fetching on error
    }

    if (page === 1) setIsLoading(false);
    else setIsFetchingMore(false);
  }, []);

  useEffect(() => {
    if (currentPage > 1) {
      loadJobs(currentPage, searchTerm);
    }
  }, [currentPage, loadJobs, searchTerm]);

  useEffect(() => {
    const term = searchParams.get('q') || '';
    setSearchTerm(term);
    setCurrentPage(1);
    loadJobs(1, term);
  }, [searchParams, loadJobs]);

  const handleSearch = (term: string) => {
    const params = new URLSearchParams();
    if (term) {
      params.set('q', term);
    }
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
          {jobs.length > 0 ? (
            <JobPostList
              jobs={jobs}
              onToggleInterest={handleToggleInterest}
              onCreateResume={handleCreateResume}
            />
          ) : (
            <EndOfList>검색된 공고가 없습니다.</EndOfList>
          )}

          {isFetchingMore && <Loading>더 많은 공고를 불러오는 중...</Loading>}
          
          {!isFetchingMore && !hasNextPage && jobs.length > 0 && (
            <EndOfList>마지막 공고입니다.</EndOfList>
          )}

          <div ref={lastJobElementRef} style={{ height: '1px' }} />
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
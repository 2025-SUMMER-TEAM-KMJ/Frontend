import fetchWithAuth from './client';
import { JobPostingListResponse, JobPostingResponse } from '@/types/api';

export const getJobPostings = async (q?: string, offset: number = 0, limit: number = 20): Promise<JobPostingListResponse> => {
  let url = `/job-postings?offset=${offset}&limit=${limit}`;
  if (q) {
    url += `&q=${q}`;
  }
  const response = await fetchWithAuth(url);
  return response;
};

export const getJobPosting = async (jobId: string): Promise<JobPostingResponse> => {
  const response = await fetchWithAuth(`/job-postings/${jobId}`);
  return response;
};

export const getRecommendedJobPostings = async (offset: number, limit: number): Promise<JobPostingResponse[]> => {
  const response = await fetchWithAuth(`/job-postings/recommendations?offset=${offset}&limit=${limit}`);
  return response;
};

export const getBookmarkedJobPostings = async (offset: number, limit: number): Promise<JobPostingListResponse> => {
  const response = await fetchWithAuth(`/job-postings/bookmarks?offset=${offset}&limit=${limit}`);
  return response;
};

export const addBookmark = async (jobId: string): Promise<void> => {
  await fetchWithAuth(`/job-postings/bookmark/${jobId}`, { method: 'POST' });
};

export const removeBookmark = async (jobId: string): Promise<void> => {
  await fetchWithAuth(`/job-postings/bookmark/${jobId}`, { method: 'DELETE' });
};
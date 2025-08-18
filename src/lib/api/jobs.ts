import fetchWithAuth from './client';
import { JobPostingListResponse, JobPostingResponse } from '@/types/api';

export const getJobPostings = async (q: string, offset: number, limit: number): Promise<JobPostingListResponse> => {
  const response = await fetchWithAuth(`/job-postings?q=${q}&offset=${offset}&limit=${limit}`);
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
  await fetchWithAuth(`/job-postings/${jobId}/bookmark`, { method: 'POST' });
};

export const removeBookmark = async (jobId: string): Promise<void> => {
  await fetchWithAuth(`/job-postings/${jobId}/bookmark`, { method: 'DELETE' });
};
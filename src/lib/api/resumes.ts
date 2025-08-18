import fetchWithAuth from './client';
import { CoverLetterCreate, CoverLetterListResponse, CoverLetterResponse, CoverLetterUpdate, QnACreate, QnAUpdate } from '@/types/api';

export const getCoverLetters = async (type?: string, job_posting_id?: string, offset: number = 0, limit: number = 20): Promise<CoverLetterListResponse> => {
  let url = `/cover-letters?offset=${offset}&limit=${limit}`;
  if (type) {
    url += `&type=${type}`;
  }
  if (job_posting_id) {
    url += `&job_posting_id=${job_posting_id}`;
  }
  const response = await fetchWithAuth(url);
  return response;
};

export const getCoverLetter = async (cl_id: string): Promise<CoverLetterResponse> => {
  const response = await fetchWithAuth(`/cover-letters/${cl_id}`);
  return response;
};

export const createCoverLetter = async (data: CoverLetterCreate): Promise<CoverLetterResponse> => {
  const response = await fetchWithAuth('/cover-letters', {
    method: 'POST',
    body: JSON.stringify(data),
  });
  return response;
};

export const updateCoverLetter = async (cl_id: string, data: CoverLetterUpdate): Promise<CoverLetterResponse> => {
  const response = await fetchWithAuth(`/cover-letters/${cl_id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
  return response;
};

export const deleteCoverLetter = async (cl_id: string): Promise<void> => {
  await fetchWithAuth(`/cover-letters/${cl_id}`, { method: 'DELETE' });
};

export const createQnA = async (cl_id: string, data: QnACreate): Promise<CoverLetterResponse> => {
  const response = await fetchWithAuth(`/cover-letters/${cl_id}/qnas`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
  return response;
};

export const updateQnA = async (cl_id: string, qna_id: string, data: QnAUpdate): Promise<CoverLetterResponse> => {
  const response = await fetchWithAuth(`/cover-letters/${cl_id}/qnas/${qna_id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
  return response;
};

export const deleteQnA = async (cl_id: string, qna_id: string): Promise<CoverLetterResponse> => {
  const response = await fetchWithAuth(`/cover-letters/${cl_id}/qnas/${qna_id}`, {
    method: 'DELETE',
  });
  return response;
};

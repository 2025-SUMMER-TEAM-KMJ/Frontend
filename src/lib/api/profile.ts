import { schemas__user__QnACreate, schemas__user__QnAUpdate, UserResponse, UserUpdateRequest } from '@/types/api';
import fetchWithAuth from './client';

export const getProfile = async (): Promise<UserResponse> => {
  const response = await fetchWithAuth('/users');
  return response;
};

export const updateProfile = async (newProfileData: UserUpdateRequest): Promise<UserResponse> => {
  const response = await fetchWithAuth('/users', {
    method: 'PATCH',
    body: JSON.stringify(newProfileData),
  });
  return response;
};

export const uploadProfileImage = async (imageFile: File): Promise<void> => {
  await fetchWithAuth('/users/profile-image', {
    method: 'POST',
    body: imageFile,
    headers: {
      'Content-Type': imageFile.type,
    },
  });
};

export const deleteProfileImage = async (): Promise<void> => {
  await fetchWithAuth('/users/profile-image', {
    method: 'DELETE',
  });
};

export const addProfileQnA = async (qna: schemas__user__QnACreate): Promise<UserResponse> => {
  const response = await fetchWithAuth('/users/qnas', {
    method: 'POST',
    body: JSON.stringify(qna),
  });
  return response;
};

export const updateProfileQnA = async (qnaId: string, qna: schemas__user__QnAUpdate): Promise<UserResponse> => {
  const response = await fetchWithAuth(`/users/qnas/${qnaId}`, {
    method: 'PATCH',
    body: JSON.stringify(qna),
  });
  return response;
};

export const deleteProfileQnA = async (qnaId: string): Promise<UserResponse> => {
  const response = await fetchWithAuth(`/users/qnas/${qnaId}`, {
    method: 'DELETE',
  });
  return response;
};

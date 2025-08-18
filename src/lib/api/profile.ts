import fetchWithAuth from './client';
import { UserResponse, UserUpdateRequest } from '@/types/api';

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

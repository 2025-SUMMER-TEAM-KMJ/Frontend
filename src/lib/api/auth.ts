import fetchWithAuth from './client';
import fetchWithoutAuth from './client-unauthorized';
import { LoginRequest, SignUpRequest, TokenResponse, UserResponse } from '@/types/api';

export const loginUser = async (credentials: LoginRequest): Promise<TokenResponse> => {
  const response = await fetchWithoutAuth('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
  return response;
};

export const signupUser = async (userData: SignUpRequest): Promise<UserResponse> => {
  const response = await fetchWithoutAuth('/users/signup', {
    method: 'POST',
    body: JSON.stringify(userData),
  });
  return response;
};

export const logoutUser = async (): Promise<void> => {
  await fetchWithAuth('/auth/logout', { method: 'POST' });
};

export const reissueToken = async (): Promise<TokenResponse> => {
  const response = await fetchWithoutAuth('/auth/reissue', { method: 'POST' });
  return response;
};

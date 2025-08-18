import { useAuthStore } from '@/store/authStore';
import { reissueToken } from './auth';

const API_BASE_URL = 'http://35.192.157.46:8765';

const getAuthToken = () => {
  return useAuthStore.getState().accessToken;
};

const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  let token = getAuthToken();

  const headers: Record<string, string> = {
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  if (options.body && !(options.body instanceof File)) {
    headers['Content-Type'] = 'application/json';
  }

  let response = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers,
    credentials: 'include',
  });

  if (response.status === 401) {
    try {
      const newTokenResponse = await reissueToken();
      const newAccessToken = newTokenResponse.access_token;
      useAuthStore.getState().setAccessToken(newAccessToken);
      headers['Authorization'] = `Bearer ${newAccessToken}`;

      // Retry the original request with the new token
      response = await fetch(`${API_BASE_URL}${url}`, {
        ...options,
        headers,
        credentials: 'include',
      });
    } catch (reissueError) {
      // If reissue fails, logout the user
      useAuthStore.getState().logout();
      throw new Error('Session expired. Please login again.');
    }
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(`HTTP error! status: ${response.status}, details: ${JSON.stringify(errorData)}`);
  }

  const contentType = response.headers.get('content-type');
  if (contentType && contentType.indexOf('application/json') !== -1) {
    return response.json();
  } else {
    return;
  }
};

export default fetchWithAuth;

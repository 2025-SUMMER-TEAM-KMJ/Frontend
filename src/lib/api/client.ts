import { useAuthStore } from '@/store/authStore';
import { reissueToken } from './auth';

// const API_BASE_URL = 'http://35.192.157.46:8765';
const API_BASE_URL = 'http://localhost:8000';

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

  console.log(`[API Request] ${options.method || 'GET'}: ${url}` , options.body ? { body: options.body } : {});

  let response = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers,
    credentials: 'include',
  });

  if (response.status === 401) {
    try {
      console.log('[API Token] Token expired, trying to reissue...');
      const newTokenResponse = await reissueToken();
      const newAccessToken = newTokenResponse.access_token;
      useAuthStore.getState().setAccessToken(newAccessToken);
      headers['Authorization'] = `Bearer ${newAccessToken}`;

      console.log('[API Retry] Retrying original request with new token...');
      response = await fetch(`${API_BASE_URL}${url}`, {
        ...options,
        headers,
        credentials: 'include',
      });
    } catch (reissueError) {
      console.error('[API Error] Token reissue failed:', reissueError);
      useAuthStore.getState().logout();
      throw new Error('Session expired. Please login again.');
    }
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    console.error(`[API Error] Status: ${response.status}`, errorData);
    throw new Error(`HTTP error! status: ${response.status}, details: ${JSON.stringify(errorData)}`);
  }

    const contentType = response.headers.get('content-type');
  if (contentType && contentType.indexOf('application/json') !== -1) {
    const data = await response.json();
    console.log(`[API Response] ${options.method || 'GET'}: ${url}`, { status: response.status, data });
    return data;
  } else {
    console.log(`[API Response] ${options.method || 'GET'}: ${url}`, { status: response.status, data: 'No JSON content' });
    return;
  }
};

export default fetchWithAuth;

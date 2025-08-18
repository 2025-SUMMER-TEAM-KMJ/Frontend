const API_BASE_URL = 'http://35.192.157.46:8765';

const fetchWithoutAuth = async (url: string, options: RequestInit = {}) => {
  const headers: Record<string, string> = {
    ...options.headers,
  };

  if (options.body && !(options.body instanceof File)) {
    headers['Content-Type'] = 'application/json';
  }

  const response = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers,
    credentials: 'include',
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(`HTTP error! status: ${response.status}, details: ${JSON.stringify(errorData)}`);
  }

  return response.json();
};

export default fetchWithoutAuth;

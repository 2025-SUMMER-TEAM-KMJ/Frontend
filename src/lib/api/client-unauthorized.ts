const API_BASE_URL = 'http://35.192.157.46:8765';

const fetchWithoutAuth = async (url: string, options: RequestInit = {}) => {
  const headers: Record<string, string> = {
    ...options.headers,
  };

  if (options.body && !(options.body instanceof File)) {
    headers['Content-Type'] = 'application/json';
  }

  console.log(`[API Request] ${options.method || 'GET'}: ${url}`, options.body ? { body: options.body } : {});

  const response = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers,
    credentials: 'include',
  });

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

export default fetchWithoutAuth;

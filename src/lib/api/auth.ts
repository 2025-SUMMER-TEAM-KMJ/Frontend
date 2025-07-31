// NOTE: This is a mock API for demonstration purposes.
// In a real application, this would make actual HTTP requests.

interface LoginCredentials {
  email: string;
  password?: string; // Optional for social login in the future
}

interface UserData {
  name: string;
  email: string;
}

// Mock user database
const MOCK_USER: UserData = {
  name: '김개발',
  email: 'dev@careergo.com',
};

export const loginUser = (credentials: LoginCredentials): Promise<UserData> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (
        credentials.email === 'dev@careergo.com' &&
        credentials.password === 'password123'
      ) {
        resolve(MOCK_USER);
      } else {
        reject(new Error('이메일 또는 비밀번호가 올바르지 않습니다.'));
      }
    }, 1000); // Simulate network delay
  });
};

export const signupUser = (userData: UserData): Promise<UserData> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            // In a real app, you'd save the user and get back the created user data.
            resolve({
                name: userData.name,
                email: userData.email,
            });
        }, 1000);
    });
};

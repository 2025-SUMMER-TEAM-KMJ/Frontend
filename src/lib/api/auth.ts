// NOTE: This is a mock API for demonstration purposes.
// In a real application, this would make actual HTTP requests.

interface LoginCredentials {
  email: string;
  password?: string; // Optional for social login in the future
}

interface UserData {
  name: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
}

// Mock user database
const MOCK_USER: UserData = {
  name: '김개발',
  age: 30,
  gender: '남',
  email: 'dev@careergo.com',
  phone: '010-1234-5678',
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
                age: userData.age,
                gender: userData.gender,
                email: userData.email,
                phone: userData.phone,
            });
        }, 1000);
    });
};

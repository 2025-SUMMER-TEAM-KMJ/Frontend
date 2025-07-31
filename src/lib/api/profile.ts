import { Profile } from '@/types/profile';

// In a real app, this would be null until the user creates it.
// We'll start with mock data for demonstration.
let MOCK_PROFILE: Profile | null = null;
// let MOCK_PROFILE: Profile | null = {
//   basicInfo: { name: '김개발', email: 'dev@careergo.com', phone: '010-1234-5678', brief: '3년차 프론트엔드 개발자입니다. 사용자 경험 개선에 관심이 많습니다.' },
//   skills: [{ id: '1', name: 'React' }, { id: '2', name: 'TypeScript' }, { id: '3', name: 'Next.js' }],
//   experience: [{ id: '1', company: 'CareerGo', position: '프론트엔드 개발자', startDate: '2022-01', endDate: '현재', description: 'AI 기반 채용 서비스 개발' }],
// };

export const getProfile = (): Promise<Profile | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Fetching profile...', MOCK_PROFILE);
      resolve(MOCK_PROFILE);
    }, 500);
  });
};

export const updateProfile = (newProfileData: Profile): Promise<Profile> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      MOCK_PROFILE = newProfileData;
      console.log('Profile updated!', MOCK_PROFILE);
      resolve(MOCK_PROFILE);
    }, 500);
  });
};
